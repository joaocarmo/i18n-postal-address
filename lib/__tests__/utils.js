import { isValidFormat } from '../utils'

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

  it.each(formats)('testing %s format', (description, format, expected) => {
    expect(isValidFormat(format)).toBe(expected)
  })
})
