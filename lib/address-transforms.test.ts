import {
  addCommaAfter,
  capitalize,
  capitalizeWhenTwo,
  omitIfArgentineCpa,
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

describe('Address Transforms: omitIfArgentineCpa', () => {
  const address = { ...objectInitialState, postalCode: ' c1043aaz ' }

  it('should return an empty value when the postal code is a full CPA', () => {
    expect(omitIfArgentineCpa('CABA', address)).toBe('')
  })

  it('should ignore spaces and hyphens in a full CPA', () => {
    expect(
      omitIfArgentineCpa('CABA', { ...address, postalCode: 'C-1043 AAZ' }),
    ).toBe('')
  })

  it('should return the value when the postal code is a short code', () => {
    expect(omitIfArgentineCpa('CABA', { ...address, postalCode: '1043' })).toBe(
      'CABA',
    )
  })

  it('should return the value when no address is passed', () => {
    expect(omitIfArgentineCpa('CABA')).toBe('CABA')
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

  it('should compare composed and decomposed accents as equal', () => {
    expect(
      omitIfSameAsCity('Bras\u0326ov', {
        ...address,
        city: 'Bra\u0219ov',
      }),
    ).toBe('')
  })

  it('should treat a cedilla value as equal to a comma-below city', () => {
    expect(
      omitIfSameAsCity('Bra\u015Fov', { ...address, city: 'Bra\u0219ov' }),
    ).toBe('')
    expect(
      omitIfSameAsCity('CONSTAN\u0162A', {
        ...address,
        city: 'Constan\u021Ba',
      }),
    ).toBe('')
  })

  it('should treat a comma-below value as equal to a cedilla city', () => {
    expect(
      omitIfSameAsCity('Bra\u0219ov', { ...address, city: 'Bra\u015Fov' }),
    ).toBe('')
  })

  it('should compare letters with and without accents as different', () => {
    expect(omitIfSameAsCity('San José', { ...address, city: 'San Jose' })).toBe(
      'San José',
    )
  })

  it('should return the value when the address has no city', () => {
    expect(omitIfSameAsCity('Montevideo', {} as typeof address)).toBe(
      'Montevideo',
    )
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
    omitIfArgentineCpa,
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
