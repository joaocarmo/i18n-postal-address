# i18n-postal-address

[![npm version](https://badge.fury.io/js/i18n-postal-address.svg)](https://badge.fury.io/js/i18n-postal-address)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
![tests](https://github.com/joaocarmo/i18n-postal-address/workflows/Tests/badge.svg)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/joaocarmo/i18n-postal-address.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/joaocarmo/i18n-postal-address/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/joaocarmo/i18n-postal-address.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/joaocarmo/i18n-postal-address/context:javascript)

A JavaScript library to produce international postal addresses formatted by
region.

## Installation

```sh
npm install i18n-postal-address

# or

yarn add i18n-postal-address
```

## Usage

### As an ESM module (web)

Load **i18n-postal-address** directly from [skypack][skypack] (CDN).

```html
<script type="module">
  import PostalAddress from "https://cdn.skypack.dev/i18n-postal-address"
</script>
```

Demo available in [codepen][codepen].

### On the web (self-hosted)

It's exposed through the _window_ global object as explained below.

`index.html`

```html
<head>
  <script type="text/javascript" src="./postal-address.js"></script>
  <script type="text/javascript" src="./app.js"></script>
</head>
```

`app.js`

```js
// Define myAddress
var PostalAddress = window.PostalAddress.default;
var myAddress = new PostalAddress();

// ...
```

### With a bundler / Node.js

With a bundler (e.g. webpack) or in Node.js you can just require / import it.

```js
import PostalAddress from 'i18n-postal-address'

// Define myAddress
const myAddress = new PostalAddress()
```

## Example

The methods can be chained one after the other for a cleaner code.

```js
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
    country: 'AR',
    type: 'personal',
  })

console.log(myAddressPersonal.output())

console.log(myAddressPersonal.toString())
```

`output()`

```txt
[ [ 'Mr.', 'John', 'Lopes' ],
  [ 'Pestana' ],
  [ 'Rua do Pastel, 19' ],
  [ '2700-242', 'Aveiro' ],
  [ 'Brazil' ] ]
```

`toString()`

```txt
Mr. John Lopes
Pestana
Rua do Pastel, 19
2700-242 Aveiro
Brazil
```

## Available Class Methods

### Address Attributes

```js
setAddress1(string)
setAddress2(string)
setAddressNum(string)
setCity(string)
setCompanyName(string)
setCountry(string)
setDo(string)
setDong(string)
setFirstLastName(string)
setFirstName(string)
setGu(string)
setHonorific(string)
setJobTitle(string)
setLastName(string)
setPostalCode(string)
setPrefecture(string)
setProvince(string)
setRegion(string)
setRepublic(string)
setSecondLastName(string)
setSecondName(string)
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

const postalAddress = new PostalAddress()

postalAddress.setFormat({ country, type, useTransforms })
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

const postalAddress = new PostalAddress()

postalAddress.addFormat({
  country: 'PT',
  format: [
    [{ attribute: 'lastName', transforms: [addCommaAfter] }, 'firstName'],
    ['city', 'postalCode'],
    ['country'],
  ],
})
```

#### Valid attributes

```txt
address1
address2
addressNum
city
companyName
country
countryAlpha2
do
dong
firstLastName
firstName
gu
honorific
jobTitle
lastName
postalCode
prefecture
province
region
republic
secondLastName
secondName
si
state
title
```

## Background

### Why

The great [libpostal][libpostal] is not available
on the web.

Need to present postal addresses for different regions worldwide stored in
individual parts (company name, address, postal code, city, county, country,
  ...).

### Inspiration

**Disclaimer:** It doesn't mean this library tries to recreate any of these

MSDN > ... > Globalization and Localization >
[Appendix V International Address Formats][msappendix]

[Query Address Data][qad]

[PostalAddress][pa]

## Forking / Contributing

Build

```sh
yarn build
```

Test

```sh
yarn test:unit

yarn test:functional
```

<!-- References -->

[codepen]: https://codepen.io/joaocarmo/pen/bGeOVQw
[libpostal]: https://github.com/openvenues/libpostal
[msappendix]: https://msdn.microsoft.com/en-us/library/cc195167.aspx
[pa]: https://schema.org/PostalAddress
[qad]: http://i18napis.appspot.com/address
[skypack]: https://skypack.dev
