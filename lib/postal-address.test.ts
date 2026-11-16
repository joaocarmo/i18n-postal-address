import PostalAddress, { addressFormats } from './index.js'
import PostalAddressError from './postal-address-error.js'
import objectInitialState from './object-initial-state.js'
import { addCommaAfter } from './address-transforms.js'
import type { AddFormatArgs, FormatTypes } from './types/address-format.js'
import * as formats from './formats/index.js'

const expectedOutputRUBusiness = `\
Правительство Москвы
ул. Тверская, д. 13
МОСКВА
125032
РОССИЯ`

const expectedOutputUSWithoutTransforms = `\
1100 Congress Ave
Austin TX 78701`

const expectedOutputUSWithTransforms = `\
1100 Congress Ave
AUSTIN, TX 78701`

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
Иванова, Анна
Москва 125032
Россия`

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
10 Downing Street
London SW1A 2AA`

describe('Constructor', () => {
  it('should throw when no formats are provided', () => {
    expect(() => new PostalAddress({ formats: {} })).toThrow(
      'At least one format must be provided',
    )
  })

  it('should auto-default to the single format country', () => {
    const addr = new PostalAddress({ formats: { PT: formats.PT } })
    addr
      .setAddress1('Praça do Comércio')
      .setCity('Lisboa')
      .setPostalCode('1100-148')
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
    addr
      .setAddress1('Praça do Comércio')
      .setCity('Lisboa')
      .setPostalCode('1100-148')
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
    addr.setGivenName('Michael').setFamilyName('Carter')
    const outputBeforeSwitch = addr.toString()
    expect(outputBeforeSwitch).toContain('Lisboa')

    // 5. The new format is also available
    // 5.1. We can now switch to US (opposed to 2.1)
    addr.setFormat({ country: 'US' })
    const outputAfterSwitch = addr.toArray()
    // US custom format puts givenName/familyName on first line
    expect(outputAfterSwitch[0]).toEqual(['Michael', 'Carter'])
  })

  it('should accept a lowercase country code via setFormat', () => {
    const addr = new PostalAddress({
      formats: { PT: formats.PT, US: formats.US },
      defaultFormat: 'US',
    })
    addr
      .setCity('Lisboa')
      .setPostalCode('1100-148')
      .setFormat({ country: 'pt' })
    expect(addr.toArray()).toEqual(addr.setFormat({ country: 'PT' }).toArray())
    expect(addr.toArray()).not.toEqual(
      addr.setFormat({ country: 'US' }).toArray(),
    )
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

  it('should format a business address (RU)', () => {
    const myAddressBusiness = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    myAddressBusiness
      .setCompanyName('Правительство Москвы')
      .setAddress1('ул. Тверская, д. 13')
      .setCity('Москва')
      .setPostalCode('125032')
      .setCountry('Россия')
      .setFormat({
        country: 'RU',
        type: 'business',
      })

    expect(myAddressBusiness.toString()).toBe(expectedOutputRUBusiness)
  })

  it('should output a valid formatted postal address (US)', () => {
    const myAddressPersonal = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    myAddressPersonal
      .setAddress1('1100 Congress Ave')
      .setCity('Austin')
      .setState('TX')
      .setPostalCode('78701')
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

  it('should output a valid formatted postal address (CN)', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'CN',
    })
    myAddress
      .setProvince('北京市')
      .setCity('海淀区')
      .setAddress1('颐和园路5号')
      .setPostalCode('100871')
      .setFamilyName('陈')
      .setGivenName('静')
      .setCountry('中国')

    expect(myAddress.toString()).toBe(
      '中国\n100871\n北京市 海淀区\n颐和园路5号\n陈 静',
    )
  })

  it('should output a valid formatted postal address (CN, english)', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'CN',
    })
    myAddress
      .setProvince('Beijing')
      .setCity('Haidian District')
      .setAddress1('5 Yiheyuan Road')
      .setPostalCode('100871')
      .setFamilyName('Chen')
      .setGivenName('Jing')
      .setCountry('China')
      .setFormat({ country: 'CN', type: 'english' })

    expect(myAddress.toString()).toBe(
      'Chen Jing\n5 Yiheyuan Road\nHaidian District\nBEIJING, 100871\nCHINA',
    )
  })

  it('should output a valid formatted postal address (JP)', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'JP',
    })
    myAddress
      .setPrefecture('東京都')
      .setCity('中央区')
      .setAddress1('銀座4-6-16')
      .setPostalCode('104-0061')
      .setFamilyName('鈴木')
      .setGivenName('陽菜')
      .setCountry('日本')

    expect(myAddress.toString()).toBe(
      '日本\n104-0061 東京都 中央区\n銀座4-6-16\n鈴木 陽菜',
    )
  })

  it('should output a valid formatted postal address (JP, english)', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'JP',
    })
    myAddress
      .setPrefecture('Tokyo')
      .setCity('Chuo-ku')
      .setAddress1('4-6-16 Ginza')
      .setPostalCode('104-0061')
      .setFamilyName('Suzuki')
      .setGivenName('Haruna')
      .setCountry('Japan')
      .setFormat({ country: 'JP', type: 'english' })

    expect(myAddress.toString()).toBe(
      'Suzuki Haruna\n4-6-16 Ginza\nChuo-ku, TOKYO\n104-0061\nJAPAN',
    )
  })

  it('should output a valid formatted postal address (RU)', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'RU',
    })
    myAddress
      .setCity('Москва')
      .setAddress1('ул. Тверская, д. 13')
      .setPostalCode('125032')
      .setFamilyName('Иванова')
      .setGivenName('Анна')
      .setAdditionalName('Сергеевна')
      .setCountry('Россия')

    expect(myAddress.toString()).toBe(
      'Иванова\nАнна Сергеевна\nул. Тверская, д. 13\nМОСКВА\n125032\nРОССИЯ',
    )
  })

  it('should print the subdistrict once (TH)', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'TH',
    })
    myAddress
      .setAddress1('ถนนหน้าพระลาน')
      .setAddress2('แขวงพระบรมมหาราชวัง')
      .setCity('เขตพระนคร')
      .setState('กรุงเทพมหานคร')
      .setPostalCode('10200')

    expect(myAddress.toArray()).toEqual([
      ['ถนนหน้าพระลาน'],
      ['แขวงพระบรมมหาราชวัง'],
      ['เขตพระนคร'],
      ['กรุงเทพมหานคร', '10200'],
    ])
  })

  it('should print the barangay once (PH)', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'PH',
    })
    myAddress
      .setAddress1('Malacañang Palace, J.P. Laurel Street')
      .setAddress2('San Miguel')
      .setCity('Manila')
      .setState('Metro Manila')
      .setPostalCode('1005')

    expect(myAddress.toArray()).toEqual([
      ['Malacañang Palace, J.P. Laurel Street'],
      ['San Miguel'],
      ['Manila'],
      ['1005', 'Metro Manila'],
    ])
  })

  it('should print both surnames on the name line (ES)', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'ES',
    })
    myAddress
      .setHonorificPrefix('Sr. D.')
      .setGivenName('Pedro')
      .setFirstFamilyName('García')
      .setSecondFamilyName('López')
      .setAddress1('Plaza de las Descalzas 27, Esc 2, 3º C')
      .setPostalCode('45012')
      .setCity('Toledo')
      .setState('Toledo')

    expect(myAddress.toArray()).toEqual([
      ['Sr. D.', 'Pedro', 'García', 'López'],
      ['Plaza de las Descalzas 27, Esc 2, 3º C'],
      ['45012', 'TOLEDO'],
      ['Toledo'],
    ])
  })

  it('should print the district before the road (KR)', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'KR',
    })
    myAddress
      .setDo('서울특별시')
      .setGu('중구')
      .setDong('세종대로')
      .setAddressNum('110')
      .setPostalCode('04524')

    expect(myAddress.toArray()).toEqual([
      ['서울특별시', '중구', '세종대로', '110'],
      ['04524'],
    ])
  })

  it('should print the company first and no comma on the last line (AU)', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'AU',
    })
    myAddress
      .setCompanyName('Department of the House of Representatives')
      .setGivenName('Emily')
      .setFamilyName('Nguyen')
      .setAddress1('Parliament House')
      .setCity('Canberra')
      .setState('ACT')
      .setPostalCode('2600')

    expect(myAddress.toString()).toBe(
      'Department of the House of Representatives\nEmily Nguyen\nParliament House\nCANBERRA ACT 2600',
    )
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
    'should throw for an invalid custom format: %s',
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
      .setCompanyName('Правительство Москвы')
      .setAddress1('ул. Тверская, д. 13')
      .setCity('Москва')
      .setPostalCode('125032')
      .setCountry('Россия')
      .setFormat({
        country: 'RU',
        type: 'business',
      })

    expect(myAddressBusiness.toString()).toBe(expectedOutputRUBusiness)

    myAddressBusiness.addFormat(customFormatOverwrite)

    expect(myAddressBusiness.toString()).not.toBe(expectedOutputRUBusiness)

    myAddressBusiness.setGivenName('Анна').setFamilyName('Иванова')

    expect(myAddressBusiness.toString()).toBe(customFormatOutputOverwrite)
  })

  it('should allow custom formats (new)', () => {
    const myAddressBusiness = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    myAddressBusiness
      .setCompanyName("Prime Minister's Office")
      .setAddress1('10 Downing Street')
      .setCity('London')
      .setPostalCode('SW1A 2AA')
      .setCountry('United Kingdom')
      .setFormat({
        country: 'GB',
        type: 'personal',
      })

    const outputBefore = myAddressBusiness.toString()

    expect(outputBefore).toBe(
      "Prime Minister's Office\n10 Downing Street\nLONDON\nSW1A 2AA\nUNITED KINGDOM",
    )

    myAddressBusiness.addFormat(customFormatNew).setFormat({
      country: 'GB',
      type: 'personal',
    })

    expect(myAddressBusiness.toString()).not.toBe(outputBefore)

    myAddressBusiness.setGivenName('Oliver').setFamilyName('Bennett')

    expect(myAddressBusiness.toString()).toBe(customFormatOutputNew)
  })

  it('should merge new format types without overwriting existing ones', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })

    const defaultBefore = myAddress.getAddressFormat({ country: 'RU' })
    expect(defaultBefore).not.toBeNull()

    myAddress.addFormat({
      country: 'RU',
      format: [
        ['givenName', 'familyName'],
        ['city', 'postalCode'],
      ],
      type: 'personal',
    })

    const defaultAfter = myAddress.getAddressFormat({ country: 'RU' })
    expect(defaultAfter).toEqual(defaultBefore)

    const personal = myAddress.getAddressFormat({
      country: 'RU',
      type: 'personal',
    })
    expect(personal).toEqual([
      ['givenName', 'familyName'],
      ['city', 'postalCode'],
    ])

    myAddress.addFormat({
      country: 'RU',
      format: [['companyName'], ['address1'], ['city', 'postalCode']],
      type: 'business',
    })

    expect(myAddress.getAddressFormat({ country: 'RU' })).toEqual(defaultBefore)
    expect(
      myAddress.getAddressFormat({ country: 'RU', type: 'personal' }),
    ).toEqual(personal)
    expect(
      myAddress.getAddressFormat({ country: 'RU', type: 'business' }),
    ).toEqual([['companyName'], ['address1'], ['city', 'postalCode']])
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
    address1: '1100 Congress Ave',
    address2: 'Capitol Extension',
    addressNum: '',
    careOf: '',
    city: 'Austin',
    companyName: 'Lone Star Survey Co.',
    country: 'United States',
    countryAlpha2: 'US',
    do: '',
    dong: '1100 Congress Ave',
    firstFamilyName: '',
    givenName: 'Michael',
    gu: '',
    honorificPrefix: '',
    honorificSuffix: '',
    jobTitle: '',
    familyName: 'Carter',
    postalCode: '78701',
    prefecture: '',
    province: '',
    region: '',
    republic: '',
    secondFamilyName: 'Carter',
    additionalName: '',
    si: 'Austin',
    state: 'TX',
    title: '',
  }
  const myAddress = new PostalAddress({
    formats: addressFormats,
    defaultFormat: 'US',
  }).fromObject(presetState)

  it('should have a non-empty address (string)', () => {
    expect(myAddress.toString()).toBe(`\
Michael Carter
Lone Star Survey Co.
1100 Congress Ave
Capitol Extension
AUSTIN, TX 78701
UNITED STATES\
`)
  })

  it('should have a non-empty address (array)', () => {
    expect(myAddress.toArray()).toEqual([
      ['Michael', 'Carter'],
      ['Lone Star Survey Co.'],
      ['1100 Congress Ave'],
      ['Capitol Extension'],
      ['AUSTIN,', 'TX', '78701'],
      ['UNITED STATES'],
    ])
  })

  it('should have a non-empty address (object)', () => {
    expect(myAddress.toObject()).toEqual(presetState)
  })
})

