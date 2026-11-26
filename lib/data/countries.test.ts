import countries, { toCountryKey } from './countries.js'
import { addressFormats } from '../index.js'

describe('Countries', () => {
  it('should be mapped to a 2-letter country code', () => {
    const ALPHA2 = 2
    const countryKeys = Object.keys(countries) as Array<keyof typeof countries>
    const numCountries = countryKeys.length
    const numDefaults = countryKeys.reduce((acc, val) => {
      if (
        typeof countries[val] === 'string' &&
        countries[val].length === ALPHA2
      ) {
        return acc + 1
      }
      return acc
    }, 0)

    expect(numDefaults).toBe(numCountries)
  })

  it('should name every country that has a format', () => {
    const named = new Set<string>(Object.values(countries))
    const unnamed = Object.keys(addressFormats).filter(
      (code) => !named.has(code),
    )

    expect(unnamed).toEqual([])
  })

  it('should map each lookup key to 1 code', () => {
    const codesByKey = new Map<string, Set<string>>()

    for (const [name, code] of Object.entries(countries)) {
      const key = toCountryKey(name)
      codesByKey.set(key, (codesByKey.get(key) ?? new Set()).add(code))
    }

    const ambiguous = [...codesByKey].filter(([, codes]) => codes.size > 1)

    expect(ambiguous).toEqual([])
  })
})
