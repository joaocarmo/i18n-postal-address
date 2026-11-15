import {
  addCommaAfter,
  capitalize,
  capitalizeWhenTwo,
  pascalCase,
} from './address-transforms.js'

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

describe('Address Transforms: values that are not strings', () => {
  it.each([addCommaAfter, capitalize, capitalizeWhenTwo, pascalCase])(
    'should return the value unchanged from %o',
    (transform) => {
      const value = 42 as unknown as string

      expect(transform(value)).toBe(value)
    },
  )
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
