import { readFileSync, writeFileSync } from 'node:fs'

const INPUT_PATH = 'scripts/.cache/google-formats.json'
const OUTPUT_PATH = 'scripts/.cache/transformed-formats.json'

type AddressFormatPart = string | { attribute: string; transforms: string[] }

interface GoogleAddressData {
  key: string
  fmt?: string
  lfmt?: string
  upper?: string
  state_name_type?: string
  locality_name_type?: string
  sublocality_name_type?: string
}

interface TransformedFormat {
  default: {
    array: AddressFormatPart[][]
  }
}

const STATE_TYPE_MAP: Record<string, string> = {
  state: 'state',
  province: 'province',
  prefecture: 'prefecture',
  do_si: 'do',
  oblast: 'region',
  emirate: 'region',
  county: 'region',
  department: 'region',
  district: 'region',
  island: 'region',
  parish: 'region',
  area: 'region',
}

const SUBLOCALITY_TYPE_MAP: Record<string, string> = {
  district: 'address2',
  neighborhood: 'address2',
  suburb: 'address2',
  townland: 'address2',
  village_township: 'address2',
}

// Korea-specific sublocality mapping (overrides generic)
const KOREAN_SUBLOCALITY_MAP: Record<string, string> = {
  district: 'gu',
  neighborhood: 'dong',
}

const KOREAN_COUNTRIES = new Set(['KR', 'KP'])

const TOKEN_TO_UPPER_CODE: Record<string, string> = {
  '%N': 'N',
  '%O': 'O',
  '%A': 'A',
  '%D': 'D',
  '%C': 'C',
  '%S': 'S',
  '%Z': 'Z',
}

function resolveField(token: string, data: GoogleAddressData): string | null {
  switch (token) {
    case '%C':
      return 'city'
    case '%S':
      return STATE_TYPE_MAP[data.state_name_type ?? 'state'] ?? 'state'
    case '%Z':
      return 'postalCode'
    case '%D': {
      const sublocalityType = data.sublocality_name_type ?? 'suburb'
      if (KOREAN_COUNTRIES.has(data.key)) {
        return KOREAN_SUBLOCALITY_MAP[sublocalityType] ?? 'address2'
      }
      return SUBLOCALITY_TYPE_MAP[sublocalityType] ?? 'address2'
    }
    default:
      return null
  }
}

function shouldUppercase(token: string, upperStr: string): boolean {
  const code = TOKEN_TO_UPPER_CODE[token]
  return code !== undefined && upperStr.includes(code)
}

function wrapField(field: string, transforms: string[]): AddressFormatPart {
  if (transforms.length === 0) return field
  return { attribute: field, transforms }
}

interface TokenMatch {
  token: string
  trailingLiteral: string
}

function tokenize(segment: string): TokenMatch[] {
  const matches: { token: string; index: number }[] = []
  const tokenRegex = /%[A-Z]/g
  let match: RegExpExecArray | null

  while ((match = tokenRegex.exec(segment)) !== null) {
    matches.push({ token: match[0], index: match.index })
  }

  return matches.map((m, i) => {
    const tokenEnd = m.index + 2
    const nextStart =
      i + 1 < matches.length ? matches[i + 1].index : segment.length
    const trailing = segment.slice(tokenEnd, nextStart).trim()
    return { token: m.token, trailingLiteral: trailing }
  })
}

export function parseFmtLine(
  segment: string,
  data: GoogleAddressData,
): AddressFormatPart[] {
  const parts: AddressFormatPart[] = []
  const upperStr = data.upper ?? ''

  for (const { token, trailingLiteral } of tokenize(segment)) {
    if (token === '%X') continue // skip sorting code

    if (token === '%N') {
      parts.push('honorific', 'firstName', 'secondName', 'lastName')
      continue
    }

    if (token === '%O') {
      parts.push('companyName')
      continue
    }

    if (token === '%A') {
      // %A on a line adds address1; address2 added as separate line by caller
      parts.push('address1')
      continue
    }

    const field = resolveField(token, data)
    if (!field) continue

    const transforms: string[] = []
    if (shouldUppercase(token, upperStr)) transforms.push('capitalize')
    if (trailingLiteral.startsWith(',')) transforms.push('addCommaAfter')

    parts.push(wrapField(field, transforms))
  }

  return parts
}

export function transformCountry(
  data: GoogleAddressData,
): TransformedFormat | null {
  // Prefer Latin format for non-Latin script countries
  const fmt = data.lfmt ?? data.fmt
  if (!fmt) return null

  const lines = fmt.split('%n')
  const result: AddressFormatPart[][] = []

  for (const line of lines) {
    if (!line.trim()) continue

    // Check if this line contains %A — if so, expand to address1 + address2
    if (line.includes('%A')) {
      const parts = parseFmtLine(line, data)
      if (parts.length > 0) {
        // Split: address1 with any other fields on that line, address2 on its own
        const address1Line = parts.filter((p) => p !== 'address2')
        if (address1Line.length > 0) result.push(address1Line)
        result.push(['address2'])
      }
      continue
    }

    const parts = parseFmtLine(line, data)
    if (parts.length > 0) result.push(parts)
  }

  // Inject careOf before the first address line
  const firstAddressIdx = result.findIndex((line) =>
    line.some(
      (p) =>
        p === 'address1' ||
        p === 'address2' ||
        (typeof p === 'object' &&
          (p.attribute === 'address1' || p.attribute === 'address2')),
    ),
  )
  if (firstAddressIdx !== -1) {
    result.splice(firstAddressIdx, 0, ['careOf'])
  }

  // Add country line if not already present
  const hasCountry = result.some((line) =>
    line.some(
      (p) =>
        p === 'country' || (typeof p === 'object' && p.attribute === 'country'),
    ),
  )
  if (!hasCountry) {
    result.push([{ attribute: 'country', transforms: ['capitalize'] }])
  }

  return { default: { array: result } }
}

function main() {
  const raw = readFileSync(INPUT_PATH, 'utf-8')
  const googleData: Record<string, GoogleAddressData> = JSON.parse(raw)

  const transformed: Record<string, TransformedFormat> = {}
  let count = 0

  for (const [cc, data] of Object.entries(googleData)) {
    const result = transformCountry(data)
    if (result) {
      transformed[cc] = result
      count++
    }
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(transformed, null, 2))
  console.log(`Transformed ${count} countries → ${OUTPUT_PATH}`)
}

main()
