import countries from '../countries.json'
import { Countries } from '../types/address-format'

describe('Countries', () => {
  it('should be mapped to a 2-letter country code', () => {
    const ALPHA2 = 2
    const countryKeys = Object.keys(countries)
    const numCountries = countryKeys.length
    const numDefaults = countryKeys.reduce((acc, val) => {
      if (
        typeof (countries as Countries)[val] === 'string' &&
        (countries as Countries)[val].length === ALPHA2
      ) {
        return acc + 1
      }
      return acc
    }, 0)

    expect(numDefaults).toBe(numCountries)
  })
})
