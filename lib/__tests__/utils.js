import { allowedTokens, containsValidTokens, isValidFormat } from '../utils'

describe('test the allowed tokens', () => {
  it('should be an array of strings', () => {
    expect(Array.isArray(allowedTokens)).toBe(true)
    expect(allowedTokens.length).toBeGreaterThan(0)
    expect(typeof allowedTokens[0]).toBe('string')
  })
})

describe('test the token validator fn', () => {
  const formats = [
    ['invalid', [['string']], false],
    ['invalid', [[{ attribute: 'string' }]], false],
    [
      'valid',
      [
        [{ attribute: 'lastName' }, 'firstName'],
        ['city', 'postalCode'],
        ['country'],
      ],
      true,
    ],
  ]

  it.each(formats)('testing %s format: %s', (description, format, expected) => {
    expect(containsValidTokens(format)).toBe(expected)
  })
})

describe('test the format validator fn', () => {
  const formats = [
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
    expect(isValidFormat(format)).toBe(expected)
  })
})
