#!/usr/bin/env node
import PostalAddress from '../dist/index.js'
import * as formats from '../dist/formats/index.js'

const addressFormats = { ...formats }

const console = ((_console) => ({
  log: (...args) => {
    const divider = '\n----------------------------------------------------\n'
    _console.log(divider)
    _console.log(...args)
  },
}))(globalThis.console)

const myAddressPersonal = new PostalAddress({
  formats: addressFormats,
  defaultFormat: 'US',
})

myAddressPersonal
  .setAddress1('Rua do Pastel, 19')
  .setCity('Aveiro')
  .setCountry('Brazil')
  .setGivenName('John')
  .setHonorificPrefix('Mr.')
  .setFamilyName('Pestana')
  .setPostalCode('2700-242')
  .setAdditionalName('Lopes')
  .setFormat({
    country: 'NO',
    type: 'personal',
  })

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

console.log(myAddressPersonal.toArray())

myAddressPersonal.setFormat({
  country: 'US',
  useTransforms: true,
})

console.log(myAddressPersonal.toArray())

myAddressPersonal.setFormat({ useTransforms: false })

console.log(myAddressPersonal.toArray())

console.log(myAddressBusiness.toString())

// prettier-ignore
const myCustomAddress = new PostalAddress({ formats: addressFormats, defaultFormat: 'US' }).addFormat({
  country: 'GB',
  format: [
    ['address1'],
    ['city', 'postalCode'],
  ],
  type: 'personal',
})

myCustomAddress
  .setAddress1('Happy Park')
  .setAddress2('Edifício 4, Piso 2')
  .setCity('Porto')
  .setCompanyName('SmartShoes Portugal, Lda.')
  .setCountry('Portugal')
  .setPostalCode('4000-123')

console.log(myCustomAddress.toString())

myCustomAddress.setFormat({
  country: 'GB',
  type: 'personal',
})

console.log(myCustomAddress.toString())
