import PostalAddress from '../postal-address'
import PostalAddressError from '../postal-address-error'
import objectInitialState from '../object-initial-state'
import { addCommaAfter } from '../address-transforms'
import type { AddFormatArgs } from '../types/address-format'

const expectedOutputPT = `\
Portugal
Porto
Happy Park
Edifício 4, Piso 2
SmartShoes Portugal, Lda.`

const expectedOutputUSWithoutTransforms = `\
123 Nevermore Rd
Austin TX 78752`

const expectedOutputUSWithTransforms = `\
123 Nevermore Rd
Austin, TX 78752`

const customFormatOverwrite: AddFormatArgs = {
  country: 'RU',
  format: [
    [{ attribute: 'lastName', transforms: [addCommaAfter] }, 'firstName'],
    ['city', 'postalCode'],
    ['country'],
  ],
  type: 'business',
}

const customFormatOutputOverwrite = `\
Pestana, John
Porto 4000-123
Portugal`

// prettier-ignore
const customFormatNew: AddFormatArgs = {
  country: 'GB',
  format: [
    ['address1'],
    ['city', 'postalCode'],
  ],
  type: 'personal',
}

const customFormatOutputNew = `\
Happy Park
Porto 4000-123`

describe('Postal Address', () => {
  it('should be a valid constructor', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const myAddressPersonal = new PostalAddress()
    }).not.toThrow()
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const myAddressBusiness = new PostalAddress()
    }).not.toThrow()
  })

  it('should output a valid formatted postal address (PT)', () => {
    const myAddressBusiness = new PostalAddress()
    myAddressBusiness
      .setAddress1('Happy Park')
      .setAddress2('Edifício 4, Piso 2')
      .setCity('Porto')
      .setCompanyName('SmartShoes Portugal, Lda.')
      .setCountry('Portugal')
      .setPostalCode('4000-123')
      .setFormat({
        country: 'RU',
        type: 'business',
      })

    expect(myAddressBusiness.toString()).toBe(expectedOutputPT)
  })

  it('should output a valid formatted postal address (US)', () => {
    const myAddressPersonal = new PostalAddress()
    myAddressPersonal
      .setAddress1('123 Nevermore Rd')
      .setCity('Austin')
      .setState('TX')
      .setPostalCode('78752')
      .setFormat({
        country: 'US',
        type: 'personal',
        useTransforms: false,
      })

    expect(myAddressPersonal.toString()).toBe(expectedOutputUSWithoutTransforms)

    myAddressPersonal.setFormat({
      country: 'US',
      type: 'personal',
      useTransforms: true,
    })
    expect(myAddressPersonal.toString()).toBe(expectedOutputUSWithTransforms)
  })
})

describe('Custom Formats', () => {
  const customFormats: [unknown, string][] = [
    [
      {
        country: null,
        format: null,
      },
      'Country is not specified, but is required',
    ],
    [
      {
        country: 'Portugal',
        format: null,
      },
      'Country is not an ISO 3166-1 alpha-2 code',
    ],
    [
      {
        country: 'PT',
        format: null,
      },
      'Format is not specified, but is required',
    ],
    [
      {
        country: 'PT',
        format: [],
      },
      'Format is invalid, should be an array of arrays of strings or objects',
    ],
    [
      {
        country: 'PT',
        format: [
          [{ attribute: 'lastName' }, 'firstName'],
          ['town', 'postalCode'],
          ['country'],
        ],
      },
      'Format contains invalid tokens',
    ],
  ]

  it.each(customFormats)(
    'test invalid custom format: %s',
    (format, errorMessage) => {
      expect(() => {
        const myAddressBusiness = new PostalAddress()
        myAddressBusiness.addFormat(format as AddFormatArgs)
      }).toThrow(new PostalAddressError(errorMessage))
    },
  )

  it('should allow custom formats (overwrite)', () => {
    const myAddressBusiness = new PostalAddress()
    myAddressBusiness
      .setAddress1('Happy Park')
      .setAddress2('Edifício 4, Piso 2')
      .setCity('Porto')
      .setCompanyName('SmartShoes Portugal, Lda.')
      .setCountry('Portugal')
      .setPostalCode('4000-123')
      .setFormat({
        country: 'RU',
        type: 'business',
      })

    expect(myAddressBusiness.toString()).toBe(expectedOutputPT)

    myAddressBusiness.addFormat(customFormatOverwrite)

    expect(myAddressBusiness.toString()).not.toBe(expectedOutputPT)

    myAddressBusiness.setFirstName('John').setLastName('Pestana')

    expect(myAddressBusiness.toString()).toBe(customFormatOutputOverwrite)
  })

  it('should allow custom formats (new)', () => {
    const myAddressBusiness = new PostalAddress()
    myAddressBusiness
      .setAddress1('Happy Park')
      .setAddress2('Edifício 4, Piso 2')
      .setCity('Porto')
      .setCompanyName('SmartShoes Portugal, Lda.')
      .setCountry('Portugal')
      .setPostalCode('4000-123')
      .setFormat({
        country: 'RU',
        type: 'business',
      })

    expect(myAddressBusiness.toString()).toBe(expectedOutputPT)

    myAddressBusiness.addFormat(customFormatNew).setFormat({
      country: 'GB',
      type: 'personal',
    })

    expect(myAddressBusiness.toString()).not.toBe(expectedOutputPT)

    myAddressBusiness.setFirstName('John').setLastName('Pestana')

    expect(myAddressBusiness.toString()).toBe(customFormatOutputNew)
  })
})

