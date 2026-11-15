import {
  allowedTokens,
  constructInitialObject,
  containsValidTokens,
  isValidFormat,
} from './utils.js'
import objectInitialState from './object-initial-state.js'
import type { AddressFormatPart } from './types/address-format.js'

describe('test the allowed tokens', () => {
  it('should be an array of strings', () => {
    expect(Array.isArray(allowedTokens)).toBe(true)
    expect(allowedTokens.length).toBeGreaterThan(0)
    expect(typeof allowedTokens[0]).toBe('string')
  })
})

describe('test the token validator fn', () => {
  const formats: [string, unknown, boolean][] = [
    ['invalid', [['string']], false],
    ['invalid', [[{ attribute: 'string' }]], false],
    [
      'valid',
      [
        [{ attribute: 'familyName' }, 'givenName'],
        ['city', 'postalCode'],
        ['country'],
      ],
      true,
    ],
  ]

  it.each(formats)('testing %s format: %s', (description, format, expected) => {
    expect(containsValidTokens(format as AddressFormatPart[][])).toBe(expected)
  })
})

describe('test the format validator fn', () => {
  const formats: [string, unknown, boolean][] = [
    ['invalid', undefined, false],
    ['invalid', null, false],
    ['invalid', 1, false],
    ['invalid', 'string', false],
    ['invalid', {}, false],
    ['invalid', [], false],
    ['invalid', ['string'], false],
    ['invalid', [{ attribute: 'string' }], false],
    ['invalid', [[{}]], false],
    ['valid', [['string']], true],
    ['valid', [[{ attribute: 'string' }]], true],
  ]

  it.each(formats)('testing %s format: %s', (description, format, expected) => {
    expect(isValidFormat(format as AddressFormatPart[][])).toBe(expected)
  })
})

describe('constructInitialObject', () => {
  it('should ignore unknown keys and values that are not strings', () => {
    const presetState = {
      city: 'Porto',
      postalCode: 4000,
      unknown: 'value',
    } as unknown as Parameters<typeof constructInitialObject>[0]

    expect(constructInitialObject(presetState)).toEqual({
      ...objectInitialState,
      city: 'Porto',
    })
  })
})

describe('containsValidTokens', () => {
  it('should reject a format that is not an array', () => {
    expect(
      containsValidTokens('city' as unknown as AddressFormatPart[][]),
    ).toBe(false)
  })
})
