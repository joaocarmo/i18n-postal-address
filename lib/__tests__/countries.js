import countries from '../countries.json'

describe('Countries', () => {
  it('should be mapped to a 2-letter country code', () => {
    const ALPHA2 = 2
    const countryKeys = Object.keys(countries)
    const numCountries = countryKeys.length
    const numDefaults = countryKeys.reduce((acc, val) => {
      if (typeof countries[val] === 'string'
      && countries[val].length === ALPHA2) {
        return acc + 1
      }
      return acc
    }, 0)

    expect(numDefaults).toBe(numCountries)
  })
})