describe('Initial Value [partial non-empty]', () => {
  const presetState = {
    address1: '1100 Congress Ave',
    address2: 'Capitol Extension',
    city: 'Austin',
    companyName: 'Lone Star Survey Co.',
    country: 'United States',
    countryAlpha2: 'US',
    dong: '1100 Congress Ave',
    givenName: 'Michael',
    familyName: 'Carter',
    postalCode: '78701',
    secondFamilyName: 'Carter',
    si: 'Austin',
    state: 'TX',
  }
  const myAddress = new PostalAddress({
    formats: addressFormats,
    defaultFormat: 'US',
  }).fromObject(presetState)

  it('should have a non-empty address (string)', () => {
    expect(myAddress.toString()).toBe(`\
Michael Carter
Lone Star Survey Co.
1100 Congress Ave
Capitol Extension
AUSTIN, TX 78701
UNITED STATES\
`)
  })

  it('should have a non-empty address (array)', () => {
    expect(myAddress.toArray()).toEqual([
      ['Michael', 'Carter'],
      ['Lone Star Survey Co.'],
      ['1100 Congress Ave'],
      ['Capitol Extension'],
      ['AUSTIN,', 'TX', '78701'],
      ['UNITED STATES'],
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
      .setFamilyName('김')
      .setGivenName('민준')
      .setCompanyName('서울특별시청')
      .setDo('서울특별시')
      .setGu('중구')
      .setDong('세종대로')
      .setAddressNum('110')
      .setPostalCode('04524')
      .setCountry('대한민국')
      .setFormat({ country: 'KR' })

    expect(myAddress.toArray()).toEqual([
      ['김', '민준'],
      ['서울특별시청'],
      ['서울특별시', '중구', '세종대로', '110'],
      ['04524', '대한민국'],
    ])
  })

  it('should output a valid formatted postal address (KR) with generic fields via propagation', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    myAddress
      .setFamilyName('김')
      .setGivenName('민준')
      .setProvince('경기도')
      .setCity('파주시')
      .setAddress1('시청로 50')
      .setPostalCode('10932')
      .setCountry('대한민국')
      .setFormat({ country: 'KR' })

    const output = myAddress.toArray()

    expect(output).toEqual([
      ['김', '민준'],
      ['경기도', '파주시', '시청로 50'],
      ['10932', '대한민국'],
    ])
  })

  it('should output the Latin-script order for KR (english)', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    myAddress
      .setFamilyName('Kim')
      .setGivenName('Minjun')
      .setDo('Seoul')
      .setGu('Jung-gu')
      .setDong('Sejong-daero')
      .setAddressNum('110')
      .setPostalCode('04524')
      .setCountry('South Korea')
      .setFormat({ country: 'KR', type: 'english' })

    expect(myAddress.toArray()).toEqual([
      ['Kim', 'Minjun'],
      ['110,', 'Sejong-daero'],
      ['Jung-gu'],
      ['Seoul'],
      ['04524'],
      ['SOUTH KOREA'],
    ])
  })

  it('should output the Latin-script order for KP (english)', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    myAddress
      .setFamilyName('Ri')
      .setGivenName('Kum-hui')
      .setDong("Grand People's Study House")
      .setGu('Chung-guyok')
      .setSi('Pyongyang')
      .setCountry('North Korea')
      .setFormat({ country: 'KP', type: 'english' })

    expect(myAddress.toArray()).toEqual([
      ['Ri', 'Kum-hui'],
      ["Grand People's Study House"],
      ['Chung-guyok'],
      ['Pyongyang'],
      ['NORTH KOREA'],
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
      .setGivenName('Michael')
      .setFamilyName('Carter')
      .setCareOf('c/o Sarah Mitchell')
      .setAddress1('1100 Congress Ave')
      .setCity('Austin')
      .setState('TX')
      .setPostalCode('78701')
      .setFormat({ country: 'US' })

    expect(myAddress.toArray()).toEqual([
      ['Michael', 'Carter'],
      ['c/o Sarah Mitchell'],
      ['1100 Congress Ave'],
      ['AUSTIN,', 'TX', '78701'],
    ])
  })

  it('should omit care-of line when empty', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    myAddress
      .setGivenName('Michael')
      .setFamilyName('Carter')
      .setAddress1('1100 Congress Ave')
      .setCity('Austin')
      .setState('TX')
      .setPostalCode('78701')
      .setFormat({ country: 'US' })

    const output = myAddress.toArray()
    const hasCareOf = output.some((line) => line.includes('c/o'))
    expect(hasCareOf).toBe(false)
  })
})

