import addressFormats from '../address-formats'

describe('Address Formats', () => {
  it('should contain a "default" key', () => {
    const countryKeys = Object.keys(addressFormats)
    const numCountries = countryKeys.length
    const numDefaults = countryKeys.reduce((acc, val) => {
      if (addressFormats[val].default) {
        return acc + 1
      }
      return acc
    }, 0)

    expect(numDefaults).toBe(numCountries)
  })
})
