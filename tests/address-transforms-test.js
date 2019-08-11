import PostalAddress from '..'
import addressFormats from '../lib/address-formats'
import { capitalize } from '../lib/address-transforms'
import countries from '../lib/countries'
import objectInitialState from '../lib/object-initial-state'

it('the default exposed method is a constructor', () => {
  expect(() => {
    const myPostalAddress = new PostalAddress()
  }).not.toThrow()
})

it('capitalize should accept "string" and output "STRING"', () => {
  expect(capitalize('string')).toBe('STRING')
})

it('all address formats should contain a "default" key', () => {
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


it('all countries should be mapped to a 2-letter country code', () => {
  const ALPHA2 = 2
  const countryKeys = Object.keys(countries)
  const numCountries = countryKeys.length
  const numDefaults = countryKeys.reduce((acc, val) => {
    if (typeof countries[val] === 'string' &&
    countries[val].length === ALPHA2) {
      return acc + 1
    }
    return acc
  }, 0)

  expect(numDefaults).toBe(numCountries)
})

it('all keys in the objected initial state should be empty strings', () => {
  const keys = Object.keys(objectInitialState)
  const numKeys = keys.length
  const numEmptyStrs = keys.reduce((acc, val) => {
    if (typeof objectInitialState[val] === 'string' &&
    !objectInitialState[val]) {
      return acc + 1
    }
    return acc
  }, 0)

  expect(numEmptyStrs).toBe(numKeys)
})