describe('Honorific Suffix', () => {
  it('should place suffix after familyName in US format', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    myAddress
      .setGivenName('Michael')
      .setFamilyName('Carter')
      .setHonorificSuffix('Jr.')
      .setAddress1('1100 Congress Ave')
      .setCity('Austin')
      .setState('TX')
      .setPostalCode('78701')

    expect(myAddress.toArray()).toEqual([
      ['Michael', 'Carter', 'Jr.'],
      ['1100 Congress Ave'],
      ['AUSTIN,', 'TX', '78701'],
    ])
  })

  it('should place suffix before familyName in Hungarian format', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    myAddress
      .setHonorificSuffix('ifj.')
      .setFamilyName('Nagy')
      .setGivenName('Bence')
      .setAddress1('Kossuth Lajos tér 1-3.')
      .setCity('Budapest')
      .setPostalCode('1055')
      .setFormat({ country: 'HU' })

    expect(myAddress.toArray()).toEqual([
      ['ifj.', 'Nagy', 'Bence'],
      ['BUDAPEST'],
      ['Kossuth Lajos tér 1-3.'],
      ['1055'],
    ])
  })

  it('should place suffix after secondFamilyName in Argentine format', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    myAddress
      .setGivenName('Joaquín')
      .setFirstFamilyName('Gómez')
      .setSecondFamilyName('Ruiz')
      .setHonorificSuffix('h.')
      .setAddress1('Balcarce 50')
      .setCity('Ciudad Autónoma de Buenos Aires')
      .setPostalCode('C1064AAB')
      .setFormat({ country: 'AR' })

    expect(myAddress.toArray()).toEqual([
      ['Joaquín', 'Gómez', 'Ruiz', 'h.'],
      ['Balcarce 50'],
      ['C1064AAB', 'CIUDAD AUTÓNOMA DE BUENOS AIRES'],
    ])
  })

  it.each([
    [
      'BO',
      ['María', 'Rojas', 'Pérez'],
      ['Plaza Murillo', ''],
      ['La Paz', '', ''],
      [['María', 'Rojas', 'Pérez'], ['Plaza Murillo'], ['LA PAZ']],
    ],
    [
      'CL',
      ['María', 'Rojas', 'Pérez'],
      ['Moneda 1152', ''],
      ['Santiago', 'Región Metropolitana', '8340648'],
      [
        ['María', 'Rojas', 'Pérez'],
        ['Moneda 1152'],
        ['8340648', 'SANTIAGO'],
        ['Región Metropolitana'],
      ],
    ],
    [
      'EC',
      ['María', 'Rojas', 'Pérez'],
      ['García Moreno y Pasaje Chile', ''],
      ['Quito', 'Pichincha', '170401'],
      [
        ['María', 'Rojas', 'Pérez'],
        ['García Moreno y Pasaje Chile'],
        ['170401', 'QUITO'],
        ['Pichincha'],
      ],
    ],
    [
      'GY',
      ['Alicia', 'Persaud', ''],
      ['Robb Street', ''],
      ['Georgetown', '', '4130105'],
      [['Alicia', 'Persaud'], ['Robb Street'], ['4130105', 'GEORGETOWN']],
    ],
    [
      'PY',
      ['María', 'Rojas', 'Pérez'],
      [
        'Estrella Nº 340, casi Yegros',
        'Edif. España, Bloque A, Piso 3, Dpto. 10',
      ],
      ['Asunción', '', '001218'],
      [
        ['María', 'Rojas', 'Pérez'],
        [
          'Estrella Nº 340, casi Yegros',
          'Edif. España, Bloque A, Piso 3, Dpto. 10',
        ],
        ['001218', 'ASUNCIÓN'],
      ],
    ],
  ])(
    'should print the name on 1 line for %s',
    (
      country,
      [givenName, firstFamilyName, secondFamilyName],
      [address1, address2],
      [city, state, postalCode],
      expected,
    ) => {
      const myAddress = new PostalAddress({
        formats: addressFormats,
        defaultFormat: 'US',
      })
      myAddress
        .setGivenName(givenName)
        .setFirstFamilyName(firstFamilyName)
        .setSecondFamilyName(secondFamilyName)
        .setAddress1(address1)
        .setAddress2(address2)
        .setCity(city)
        .setPostalCode(postalCode)
        .setState(state)
        .setFormat({ country })

      expect(myAddress.toArray()).toEqual(expected)
    },
  )

  it.each([
    ['CO', 'Carrera 8 # 7-26', 'Bogotá', '', '111711', [['BOGOTÁ,', '111711']]],
    [
      'PE',
      'Av. Larco 1301, Miraflores',
      'Lima',
      'Lima',
      '15074',
      [['LIMA', '15074'], ['Lima']],
    ],
    [
      'UY',
      'Avenida de las Leyes esq. Avenida Agraciada',
      'Montevideo',
      'Montevideo',
      '11800',
      [['11800', 'MONTEVIDEO']],
    ],
    [
      'VE',
      'Av. Fuerzas Armadas, Torre San José, Piso 5, Apartamento 20',
      'Caracas',
      'Distrito Capital',
      '1010',
      [['CARACAS'], ['DISTRITO CAPITAL'], ['1010']],
    ],
  ])(
    'should place the locality lines for %s',
    (country, address1, city, state, postalCode, localityLines) => {
      const myAddress = new PostalAddress({
        formats: addressFormats,
        defaultFormat: 'US',
      })
      myAddress
        .setGivenName('María')
        .setFirstFamilyName('Rojas')
        .setSecondFamilyName('Pérez')
        .setAddress1(address1)
        .setCity(city)
        .setState(state)
        .setPostalCode(postalCode)
        .setFormat({ country })

      expect(myAddress.toArray()).toEqual([
        ['María', 'Rojas', 'Pérez'],
        [address1],
        ...localityLines,
      ])
    },
  )
})

