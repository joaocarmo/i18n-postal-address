import PostalAddress, { addressFormats } from '../index'
import PostalAddressError from '../postal-address-error'
import objectInitialState from '../object-initial-state'
import { addCommaAfter } from '../address-transforms'
import type { AddFormatArgs } from '../types/address-format'
import * as formats from '../formats/index'

const expectedOutputPT = `\
PORTUGAL
PORTO
Happy Park
Edifício 4, Piso 2
SmartShoes Portugal, Lda.`

const expectedOutputUSWithoutTransforms = `\
123 Nevermore Rd
Austin TX 78752`

const expectedOutputUSWithTransforms = `\
123 Nevermore Rd
AUSTIN, TX 78752`

const customFormatOverwrite: AddFormatArgs = {
  country: 'RU',
  format: [
    [{ attribute: 'familyName', transforms: [addCommaAfter] }, 'givenName'],
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

describe('Constructor', () => {
  it('should throw when no formats are provided', () => {
    expect(() => new PostalAddress({ formats: {} })).toThrow(
      'At least one format must be provided',
    )
  })

  it('should auto-default to the single format country', () => {
    const addr = new PostalAddress({ formats: { PT: formats.PT } })
    addr
      .setAddress1('Rua do Pastel, 19')
      .setCity('Lisboa')
      .setPostalCode('1000')
    expect(addr.toString()).not.toBe('')
  })

  it('should throw when multiple formats are provided without a country', () => {
    expect(
      () => new PostalAddress({ formats: { US: formats.US, PT: formats.PT } }),
    ).toThrow('Multiple formats provided, but no default format specified')
  })

  it('should accept multiple formats with an explicit country', () => {
    expect(
      () =>
        new PostalAddress({
          formats: { US: formats.US, PT: formats.PT },
          defaultFormat: 'US',
        }),
    ).not.toThrow()
  })

  it('should throw when defaultFormat is not in the provided formats', () => {
    expect(
      () =>
        new PostalAddress({
          formats: { US: formats.US },
          defaultFormat: 'XX',
        }),
    ).toThrow('Default format "XX" is not in the provided formats')
  })

  it('should support the full single-format-then-augment lifecycle', () => {
    // 1. Initiate with a single format
    const addr = new PostalAddress({ formats: { PT: formats.PT } })

    // 2. Defaults to that single format
    addr.setAddress1('Rua do Pastel').setCity('Lisboa').setPostalCode('1000')
    expect(addr.toString()).not.toBe('')

    // 2.1. Setting a different format throws
    expect(() => addr.setFormat({ country: 'US' })).toThrow(
      'Country "US" is not in the provided formats',
    )

    // 3. Augment with a new format
    addr.addFormat({
      country: 'US',
      format: [
        ['givenName', 'familyName'],
        ['address1'],
        ['city', 'state', 'postalCode'],
      ],
    })

    // 4. Default remains PT
    addr.setGivenName('John').setFamilyName('Doe')
    const outputBeforeSwitch = addr.toString()
    expect(outputBeforeSwitch).toContain('Lisboa')

    // 5. The new format is also available
    // 5.1. We can now switch to US (opposed to 2.1)
    addr.setFormat({ country: 'US' })
    const outputAfterSwitch = addr.toArray()
    // US custom format puts givenName/familyName on first line
    expect(outputAfterSwitch[0]).toEqual(['John', 'Doe'])
  })

  it('should throw on unknown country via setFormat', () => {
    const addr = new PostalAddress({ formats: { PT: formats.PT } })
    expect(() => addr.setFormat({ country: 'XX' })).toThrow(
      'Country "XX" is not in the provided formats',
    )
  })
})

describe('Postal Address', () => {
  it('should be a valid constructor', () => {
    expect(
      () => new PostalAddress({ formats: addressFormats, defaultFormat: 'US' }),
    ).not.toThrow()
  })

  it('should output a valid formatted postal address (PT)', () => {
    const myAddressBusiness = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
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
    const myAddressPersonal = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
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
          [{ attribute: 'familyName' }, 'givenName'],
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
        const myAddressBusiness = new PostalAddress({
          formats: addressFormats,
          defaultFormat: 'US',
        })
        myAddressBusiness.addFormat(format as AddFormatArgs)
      }).toThrow(new PostalAddressError(errorMessage))
    },
  )

  it('should allow custom formats (overwrite)', () => {
    const myAddressBusiness = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
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

    myAddressBusiness.setGivenName('John').setFamilyName('Pestana')

    expect(myAddressBusiness.toString()).toBe(customFormatOutputOverwrite)
  })

  it('should allow custom formats (new)', () => {
    const myAddressBusiness = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
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

    myAddressBusiness.setGivenName('John').setFamilyName('Pestana')

    expect(myAddressBusiness.toString()).toBe(customFormatOutputNew)
  })
})

