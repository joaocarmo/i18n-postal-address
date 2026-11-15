import { describe, expect, it } from 'vitest'
import PostalAddress, { addressFormats } from '../../dist/index.js'

const createPersonalAddress = () =>
  new PostalAddress({ formats: addressFormats, defaultFormat: 'US' })
    .setAddress1('Rua do Pastel, 19')
    .setCity('Aveiro')
    .setCountry('Brazil')
    .setGivenName('John')
    .setHonorificPrefix('Mr.')
    .setFamilyName('Pestana')
    .setPostalCode('2700-242')
    .setAdditionalName('Lopes')

const createBusinessAddress = () =>
  new PostalAddress({ formats: addressFormats, defaultFormat: 'US' })
    .setAddress1('Happy Park')
    .setAddress2('Edifício 4, Piso 2')
    .setCity('Porto')
    .setCompanyName('SmartShoes Portugal, Lda.')
    .setCountry('Portugal')
    .setPostalCode('4000-123')

describe('dist', () => {
  it('should format a personal address for a country', () => {
    const address = createPersonalAddress().setFormat({
      country: 'NO',
      type: 'personal',
    })

    expect(address.toArray()).toEqual([
      ['Mr.', 'John', 'Lopes', 'Pestana'],
      ['Rua do Pastel, 19'],
      ['2700-242', 'AVEIRO'],
      ['BRAZIL'],
    ])
  })

  it('should apply the transforms only when they are enabled', () => {
    const address = createPersonalAddress().setFormat({
      country: 'US',
      useTransforms: true,
    })

    expect(address.toArray()).toEqual([
      ['Mr.', 'John', 'Lopes', 'Pestana'],
      ['Rua do Pastel, 19'],
      ['AVEIRO,', '2700-242'],
      ['BRAZIL'],
    ])

    address.setFormat({ useTransforms: false })

    expect(address.toArray()).toEqual([
      ['Mr.', 'John', 'Lopes', 'Pestana'],
      ['Rua do Pastel, 19'],
      ['Aveiro', '2700-242'],
      ['Brazil'],
    ])
  })

  it('should format a business address as a string', () => {
    const address = createBusinessAddress().setFormat({
      country: 'DE',
      type: 'business',
    })

    expect(address.toString()).toBe(
      'SmartShoes Portugal, Lda.\nHappy Park\nEdifício 4, Piso 2\n4000-123 Porto\nPORTUGAL',
    )
  })

  it('should use a custom format only when it is selected', () => {
    const address = createBusinessAddress().addFormat({
      country: 'GB',
      format: [['address1'], ['city', 'postalCode']],
      type: 'personal',
    })

    expect(address.toString()).toBe(
      'SmartShoes Portugal, Lda.\nHappy Park\nEdifício 4, Piso 2\nPORTO, 4000-123\nPORTUGAL',
    )

    address.setFormat({ country: 'GB', type: 'personal' })

    expect(address.toString()).toBe('Happy Park\nPorto 4000-123')
  })
})