describe('Region Same As City', () => {
  const address = (
    country: string,
    city: string,
    state: string,
    postalCode: string,
  ) =>
    new PostalAddress({ formats: addressFormats, defaultFormat: 'US' })
      .setCity(city)
      .setState(state)
      .setPostalCode(postalCode)
      .setFormat({ country })

  it.each([
    [
      'UY',
      'Punta del Este',
      'Maldonado',
      '20100',
      [['20100', 'PUNTA DEL ESTE,', 'MALDONADO']],
    ],
    ['UY', 'Canelones', 'Canelones', '90000', [['90000', 'CANELONES']]],
    ['RO', 'Brașov', 'Brașov', '500030', [['500030', 'BRAȘOV']]],
    [
      'RO',
      'București',
      'Sector 1',
      '010086',
      [['010086', 'BUCUREȘTI'], ['Sector 1']],
    ],
  ])(
    'should print the region only when it differs from the city in %s (%s, %s)',
    (country, city, state, postalCode, expected) => {
      expect(address(country, city, state, postalCode).toArray()).toEqual(
        expected,
      )
    },
  )

  it('should treat a county with a cedilla as the same as the city in RO', () => {
    expect(address('RO', 'Brașov', 'Braşov', '500030').toArray()).toEqual([
      ['500030', 'BRAȘOV'],
    ])
  })

  it('should print the region without transforms', () => {
    expect(
      address('UY', 'Montevideo', 'Montevideo', '11800')
        .setFormat({ country: 'UY', useTransforms: false })
        .toArray(),
    ).toEqual([['11800', 'Montevideo', 'Montevideo']])
  })
})

