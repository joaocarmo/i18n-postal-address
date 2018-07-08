#!/usr/bin/env node

const PostalAddress = require('..').default

const myAddressPersonal = new PostalAddress()

myAddressPersonal.setAddress1('Rua do Pastel, 19')
myAddressPersonal.setCity('Aveiro')
myAddressPersonal.setCountry('Brazil')
myAddressPersonal.setFirstName('John')
myAddressPersonal.setHonorific('Mr.')
myAddressPersonal.setLastName('Pestana')
myAddressPersonal.setPostalCode('2700-242')
myAddressPersonal.setSecondName('Lopes')
myAddressPersonal.setOutputFormat('array')
myAddressPersonal.setFormat({
  country: 'NO',
  type: 'personal',
})

const myAddressBusiness = new PostalAddress()

myAddressBusiness.setAddress1('Lagoas Park')
myAddressBusiness.setAddress2('Edifício 4, Piso 2')
myAddressBusiness.setCity('Porto Salvo')
myAddressBusiness.setCompanyName('Synopsys Portugal Lda')
myAddressBusiness.setCountry('Portugal')
myAddressBusiness.setPostalCode('2740-267')
myAddressBusiness.setOutputFormat('array')
myAddressBusiness.setFormat({
  country: 'RU',
  type: 'business',
})

console.log(myAddressPersonal.output())

myAddressPersonal.setFormat({
  country: 'US',
  type: '',
})

console.log(myAddressPersonal.output())

myAddressPersonal.setUseTransforms(false)

console.log(myAddressPersonal.output())

console.log(myAddressBusiness.toString())
