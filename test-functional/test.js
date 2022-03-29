#!/usr/bin/env node
const PostalAddress = require('..').default

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
  .setOutputFormat('array')
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
  .setOutputFormat('array')
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

const myStringParser = new PostalAddress()
myStringParser.setStringParser('libpostal')
myStringParser.fromString(
  'Barboncino 781 Franklin Ave, Crown Heights, Brooklyn, NY 11238',
)

console.log(myStringParser.toObject())

console.log(myStringParser.toString())
