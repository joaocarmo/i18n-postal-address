import { readFileSync, writeFileSync } from 'node:fs'
import addressFormats from '../lib/address-formats'

const TRANSFORMED_PATH = 'scripts/.cache/transformed-formats.json'
const PROPOSED_PATH = 'scripts/.cache/proposed-formats.json'

type FormatPart = string | { attribute: string; transforms?: string[] }

interface FormatEntry {
  default: {
    array: FormatPart[][]
  }
}

function normalizeTransform(t: unknown): string {
  if (typeof t === 'string') return t
  if (typeof t === 'function') return t.name || 'unknown'
  return String(t)
}

function normalizePart(part: FormatPart): string {
  if (typeof part === 'string') return part
  const transforms = (part.transforms ?? [])
    .map(normalizeTransform)
    .sort()
    .join(',')
  return transforms ? `${part.attribute}[${transforms}]` : part.attribute
}

function normalizeFormat(format: FormatPart[][]): string {
  return format.map((line) => line.map(normalizePart).join(' | ')).join('\n')
}

function formatLine(line: FormatPart[]): string {
  return (
    '  [' +
    line
      .map((p) => {
        if (typeof p === 'string') return `'${p}'`
        const transforms = (p.transforms ?? []).join(', ')
        return transforms
          ? `{ attribute: '${p.attribute}', transforms: [${transforms}] }`
          : `'${p.attribute}'`
      })
      .join(', ') +
    ']'
  )
}

function printFormat(label: string, format: FormatPart[][]) {
  console.log(`  ${label}:`)
  for (const line of format) {
    console.log(`    ${formatLine(line)}`)
  }
}

function getExistingDefaultArray(cc: string): FormatPart[][] | null {
  const country = (
    addressFormats as Record<string, Record<string, { array?: FormatPart[][] }>>
  )[cc]
  if (!country) return null
  const defaultFmt = country.default
  if (!defaultFmt?.array) return null
  return defaultFmt.array
}

function main() {
  const raw = readFileSync(TRANSFORMED_PATH, 'utf-8')
  const transformed: Record<string, FormatEntry> = JSON.parse(raw)

  const allCodes = new Set([
    ...Object.keys(transformed),
    ...Object.keys(addressFormats),
  ])

  const matches: string[] = []
  const differs: string[] = []
  const missing: string[] = []
  const extra: string[] = []

  for (const cc of [...allCodes].sort()) {
    const google = transformed[cc]?.default?.array
    const existing = getExistingDefaultArray(cc)

    if (google && existing) {
      const gNorm = normalizeFormat(google)
      const eNorm = normalizeFormat(existing)
      // Also compare ignoring lines that may differ by design:
      // - companyName: present in default but not personal types
      // - careOf: injected by transform but may not match position exactly
      const ignoredFields = new Set(['companyName', 'careOf'])
      const filterIgnored = (format: FormatPart[][]) =>
        format.filter(
          (line) =>
            !(
              line.length === 1 &&
              typeof line[0] === 'string' &&
              ignoredFields.has(line[0])
            ),
        )
      const gFiltered = normalizeFormat(filterIgnored(google))
      const eFiltered = normalizeFormat(filterIgnored(existing))
      if (gNorm === eNorm || gFiltered === eFiltered) {
        matches.push(cc)
      } else {
        differs.push(cc)
      }
    } else if (google && !existing) {
      missing.push(cc)
    } else if (!google && existing) {
      extra.push(cc)
    }
  }

  // Print results
  console.log(`\n=== ADDRESS FORMAT DIFF ===\n`)
  console.log(
    `Match: ${matches.length} | Differs: ${differs.length} | Missing: ${missing.length} | Extra: ${extra.length}\n`,
  )

  if (matches.length > 0) {
    console.log(`--- MATCH (${matches.length}) ---`)
    console.log(matches.join(', '))
    console.log()
  }

  if (differs.length > 0) {
    console.log(`--- DIFFERS (${differs.length}) ---`)
    for (const cc of differs) {
      console.log(`\n[${cc}]`)
      const existing = getExistingDefaultArray(cc)
      const google = transformed[cc]?.default?.array
      if (existing) printFormat('Existing', existing)
      if (google) printFormat('Google', google)
    }
    console.log()
  }

  if (missing.length > 0) {
    console.log(`--- MISSING (${missing.length}) ---`)
    for (const cc of missing) {
      console.log(`\n[${cc}]`)
      const google = transformed[cc]?.default?.array
      if (google) printFormat('Google', google)
    }
    console.log()
  }

  if (extra.length > 0) {
    console.log(`--- EXTRA (in library, not in Google) ---`)
    console.log(extra.join(', '))
    console.log()
  }

  // Write proposed formats
  writeFileSync(PROPOSED_PATH, JSON.stringify(transformed, null, 2))
  console.log(`Proposed formats written to ${PROPOSED_PATH}`)
}

main()
