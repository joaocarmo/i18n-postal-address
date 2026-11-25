import { addressFormats } from './index.js'

describe('Address Formats', () => {
  it('should contain a "default" key', () => {
    const countryKeys = Object.keys(addressFormats) as Array<
      keyof typeof addressFormats
    >
    const numCountries = countryKeys.length
    const numDefaults = countryKeys.reduce((acc: number, val) => {
      if (addressFormats[val].default) {
        return acc + 1
      }
      return acc
    }, 0)

    expect(numDefaults).toBe(numCountries)
  })

  it('should print additionalName right after givenName in every format', () => {
    const missing = Object.entries(addressFormats).flatMap(([country, types]) =>
      Object.entries(types).flatMap(([type, { array }]) =>
        (array ?? [])
          .map((line) =>
            line.map((part) =>
              typeof part === 'object' ? part.attribute : part,
            ),
          )
          .filter((parts) => {
            const given = parts.indexOf('givenName')
            return given >= 0 && parts[given + 1] !== 'additionalName'
          })
          .map(() => `${country} ${type}`),
      ),
    )

    expect(missing).toEqual([])
  })
})
