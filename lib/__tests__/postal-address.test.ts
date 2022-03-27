import PostalAddress from '../postal-address'
import PostalAddressError from '../postal-address-error'
import { addCommaAfter } from '../address-transforms'
import { AddFormatArgs } from '../types/address-format'

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

const customFormat: AddFormatArgs = {
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
      .setOutputFormat('array')
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
        myAddressBusiness.addFormat(format as AddFormatArgs)
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
