#!/usr/bin/env node
const PostalAddressWithStrings =
  require('../dist/postal-address.strings.node').default

const myStringParser = new PostalAddressWithStrings(
  'Barboncino 781 Franklin Ave, Crown Heights, Brooklyn, NY 11238',
)

console.log(myStringParser.toObject())

console.log(myStringParser.toString())