describe('Initial Value [empty]', () => {
  const myAddress = new PostalAddress()

  it('should have an empty address (string)', () => {
    expect(myAddress.toString()).toBe('')
  })

  it('should have an empty address (array)', () => {
    expect(myAddress.toArray()).toEqual([])
  })

  it('should have an empty address (object)', () => {
    expect(myAddress.toObject()).toEqual(objectInitialState)
  })
})

describe('Initial Value [full non-empty]', () => {
  const presetState = {
    address1: 'Happy Park',
    address2: 'Edifício 4, Piso 2',
    addressNum: '',
    city: 'Porto',
    companyName: 'SmartShoes Portugal, Lda.',
    country: 'Portugal',
    countryAlpha2: 'PT',
    do: '',
    dong: 'Happy Park',
    firstLastName: '',
    firstName: 'John',
    gu: '',
    honorific: '',
    jobTitle: '',
    lastName: 'Pestana',
    postalCode: '4000-123',
    prefecture: '',
    province: '',
    region: '',
    republic: '',
    secondLastName: 'Pestana',
    secondName: '',
    si: 'Porto',
    state: '',
    title: '',
  }
  const myAddress = new PostalAddress(presetState)

  it('should have a non-empty address (string)', () => {
    expect(myAddress.toString()).toBe(`\
John Pestana
SmartShoes Portugal, Lda.
Happy Park
Edifício 4, Piso 2
Porto, 4000-123
PORTUGAL\
`)
  })

  it('should have a non-empty address (array)', () => {
    expect(myAddress.toArray()).toEqual([
      ['John', 'Pestana'],
      ['SmartShoes Portugal, Lda.'],
      ['Happy Park'],
      ['Edifício 4, Piso 2'],
      ['Porto,', '4000-123'],
      ['PORTUGAL'],
    ])
  })

  it('should have a non-empty address (object)', () => {
    expect(myAddress.toObject()).toEqual(presetState)
  })
})

describe('Initial Value [partial non-empty]', () => {
  const presetState = {
    address1: 'Happy Park',
    address2: 'Edifício 4, Piso 2',
    city: 'Porto',
    companyName: 'SmartShoes Portugal, Lda.',
    country: 'Portugal',
    countryAlpha2: 'PT',
    dong: 'Happy Park',
    firstName: 'John',
    lastName: 'Pestana',
    postalCode: '4000-123',
    secondLastName: 'Pestana',
    si: 'Porto',
  }
  const myAddress = new PostalAddress(presetState)

  it('should have a non-empty address (string)', () => {
    expect(myAddress.toString()).toBe(`\
John Pestana
SmartShoes Portugal, Lda.
Happy Park
Edifício 4, Piso 2
Porto, 4000-123
PORTUGAL\
`)
  })

  it('should have a non-empty address (array)', () => {
    expect(myAddress.toArray()).toEqual([
      ['John', 'Pestana'],
      ['SmartShoes Portugal, Lda.'],
      ['Happy Park'],
      ['Edifício 4, Piso 2'],
      ['Porto,', '4000-123'],
      ['PORTUGAL'],
    ])
  })

  it('should have a non-empty address (object)', () => {
    expect(myAddress.toObject()).toEqual({
      ...objectInitialState,
      ...presetState,
    })
  })
})