describe('Initial Value [empty]', () => {
  const myAddress = new PostalAddress({
    formats: addressFormats,
    defaultFormat: 'US',
  })

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
    careOf: '',
    city: 'Porto',
    companyName: 'SmartShoes Portugal, Lda.',
    country: 'Portugal',
    countryAlpha2: 'PT',
    do: '',
    dong: 'Happy Park',
    firstFamilyName: '',
    givenName: 'John',
    gu: '',
    honorificPrefix: '',
    jobTitle: '',
    familyName: 'Pestana',
    postalCode: '4000-123',
    prefecture: '',
    province: '',
    region: '',
    republic: '',
    secondFamilyName: 'Pestana',
    additionalName: '',
    si: 'Porto',
    state: '',
    title: '',
  }
  const myAddress = new PostalAddress({
    formats: addressFormats,
    defaultFormat: 'US',
  }).fromObject(presetState)

  it('should have a non-empty address (string)', () => {
    expect(myAddress.toString()).toBe(`\
John Pestana
SmartShoes Portugal, Lda.
Happy Park
Edifício 4, Piso 2
PORTO, 4000-123
PORTUGAL\
`)
  })

  it('should have a non-empty address (array)', () => {
    expect(myAddress.toArray()).toEqual([
      ['John', 'Pestana'],
      ['SmartShoes Portugal, Lda.'],
      ['Happy Park'],
      ['Edifício 4, Piso 2'],
      ['PORTO,', '4000-123'],
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
    givenName: 'John',
    familyName: 'Pestana',
    postalCode: '4000-123',
    secondFamilyName: 'Pestana',
    si: 'Porto',
  }
  const myAddress = new PostalAddress({
    formats: addressFormats,
    defaultFormat: 'US',
  }).fromObject(presetState)

  it('should have a non-empty address (string)', () => {
    expect(myAddress.toString()).toBe(`\
John Pestana
SmartShoes Portugal, Lda.
Happy Park
Edifício 4, Piso 2
PORTO, 4000-123
PORTUGAL\
`)
  })

  it('should have a non-empty address (array)', () => {
    expect(myAddress.toArray()).toEqual([
      ['John', 'Pestana'],
      ['SmartShoes Portugal, Lda.'],
      ['Happy Park'],
      ['Edifício 4, Piso 2'],
      ['PORTO,', '4000-123'],
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

describe('Korean Address Format', () => {
  it('should output a valid formatted postal address (KR) with Korean-specific fields', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    myAddress
      .setFamilyName('Kim')
      .setGivenName('Seojun')
      .setCompanyName('Samsung')
      .setDo('Seoul')
      .setSi('Gangnam-gu')
      .setDong('Seolleung-dong')
      .setAddressNum('114')
      .setPostalCode('06010')
      .setCountry('South Korea')
      .setFormat({ country: 'KR' })

    expect(myAddress.toArray()).toEqual([
      ['Kim', 'Seojun'],
      ['Samsung'],
      ['Seoul', 'Gangnam-gu', 'Seolleung-dong', '114'],
      ['06010', 'SOUTH KOREA'],
    ])
  })

  it('should output a valid formatted postal address (KR) with generic fields via propagation', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    myAddress
      .setFamilyName('Kim')
      .setGivenName('Seojun')
      .setProvince('Seoul')
      .setCity('Gangnam-gu')
      .setAddress1('Seolleung-dong')
      .setPostalCode('06010')
      .setCountry('South Korea')
      .setFormat({ country: 'KR' })

    const output = myAddress.toArray()

    expect(output).toEqual([
      ['Kim', 'Seojun'],
      ['Seoul', 'Gangnam-gu', 'Seolleung-dong'],
      ['06010', 'SOUTH KOREA'],
    ])
  })
})

describe('Care Of', () => {
  it('should include care-of line when set', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    myAddress
      .setGivenName('John')
      .setFamilyName('Doe')
      .setCareOf('c/o Jane Smith')
      .setAddress1('123 Main St')
      .setCity('Austin')
      .setState('TX')
      .setPostalCode('78752')
      .setFormat({ country: 'US' })

    expect(myAddress.toArray()).toEqual([
      ['John', 'Doe'],
      ['c/o Jane Smith'],
      ['123 Main St'],
      ['AUSTIN,', 'TX', '78752'],
    ])
  })

  it('should omit care-of line when empty', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    myAddress
      .setGivenName('John')
      .setFamilyName('Doe')
      .setAddress1('123 Main St')
      .setCity('Austin')
      .setState('TX')
      .setPostalCode('78752')
      .setFormat({ country: 'US' })

    const output = myAddress.toArray()
    const hasCareOf = output.some((line) => line.includes('c/o'))
    expect(hasCareOf).toBe(false)
  })
})

describe('getAddressFormat', () => {
  it('should return the format array for a known country', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    const format = myAddress.getAddressFormat({ country: 'KR' })

    expect(format).toEqual([
      ['familyName', 'givenName', 'honorificPrefix'],
      ['companyName'],
      ['careOf'],
      ['do', 'si', 'dong', 'gu', 'addressNum'],
      [
        'postalCode',
        { attribute: 'country', transforms: [expect.any(Function)] },
      ],
    ])
  })

  it('should return the format for a specific type', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    const format = myAddress.getAddressFormat({
      country: 'US',
      type: 'business',
    })

    expect(format).not.toBeNull()
    expect(Array.isArray(format)).toBe(true)
  })

  it('should fall back to default type when requested type does not exist', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    const defaultFormat = myAddress.getAddressFormat({ country: 'KR' })
    const nonExistentType = myAddress.getAddressFormat({
      country: 'KR',
      type: 'business',
    })

    expect(nonExistentType).toEqual(defaultFormat)
  })

  it('should return null for unknown countries', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    const unknownFormat = myAddress.getAddressFormat({ country: 'ZZ' })

    expect(unknownFormat).toBeNull()
  })

  it('should include custom formats added via addFormat', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    const customFormat = [
      ['familyName', 'givenName'],
      ['city', 'postalCode'],
    ]
    myAddress.addFormat({
      country: 'XX',
      format: customFormat,
      type: 'personal',
    })

    const format = myAddress.getAddressFormat({
      country: 'XX',
      type: 'personal',
    })

    expect(format).toEqual(customFormat)
  })
})

describe('Propagation', () => {
  it('Propagation of changes to related properties can be disabled', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })

    myAddress.setFamilyName('Smith')
    expect(myAddress.toObject().familyName).toBe('Smith')
    expect(myAddress.toObject().secondFamilyName).toBe('Smith')

    myAddress.setPropagation(false)

    myAddress.setFamilyName('Doe')
    expect(myAddress.toObject().familyName).toBe('Doe')
    expect(myAddress.toObject().secondFamilyName).toBe('Smith')
  })
})
