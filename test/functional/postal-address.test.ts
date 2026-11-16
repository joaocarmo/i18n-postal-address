import { describe, expect, it } from 'vitest'
import PostalAddress, { addressFormats } from '../../dist/index.js'

const createNorwegianAddress = () =>
  new PostalAddress({ formats: addressFormats, defaultFormat: 'US' })
    .setAddress1('Karl Johans gate 22')
    .setCity('Oslo')
    .setCountry('Norway')
    .setGivenName('Ingrid')
    .setAdditionalName('Marie')
    .setFamilyName('Hansen')
    .setPostalCode('0026')

const createAmericanAddress = () =>
  new PostalAddress({ formats: addressFormats, defaultFormat: 'US' })
    .setAddress1('1100 Congress Ave')
    .setCity('Austin')
    .setState('TX')
    .setCountry('United States')
    .setGivenName('Michael')
    .setHonorificPrefix('Mr.')
    .setAdditionalName('James')
    .setFamilyName('Carter')
    .setPostalCode('78701')

const createGermanBusinessAddress = () =>
  new PostalAddress({ formats: addressFormats, defaultFormat: 'US' })
    .setCompanyName('Deutscher Bundestag')
    .setAddress1('Platz der Republik 1')
    .setCity('Berlin')
    .setCountry('Germany')
    .setPostalCode('11011')

describe('dist', () => {
  it('should format a personal address for a country', () => {
    const address = createNorwegianAddress().setFormat({
      country: 'NO',
      type: 'personal',
    })

    expect(address.toArray()).toEqual([
      ['Ingrid', 'Marie', 'Hansen'],
      ['Karl Johans gate 22'],
      ['0026', 'OSLO'],
      ['NORWAY'],
    ])
  })

  it('should apply the transforms only when they are enabled', () => {
    const address = createAmericanAddress().setFormat({
      country: 'US',
      useTransforms: true,
    })

    expect(address.toArray()).toEqual([
      ['Mr.', 'Michael', 'James', 'Carter'],
      ['1100 Congress Ave'],
      ['AUSTIN,', 'TX', '78701'],
      ['UNITED STATES'],
    ])

    address.setFormat({ useTransforms: false })

    expect(address.toArray()).toEqual([
      ['Mr.', 'Michael', 'James', 'Carter'],
      ['1100 Congress Ave'],
      ['Austin', 'TX', '78701'],
      ['United States'],
    ])
  })

  it('should format a business address as a string', () => {
    const address = createGermanBusinessAddress().setFormat({
      country: 'DE',
      type: 'business',
    })

    expect(address.toString()).toBe(
      'Deutscher Bundestag\nPlatz der Republik 1\n11011 Berlin\nGERMANY',
    )
  })

  it('should use a custom format only when it is selected', () => {
    const address = new PostalAddress({
      formats: addressFormats,
      defaultFormat: 'GB',
    })
      .setCompanyName("Prime Minister's Office")
      .setAddress1('10 Downing Street')
      .setCity('London')
      .setPostalCode('SW1A 2AA')
      .setCountry('United Kingdom')
      .addFormat({
        country: 'GB',
        format: [['address1'], ['city', 'postalCode']],
        type: 'personal',
      })

    expect(address.toString()).toBe(
      "Prime Minister's Office\n10 Downing Street\nLONDON\nSW1A 2AA\nUNITED KINGDOM",
    )

    address.setFormat({ country: 'GB', type: 'personal' })

    expect(address.toString()).toBe('10 Downing Street\nLondon SW1A 2AA')
  })
})
