#!/usr/bin/env node
const PostalAddress = require('../dist/postal-address.node').default

const console = ((_console) => ({
  log: (...args) => {
    const divider = '\n----------------------------------------------------\n'
    _console.log(divider)
    _console.log(...args)
  },
}))(global.console)

const myAddressPersonal = new PostalAddress()

myAddressPersonal
  .setAddress1('Rua do Pastel, 19')
  .setCity('Aveiro')
  .setCountry('Brazil')
  .setFirstName('John')
  .setHonorific('Mr.')
  .setLastName('Pestana')
  .setPostalCode('2700-242')
  .setSecondName('Lopes')
  .setFormat({
    country: 'NO',
    type: 'personal',
  })

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

console.log(myAddressPersonal.output())

myAddressPersonal.setFormat({
  country: 'US',
  type: '',
  useTransforms: true,
})

console.log(myAddressPersonal.output())

myAddressPersonal.setFormat({ useTransforms: false })

console.log(myAddressPersonal.output())

console.log(myAddressBusiness.toString())

// prettier-ignore
const myCustomAddress = new PostalAddress().addFormat({
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