describe('Province With A Full CPA', () => {
  const address = (country: string, postalCode: string) =>
    new PostalAddress({ formats: addressFormats, defaultFormat: 'US' })
      .setCity('Buenos Aires')
      .setState('Ciudad Autónoma de Buenos Aires')
      .setPostalCode(postalCode)
      .setFormat({ country })

  it.each([
    ['AR', 'C1064AAB', [['C1064AAB', 'BUENOS AIRES']]],
    ['AR', 'C1064 AAB', [['C1064 AAB', 'BUENOS AIRES']]],
    [
      'AR',
      '1064',
      [['1064', 'BUENOS AIRES'], ['Ciudad Autónoma de Buenos Aires']],
    ],
    [
      'CL',
      'C1064AAB',
      [['C1064AAB', 'BUENOS AIRES'], ['Ciudad Autónoma de Buenos Aires']],
    ],
  ])(
    'should print the province only when needed in %s with %s',
    (country, postalCode, expected) => {
      expect(address(country, postalCode).toArray()).toEqual(expected)
    },
  )

  it('should print the province without transforms', () => {
    expect(
      address('AR', 'C1064AAB')
        .setFormat({ country: 'AR', useTransforms: false })
        .toArray(),
    ).toEqual([
      ['C1064AAB', 'Buenos Aires'],
      ['Ciudad Autónoma de Buenos Aires'],
    ])
  })
})

