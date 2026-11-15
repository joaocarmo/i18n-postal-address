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
  postalCode: '4000-123',
}

const parse = (format: unknown, useTransforms = true) =>
  arrayParser(object, format as AcceptAddressFormat, useTransforms)

describe('arrayParser', () => {
  it('should return no lines when the format is not an array', () => {
    expect(parse('city')).toEqual([])
  })

  it('should skip lines that are not arrays', () => {
    expect(parse(['city', ['postalCode']])).toEqual([['4000-123']])
  })

  it('should skip parts that are neither strings nor objects', () => {
    expect(parse([[42, 'city']])).toEqual([['Porto']])
  })

  it('should skip object parts without a string attribute', () => {
    expect(parse([[{ attribute: 42 }, 'city']])).toEqual([['Porto']])
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
      ['Porto,', '4000-123'],
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
})
