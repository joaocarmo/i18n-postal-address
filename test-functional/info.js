#!/usr/bin/env node
const PostalAddress = require('..').default

const postalAddress = new PostalAddress()

console.log('class properties: ', Object.keys(postalAddress).length)

console.log(
  'countries covered: ',
  Object.keys(postalAddress.addressFormats).length,
)