describe('Upper Case', () => {
  it.each([
    ['US', 'default', 'austin', 'tx', '78701', [['AUSTIN,', 'TX', '78701']]],
    ['AU', 'default', 'canberra', 'act', '2600', [['CANBERRA', 'ACT', '2600']]],
    ['CA', 'default', 'ottawa', 'on', 'k1a 0a6', [['OTTAWA', 'ON', 'K1A 0A6']]],
    ['CA', 'french', 'ottawa', 'on', 'k1a 0a6', [['OTTAWA', 'ON', 'K1A 0A6']]],
    [
      'MY',
      'default',
      'kuala lumpur',
      'wilayah persekutuan kuala lumpur',
      '50680',
      [['50680', 'KUALA LUMPUR'], ['WILAYAH PERSEKUTUAN KUALA LUMPUR']],
    ],
    ['NG', 'default', 'abuja', 'fct', '', [['ABUJA'], ['FCT']]],
    [
      'AR',
      'default',
      'buenos aires',
      'ciudad autónoma de buenos aires',
      '1064',
      [['1064', 'BUENOS AIRES'], ['ciudad autónoma de buenos aires']],
    ],
  ] as const)(
    'should print the parts Google asks for in capitals for %s (%s)',
    (country, type, city, state, postalCode, expected) => {
      const myAddress = new PostalAddress({
        formats: addressFormats,
        defaultFormat: 'US',
      })
      myAddress
        .setCity(city)
        .setState(state)
        .setProvince(state)
        .setPostalCode(postalCode)
        .setFormat({ country, type })

      expect(myAddress.toArray()).toEqual(expected)
    },
  )
})

