import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const BASE_URL = 'https://chromium-i18n.appspot.com/ssl-address/data'
const OUTPUT_PATH = 'scripts/.cache/google-formats.json'
const DELAY_MS = 50

interface GoogleAddressData {
  id: string
  key: string
  name: string
  lang?: string
  languages?: string
  fmt?: string
  lfmt?: string
  require?: string
  upper?: string
  zip?: string
  zipex?: string
  posturl?: string
  zip_name_type?: string
  state_name_type?: string
  locality_name_type?: string
  sublocality_name_type?: string
  sub_keys?: string
  sub_names?: string
  sub_lnames?: string
  sub_zips?: string
  sub_isoids?: string
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`)
  return res.json() as Promise<T>
}

async function main() {
  console.log('Fetching country list...')
  const root = await fetchJson<{ countries: string }>(BASE_URL)
  const countries = root.countries.split('~')
  console.log(`Found ${countries.length} countries`)

  const result: Record<string, GoogleAddressData> = {}
  let fetched = 0

  for (const cc of countries) {
    try {
      result[cc] = await fetchJson<GoogleAddressData>(`${BASE_URL}/${cc}`)
      fetched++
      if (fetched % 25 === 0) {
        console.log(`  ${fetched}/${countries.length}...`)
      }
    } catch (err) {
      console.warn(`  Warning: failed to fetch ${cc}: ${err}`)
    }
    await sleep(DELAY_MS)
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true })

  // Validate each entry has the expected shape before writing
  for (const [cc, entry] of Object.entries(result)) {
    if (typeof entry.key !== 'string' || entry.key !== cc) {
      throw new Error(`Invalid data for ${cc}: unexpected key "${entry.key}"`)
    }
  }

  // JSON.stringify guarantees safe output (no code injection)
  writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2))
  console.log(`Done. ${fetched} countries written to ${OUTPUT_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
