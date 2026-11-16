import {
  addCommaAfter,
  capitalize,
  capitalizeWhenTwo,
  omitIfSameAsCity,
  pascalCase,
} from './address-transforms.js'
import objectInitialState from './object-initial-state.js'

describe('Address Transforms: addCommaAfter', () => {
  it('should accept "string" and output "string,"', () => {
    expect(addCommaAfter('string')).toBe('string,')
  })

  it('should do nothing if empty', () => {
    expect(addCommaAfter('')).toBe('')
  })
})

describe('Address Transforms: capitalize', () => {
  it('should accept "string" and output "STRING"', () => {
    expect(capitalize('string')).toBe('STRING')
  })

  it('should do nothing if empty', () => {
    expect(capitalize('')).toBe('')
  })
})

describe('Address Transforms: omitIfSameAsCity', () => {
  const address = { ...objectInitialState, city: 'Montevideo' }

  it('should return an empty value when it equals the city', () => {
    expect(omitIfSameAsCity(' MONTEVIDEO ', address)).toBe('')
  })

  it('should return the value when it differs from the city', () => {
    expect(omitIfSameAsCity('Canelones', address)).toBe('Canelones')
  })

  it('should return the value when no address is given', () => {
    expect(omitIfSameAsCity('Montevideo')).toBe('Montevideo')
  })
})

describe('Address Transforms: values that are not strings', () => {
  it.each([
    addCommaAfter,
    capitalize,
    capitalizeWhenTwo,
    omitIfSameAsCity,
    pascalCase,
  ])('should return the value unchanged from %o', (transform) => {
    const value = 42 as unknown as string

    expect(transform(value)).toBe(value)
  })
})

describe('Address Transforms: capitalizeWhenTwo', () => {
  it('should capitalize a value of 2 characters', () => {
    expect(capitalizeWhenTwo('pt')).toBe('PT')
  })

  it('should leave other lengths unchanged', () => {
    expect(capitalizeWhenTwo('porto')).toBe('porto')
  })

  it('should do nothing if empty', () => {
    expect(capitalizeWhenTwo('')).toBe('')
  })
})

describe('Address Transforms: pascalCase', () => {
  it('should capitalize the first letter of each word', () => {
    expect(pascalCase('rua do PASTEL')).toBe('Rua Do Pastel')
  })
})
