#!/usr/bin/env node
const PostalAddress = require('..').default

const myAddressPortugal = new PostalAddress()

myAddressPortugal.setAddress1('Rua do Seixo, 19')
myAddressPortugal.setCity('Aveiro')
myAddressPortugal.setCountry('Portugal')
myAddressPortugal.setFirstName('João')
myAddressPortugal.setHonorific('Sr.')
myAddressPortugal.setLastName('Pestana')
myAddressPortugal.setPostalCode('2700-242')
myAddressPortugal.setSecondName('Lopes')
myAddressPortugal.setOutputFormat('array')
myAddressPortugal.setFormat({ country: 'CA', type: 'french' })

console.log(myAddressPortugal.output())
