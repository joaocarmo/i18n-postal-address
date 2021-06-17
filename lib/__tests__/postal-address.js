import PostalAddress from '../postal-address'
import PostalAddressError from '../postal-address-error'
import { addCommaAfter } from '../address-transforms'
import * as constants from '../constants'

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

const customFormat = {
  country: 'RU',
  format: [
    [{ attribute: 'lastName', transforms: [addCommaAfter] }, 'firstName'],
    ['city', 'postalCode'],
    ['country'],
  ],
  type: 'business',
}

const customFormatOutput = `\
Pestana, John
Porto 4000-123
Portugal`

describe('Postal Address', () => {
  let myAddressPersonal = null
  let myAddressBusiness = null

  it('should be a valid constructor', () => {
    expect(() => {
      myAddressPersonal = new PostalAddress()
    }).not.toThrow()
    expect(() => {
      myAddressBusiness = new PostalAddress()
    }).not.toThrow()
  })

  it('should output a valid formatted postal address (PT)', () => {
    myAddressBusiness
      .setAddress1('Happy Park')
      .setAddress2('Edifício 4, Piso 2')
      .setCity('Porto')
      .setCompanyName('SmartShoes Portugal, Lda.')
      .setCountry('Portugal')
      .setPostalCode('4000-123')
      .setOutputFormat('array')
      .setFormat({
        country: 'RU',
        type: 'business',
      })

    expect(myAddressBusiness.toString()).toBe(expectedOutputPT)
  })

  it('should output a valid formatted postal address (US)', () => {
    myAddressPersonal
      .setAddress1('123 Nevermore Rd')
      .setCity('Austin')
      .setState('TX')
      .setPostalCode('78752')
      .setOutputFormat('array')
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
  const myAddressBusiness = new PostalAddress()
  const customFormats = [
    [
      {
        country: null,
        format: null,
      },
      constants.ERROR_REQUIRED_COUNTRY,
    ],
    [
      {
        country: 'Portugal',
        format: null,
      },
      constants.ERROR_INVALID_COUNTRY,
    ],
    [
      {
        country: 'PT',
        format: null,
      },
      constants.ERROR_REQUIRED_FORMAT,
    ],
    [
      {
        country: 'PT',
        format: [],
      },
      constants.ERROR_INVALID_FORMAT,
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
      constants.ERROR_INVALID_TOKENS,
    ],
  ]

  it.each(customFormats)(
    'test invalid custom format: %s',
    (format, errorMessage) => {
      expect(() => {
        myAddressBusiness.addFormat(format)
      }).toThrow(new PostalAddressError(errorMessage))
    },
  )

  it('should allow custom formats', () => {
    myAddressBusiness
      .setAddress1('Happy Park')
      .setAddress2('Edifício 4, Piso 2')
      .setCity('Porto')
      .setCompanyName('SmartShoes Portugal, Lda.')
      .setCountry('Portugal')
      .setPostalCode('4000-123')
      .setOutputFormat('array')
      .setFormat({
        country: 'RU',
        type: 'business',
      })

    expect(myAddressBusiness.toString()).toBe(expectedOutputPT)

    myAddressBusiness.addFormat(customFormat)

    expect(myAddressBusiness.toString()).not.toBe(expectedOutputPT)

    myAddressBusiness.setFirstName('John').setLastName('Pestana')

    expect(myAddressBusiness.toString()).toBe(customFormatOutput)
  })
})

describe('String Parser', () => {
  const myStringAddress = new PostalAddress()
  const invalidInputs = [
    undefined,
    null,
    '',
    0,
    42,
    {},
    [],
    () => null,
    new Map(),
  ]
  const validStringAddress = expectedOutputPT

  it.each(invalidInputs)('test invalid input: %s', (input) => {
    expect(() => {
      myStringAddress.fromString(input)
    }).toThrow(new PostalAddressError(constants.ERROR_INVALID_STRING))
  })

  it('should accept only non-empty strings', () =>
    expect(() => {
      myStringAddress.fromString(validStringAddress)
    }).not.toThrow(new PostalAddressError(constants.ERROR_INVALID_STRING)))
})
