import { parseFmtLine, transformCountry } from './transform-google-formats.js'

describe('parseFmtLine', () => {
  it('should parse US format line with comma and multiple tokens', () => {
    const data = { key: 'US', upper: 'CS', state_name_type: 'state' }
    const parts = parseFmtLine('%C, %S %Z', data)

    expect(parts).toEqual([
      { attribute: 'city', transforms: ['capitalize', 'addCommaAfter'] },
      { attribute: 'state', transforms: ['capitalize'] },
      'postalCode',
    ])
  })

  it('should parse name token into individual fields', () => {
    const data = { key: 'US', upper: 'CS', state_name_type: 'state' }
    const parts = parseFmtLine('%N', data)

    expect(parts).toEqual([
      'honorificPrefix',
      'givenName',
      'additionalName',
      'familyName',
    ])
  })

  it('should parse organization token', () => {
    const data = { key: 'US', upper: 'CS', state_name_type: 'state' }
    const parts = parseFmtLine('%O', data)

    expect(parts).toEqual(['companyName'])
  })

  it('should skip sorting code token', () => {
    const data = { key: 'RE', upper: 'ACX' }
    const parts = parseFmtLine('%Z %C %X', data)

    expect(parts).toEqual([
      'postalCode',
      { attribute: 'city', transforms: ['capitalize'] },
    ])
  })

  it('should map state_name_type to correct field', () => {
    const data = { key: 'JP', upper: 'S', state_name_type: 'prefecture' }
    const parts = parseFmtLine('%S', data)

    expect(parts).toEqual([
      { attribute: 'prefecture', transforms: ['capitalize'] },
    ])
  })

  it('should map Korean sublocality to gu', () => {
    const data = {
      key: 'KR',
      upper: 'Z',
      state_name_type: 'do_si',
      sublocality_name_type: 'district',
    }
    const parts = parseFmtLine('%D', data)

    expect(parts).toEqual(['gu'])
  })

  it('should map non-Korean sublocality to address2', () => {
    const data = {
      key: 'BR',
      upper: 'CS',
      state_name_type: 'state',
      sublocality_name_type: 'neighborhood',
    }
    const parts = parseFmtLine('%D', data)

    expect(parts).toEqual(['address2'])
  })

  it('should handle consecutive tokens without separators', () => {
    const data = { key: 'CN', upper: 'S', sublocality_name_type: 'district' }
    const parts = parseFmtLine('%S%C%D', data)

    expect(parts).toEqual([
      { attribute: 'state', transforms: ['capitalize'] },
      'city',
      'address2',
    ])
  })

  it('should apply uppercase transform from upper field', () => {
    const data = {
      key: 'KR',
      upper: 'Z',
      state_name_type: 'do_si',
      sublocality_name_type: 'district',
    }
    const parts = parseFmtLine('%Z', data)

    expect(parts).toEqual([
      { attribute: 'postalCode', transforms: ['capitalize'] },
    ])
  })
})

describe('transformCountry', () => {
  it('should transform US format', () => {
    const data = {
      key: 'US',
      fmt: '%N%n%O%n%A%n%C, %S %Z',
      upper: 'CS',
      state_name_type: 'state',
    }
    const result = transformCountry(data)

    expect(result).not.toBeNull()
    const lines = result!.default.array

    // Should have: name, company, careOf, address1, address2, city/state/zip, country
    expect(lines).toEqual([
      ['honorificPrefix', 'givenName', 'additionalName', 'familyName'],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      [
        { attribute: 'city', transforms: ['capitalize', 'addCommaAfter'] },
        { attribute: 'state', transforms: ['capitalize'] },
        'postalCode',
      ],
      [{ attribute: 'country', transforms: ['capitalize'] }],
    ])
  })

  it('should use lfmt when available and map Korean fields correctly', () => {
    const data = {
      key: 'KR',
      fmt: '%S %C%D%n%A%n%O%n%N%n%Z',
      lfmt: '%N%n%O%n%A%n%D%n%C%n%S%n%Z',
      upper: 'Z',
      state_name_type: 'do_si',
      sublocality_name_type: 'district',
    }
    const result = transformCountry(data)

    expect(result).not.toBeNull()
    expect(result!.default.array).toEqual([
      ['honorificPrefix', 'givenName', 'additionalName', 'familyName'],
      ['companyName'],
      ['careOf'],
      ['address1'],
      ['address2'],
      ['gu'],
      ['city'],
      ['do'],
      [{ attribute: 'postalCode', transforms: ['capitalize'] }],
      [{ attribute: 'country', transforms: ['capitalize'] }],
    ])
  })

  it('should inject careOf before first address line', () => {
    const data = {
      key: 'GB',
      fmt: '%N%n%O%n%A%n%C%n%Z',
      upper: 'CZ',
    }
    const result = transformCountry(data)
    const lines = result!.default.array

    const careOfIdx = lines.findIndex(
      (line) => line.length === 1 && line[0] === 'careOf',
    )
    const address1Idx = lines.findIndex((line) =>
      line.some((p) => p === 'address1'),
    )

    expect(careOfIdx).toBeGreaterThan(-1)
    expect(careOfIdx).toBeLessThan(address1Idx)
  })

  it('should add country line when not in format', () => {
    const data = {
      key: 'AE',
      fmt: '%N%n%O%n%A%n%S',
      state_name_type: 'emirate',
    }
    const result = transformCountry(data)
    const lastLine = result!.default.array.at(-1)

    expect(lastLine).toEqual([
      { attribute: 'country', transforms: ['capitalize'] },
    ])
  })

  it('should return null when no format available', () => {
    const data = { key: 'ZZ' }
    const result = transformCountry(data)

    expect(result).toBeNull()
  })
})
