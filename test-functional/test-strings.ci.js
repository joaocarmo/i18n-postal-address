#!/usr/bin/env node
const PostalAddressWithStrings = require('i18n-postal-address/strings').default

const myStringParser = new PostalAddressWithStrings(
  'Barboncino 781 Franklin Ave, Crown Heights, Brooklyn, NY 11238',
)

const assert = (description, actual, expected) => {
  if (typeof actual === 'object' && typeof expected === 'object') {
    actual = JSON.stringify(actual)
    expected = JSON.stringify(expected)
  }

  if (!Object.is(actual, expected)) {
    throw new Error(`Expected ${expected} but got ${actual}`)
  }

  console.log(`✅ ${description}`)
}

assert('String parses to object correctly', myStringParser.toObject(), {
  address1: 'Barboncino 781 Franklin Ave',
  address2: 'Crown Heights Brooklyn',
  addressNum: '',
  city: '',
  companyName: '',
  country: '',
  countryAlpha2: '',
  do: '',
  dong: '',
  firstLastName: '',
  firstName: '',
  gu: '',
  honorific: '',
  jobTitle: '',
  lastName: '',
  postalCode: '11238',
  prefecture: '',
  province: '',
  region: '',
  republic: '',
  secondLastName: '',
  secondName: '',
  si: '',
  state: 'NY',
  title: '',
})

assert(
  'String parses to string correctly',
  myStringParser.toString(),
  `\
Barboncino 781 Franklin Ave
Crown Heights Brooklyn
NY 11238\
`,
)