describe('Administrative Area', () => {
  const caAddress = () =>
    new PostalAddress({ formats: addressFormats, defaultFormat: 'US' })
      .setCity('Ottawa')
      .setState('ON')
      .setPostalCode('K1A 0A6')
      .setFormat({ country: 'CA' })

  it('should print a value set as state in a format that reads province', () => {
    expect(caAddress().toArray()).toEqual([['OTTAWA', 'ON', 'K1A 0A6']])
  })

  it('should not copy the value into the address object', () => {
    expect(caAddress().toObject().province).toBe('')
  })

  it('should not fall back when propagation is off', () => {
    expect(caAddress().setPropagation(false).toArray()).toEqual([
      ['OTTAWA', 'K1A 0A6'],
    ])
  })

  it('should print the value the format reads when it is set', () => {
    expect(caAddress().setState('Ontario').setProvince('ON').toArray()).toEqual(
      [['OTTAWA', 'ON', 'K1A 0A6']],
    )
  })

  it('should not fall back in a format that reads several of them', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
      .setCity('Красногорск')
      .setRegion('Московская обл.')
      .setFormat({ country: 'RU' })

    expect(myAddress.toArray()).toEqual([['КРАСНОГОРСК'], ['Московская обл.']])
  })
})

describe('getAddressFormat', () => {
  it('should accept a lowercase country code', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })

    expect(myAddress.getAddressFormat({ country: 'kr' })).toEqual(
      myAddress.getAddressFormat({ country: 'KR' }),
    )
  })

  it('should return the format array for a known country', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
    const format = myAddress.getAddressFormat({ country: 'KR' })

    expect(format).toEqual([
      ['familyName', 'givenName', 'honorificPrefix', 'honorificSuffix'],
      ['companyName'],
      ['careOf'],
      ['do', 'si', 'gu', 'dong', 'addressNum'],
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

describe('Setters', () => {
  const setters = [
    ['setAddress', 'address1'],
    ['setAdditionalName', 'additionalName'],
    ['setGu', 'gu'],
    ['setHonorificPrefix', 'honorificPrefix'],
    ['setJobTitle', 'jobTitle'],
    ['setPrefecture', 'prefecture'],
    ['setRegion', 'region'],
    ['setRepublic', 'republic'],
    ['setTitle', 'title'],
  ] as const

  it.each(setters)('should set the value with %s', (setter, property) => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })

    myAddress[setter]('value')

    expect(myAddress.toObject()[property]).toBe('value')
  })
})

