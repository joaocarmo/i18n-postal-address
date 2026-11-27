import arrayParser from './address-parsers.js'
import { addCommaAfter } from './address-transforms.js'
import objectInitialState from './object-initial-state.js'
import type {
  AcceptAddressFormat,
  AddressObject,
} from './types/address-format.js'

const object: AddressObject = {
  ...objectInitialState,
  city: 'Porto',
  postalCode: '4049-001',
}

const parse = (format: unknown, useTransforms = true) =>
  arrayParser(object, format as AcceptAddressFormat, useTransforms)

describe('arrayParser', () => {
  it('should return no lines when the format is not an array', () => {
    expect(parse('city')).toEqual([])
  })

  it('should skip lines that are not arrays', () => {
    expect(parse(['city', ['postalCode']])).toEqual([['4049-001']])
  })

  it('should skip parts that are neither strings nor objects', () => {
    expect(parse([[42, 'city']])).toEqual([['Porto']])
  })

  it('should skip object parts without a string attribute', () => {
    expect(parse([[{ attribute: 42 }, 'city']])).toEqual([['Porto']])
  })

  it('should pass the address to each transform', () => {
    const transform = vi.fn((value: string) => value)

    parse([[{ attribute: 'city', transforms: [transform] }]])

    expect(transform).toHaveBeenCalledWith('Porto', object)
  })

  it('should throw and keep the address unchanged when a transform writes to it', () => {
    const address = { ...object }

    expect(() =>
      arrayParser(
        address,
        [
          [
            {
              attribute: 'city',
              transforms: [
                (value, copy) => {
                  ;(copy as AddressObject).city = 'Lisboa'
                  return value
                },
              ],
            },
          ],
        ],
        true,
      ),
    ).toThrow(TypeError)
    expect(address.city).toBe('Porto')
  })

  it('should skip transforms that are not functions', () => {
    expect(
      parse([[{ attribute: 'city', transforms: ['capitalize'] }]]),
    ).toEqual([['Porto']])
  })

  it('should accept an object part without transforms', () => {
    expect(parse([[{ attribute: 'city' }]])).toEqual([['Porto']])
  })

  it('should not apply the transforms when they are disabled', () => {
    const toUpperCase = (value: string) => value.toUpperCase()

    expect(
      parse([[{ attribute: 'city', transforms: [toUpperCase] }]], false),
    ).toEqual([['Porto']])
  })

  const cityWithComma = { attribute: 'city', transforms: [addCommaAfter] }

  it('should keep an added comma when another part follows', () => {
    expect(parse([[cityWithComma, 'postalCode']])).toEqual([
      ['Porto,', '4049-001'],
    ])
  })

  it('should drop an added comma when no part follows', () => {
    expect(parse([[cityWithComma, 'state']])).toEqual([['Porto']])
  })

  it('should keep a comma that is part of the value', () => {
    expect(
      arrayParser(
        { ...object, city: 'Porto,' },
        [[{ attribute: 'city' }]],
        true,
      ),
    ).toEqual([['Porto,']])
  })

  const cjk: AddressObject = {
    ...objectInitialState,
    familyName: '李',
    givenName: '志敏',
    additionalName: 'X',
    honorificPrefix: '先生',
    postalCode: '104-0061',
    prefecture: '東京都',
    city: '中央区',
  }
  const glued = { attribute: 'city', separator: '' }

  it('should join a part to the part before it with its separator', () => {
    expect(
      arrayParser(
        cjk,
        [
          [
            'familyName',
            { attribute: 'givenName', separator: '' },
            { attribute: 'additionalName', separator: '' },
            'honorificPrefix',
          ],
        ],
        true,
      ),
    ).toEqual([['李志敏X', '先生']])
  })

  it('should print a part on its own when the part before it is empty', () => {
    expect(
      arrayParser(
        { ...cjk, prefecture: '' },
        [['postalCode', 'prefecture', glued]],
        true,
      ),
    ).toEqual([['104-0061', '中央区']])
  })

  it('should join across an empty part that has a separator', () => {
    expect(
      arrayParser(
        { ...cjk, givenName: '' },
        [
          [
            'familyName',
            { attribute: 'givenName', separator: '' },
            { attribute: 'additionalName', separator: '' },
          ],
        ],
        true,
      ),
    ).toEqual([['李X']])
  })

  it('should drop a trailing comma from a joined part', () => {
    expect(
      arrayParser(
        cjk,
        [['prefecture', { ...glued, transforms: [addCommaAfter] }]],
        true,
      ),
    ).toEqual([['東京都中央区']])
  })

  it('should join parts when transforms are off', () => {
    expect(arrayParser(cjk, [['prefecture', glued]], false)).toEqual([
      ['東京都中央区'],
    ])
  })
})
