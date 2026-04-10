# i18n-postal-address

[![npm version](https://badge.fury.io/js/i18n-postal-address.svg)](https://badge.fury.io/js/i18n-postal-address)
![Tests](https://github.com/joaocarmo/i18n-postal-address/workflows/Tests/badge.svg)

A JavaScript library to produce international postal addresses formatted by
region for Node.js and the web. Supports **249 countries and territories** with format data
sourced from [Google's Address Data Service][google-address-data] and aligned
with [UPU S42][upu-s42] postal standards.

**Try it out in the [playground]!**

## Installation

```sh
npm install i18n-postal-address

# or

pnpm add i18n-postal-address
```

> **Note:** This is an ESM-only package. It requires Node.js >= 20.

## Usage

The constructor requires a `formats` object. You can load all 249 country
formats from the bundled data, or import only the countries you need for
tree-shaking.

```js
import PostalAddress, { addressFormats } from 'i18n-postal-address'

// Load all country formats
const myAddress = new PostalAddress({
  formats: addressFormats,
  defaultFormat: 'US',
})
```

### Tree-shakeable imports

Import only the countries you need to reduce bundle size:

```js
import PostalAddress from 'i18n-postal-address'
import { US, PT } from 'i18n-postal-address/formats'

// Multiple formats require a defaultFormat
const myAddress = new PostalAddress({
  formats: { US, PT },
  defaultFormat: 'US',
})

// Single format auto-defaults
const ptAddress = new PostalAddress({ formats: { PT } })
```

## Example

The methods can be chained one after the other for a cleaner code.

```js
import PostalAddress, { addressFormats } from 'i18n-postal-address'

const myAddressPersonal = new PostalAddress({
  formats: addressFormats,
  defaultFormat: 'US',
})

myAddressPersonal
  .setAddress1('Rua do Pastel, 19')
  .setCity('Aveiro')
  .setCountry('Portugal')
  .setGivenName('John')
  .setHonorificPrefix('Mr.')
  .setFamilyName('Pestana')
  .setPostalCode('2700-242')
  .setAdditionalName('Lopes')
  .setFormat({
    country: 'AR',
    type: 'personal',
  })

console.log(myAddressPersonal.toArray())

console.log(myAddressPersonal.toString())
```

`toArray()`

```txt
[ [ 'Mr.', 'John', 'Lopes' ],
  [ 'Pestana' ],
  [ 'Rua do Pastel, 19' ],
  [ '2700-242', 'AVEIRO' ],
  [ 'PORTUGAL' ] ]
```

`toString()`

```txt
Mr. John Lopes
Pestana
Rua do Pastel, 19
2700-242 AVEIRO
PORTUGAL
```

## Available Class Methods

### Address Attributes

```js
setAdditionalName(string)
setAddress1(string)
setAddress2(string)
setAddressNum(string)
setCareOf(string)
setCity(string)
setCompanyName(string)
setCountry(string)
setDo(string)
setDong(string)
setFamilyName(string)
setFirstFamilyName(string)
setGivenName(string)
setGu(string)
setHonorificPrefix(string)
setHonorificSuffix(string)
setJobTitle(string)
setPostalCode(string)
setPrefecture(string)
setProvince(string)
setRegion(string)
setRepublic(string)
setSecondFamilyName(string)
setSi(string)
setState(string)
setTitle(string)
```

### Options

These affect the output format

```js
/*
  Input one country and one type,
  Define whether text transformations should be executed

  country: 'CA' | ...
  type: 'business' | 'english' | 'default' | 'french' | 'personal'
  useTransforms: true | false
*/

const postalAddress = new PostalAddress({
  formats: addressFormats,
  defaultFormat: 'US',
})

postalAddress.setFormat({ country, type, useTransforms })
```

### Querying Address Formats

You can retrieve the format definition for any country programmatically.

```js
const postalAddress = new PostalAddress({
  formats: addressFormats,
  defaultFormat: 'US',
})

// Get the format for a country (returns the array of address parts)
const format = postalAddress.getAddressFormat({ country: 'KR' })
// => [['familyName', 'givenName', 'honorificPrefix'], ['companyName'], ...]

// Get a specific format type
const businessFormat = postalAddress.getAddressFormat({
  country: 'NO',
  type: 'business',
})
```

You can also import the full format definitions directly:

```js
import { addressFormats } from 'i18n-postal-address'

// Access any country's format
const usFormat = addressFormats.US.default.array
```

### Custom Formats

Additional formats can be added or existing ones can be replaced

```js
/*
  The country should be an uppercase ISO 3166-1 alpha-2 code

  The format should be an array of array of strings or objects
    - The strings should be valid attribute names
    - The objects should contain the attribute (required)
    - The objects may contain an array of transforming functions that will be
      applied sequentially over the given attribute with the following signature
        (string) => string
*/

const addCommaAfter = (value) => `${value},`

const postalAddress = new PostalAddress({
  formats: addressFormats,
  defaultFormat: 'US',
})

postalAddress.addFormat({
  country: 'PT',
  format: [
    [{ attribute: 'familyName', transforms: [addCommaAfter] }, 'givenName'],
    ['city', 'postalCode'],
    ['country'],
  ],
})
```

#### Valid attributes

```txt
additionalName
address1
address2
addressNum
careOf
city
companyName
country
countryAlpha2
do
dong
familyName
firstFamilyName
givenName
gu
honorificPrefix
honorificSuffix
jobTitle
postalCode
prefecture
province
region
republic
secondFamilyName
si
state
title
```

## Background

### Why

Need to present postal addresses for different regions worldwide stored in
individual parts (company name, address, postal code, city, county, country,
...).

### Data Sources

Address formats are sourced from [Google's Address Data Service][google-address-data]
(the same data that powers Chrome autofill and Android address input) and aligned
with the [UPU S42][upu-s42] international addressing standard. The library includes
tooling scripts to fetch, transform, and diff Google's data against the built-in
format definitions.

### Inspiration

**Disclaimer:** It doesn't mean this library tries to recreate any of these

MSDN > ... > Globalization and Localization >
[Appendix V International Address Formats][msappendix]

[Query Address Data][qad]

[PostalAddress][pa]

## Forking / Contributing

Build

```sh
pnpm build
```

Test

```sh
pnpm test:unit

pnpm test:functional
```

### Updating Address Formats

To compare the built-in formats against Google's latest data:

```sh
pnpm formats:update
```

This fetches Google's address data, transforms it to the library's format, and
prints a diff showing matches, differences, and missing countries.

<!-- References -->

[google-address-data]: https://chromium-i18n.appspot.com/ssl-address
[msappendix]: https://msdn.microsoft.com/en-us/library/cc195167.aspx
[pa]: https://schema.org/PostalAddress
[playground]: https://joaocarmo.com/i18n-postal-address-playground
[qad]: http://i18napis.appspot.com/address
[upu-s42]: https://www.upu.int/en/Postal-Solutions/Programmes-Services/Addressing-Solutions