describe('Propagation', () => {
  const setters = [
    ['setAddress1', 'address1', 'dong'],
    ['setCity', 'city', 'si'],
    ['setDo', 'do', 'province'],
    ['setDong', 'dong', 'address1'],
    ['setFamilyName', 'familyName', 'secondFamilyName'],
    ['setProvince', 'province', 'do'],
    ['setSecondFamilyName', 'secondFamilyName', 'familyName'],
    ['setSi', 'si', 'city'],
  ] as const

  it('should stop propagating changes when propagation is disabled', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })

    myAddress.setFamilyName('Carter')
    expect(myAddress.toObject().familyName).toBe('Carter')
    expect(myAddress.toObject().secondFamilyName).toBe('Carter')

    myAddress.setPropagation(false)

    myAddress.setFamilyName('Mitchell')
    expect(myAddress.toObject().familyName).toBe('Mitchell')
    expect(myAddress.toObject().secondFamilyName).toBe('Carter')
  })

  it.each(setters)(
    'should not propagate %s when propagation is off',
    (setter, property, related) => {
      const myAddress = new PostalAddress({
        formats: addressFormats,
        defaultFormat: 'US',
      }).setPropagation(false)

      myAddress[setter]('value')

      expect(myAddress.toObject()[property]).toBe('value')
      expect(myAddress.toObject()[related]).toBe('')
    },
  )

  it('should not set countryAlpha2 when propagation is off', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
      .setPropagation(false)
      .setCountry('Portugal')

    expect(myAddress.toObject().countryAlpha2).toBe('')
  })

  it('should not set countryAlpha2 for an unknown country', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    }).setCountry('Atlantis')

    expect(myAddress.toObject().countryAlpha2).toBe('')
  })
})

describe('Format without a matching type', () => {
  it('should output nothing when the country has no format for the type', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })
      .addFormat({ country: 'ZZ', format: [['city']], type: 'personal' })
      .setCity('Porto')
      .setFormat({ country: 'ZZ', type: 'business' })

    expect(myAddress.toArray()).toEqual([])
    expect(myAddress.toString()).toBe('')
  })
})

describe('Format type checks', () => {
  it('should reject an unknown type in setFormat', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })

    expect(() =>
      myAddress.setFormat({ type: 'unknown' as FormatTypes }),
    ).toThrow(new PostalAddressError('Format type "unknown" is not valid'))
  })

  it('should reject an unknown type in addFormat', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    })

    expect(() =>
      myAddress.addFormat({
        country: 'ZZ',
        format: [['city']],
        type: 'unknown' as FormatTypes,
      }),
    ).toThrow(new PostalAddressError('Format type "unknown" is not valid'))
  })
})

describe('Values that are not strings', () => {
  it('should ignore a value that is not a string', () => {
    const myAddress = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'US',
    }).setCity(42 as unknown as string)

    expect(myAddress.toObject().city).toBe('')
  })
})
