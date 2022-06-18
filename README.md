# i18n-postal-address

[![npm version](https://badge.fury.io/js/i18n-postal-address.svg)](https://badge.fury.io/js/i18n-postal-address)
![Tests](https://github.com/joaocarmo/i18n-postal-address/workflows/Tests/badge.svg)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/joaocarmo/i18n-postal-address.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/joaocarmo/i18n-postal-address/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/joaocarmo/i18n-postal-address.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/joaocarmo/i18n-postal-address/context:javascript)

A JavaScript library to produce international postal addresses formatted by
region for Node.js and the web.

**Try it out in the [playground]!**

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
  import PostalAddress from 'https://cdn.skypack.dev/i18n-postal-address'
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
var PostalAddress = window.PostalAddress.default
var myAddress = new PostalAddress()

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
  .setCountry('Portugal')
  .setFirstName('John')
  .setHonorific('Mr.')
  .setLastName('Pestana')
  .setPostalCode('2700-242')
  .setSecondName('Lopes')
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
  [ '2700-242', 'Aveiro' ],
  [ 'Portugal' ] ]
```

`toString()`

```txt
Mr. John Lopes
Pestana
Rua do Pastel, 19
2700-242 Aveiro
Portugal
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

## Experimental string parsing

If you're interested in parsing a string into an object, you can use the new
experimental support for parsing addresses using some existing libraries.

### libpostal

This is the most complete and comprehensive library for parsing addresses. You
need to be using the **node** version as it's not supported on the web.

#### Requirements

1. Install [libpostal][libpostal] following their installation instructions, or
   execute [this script][install-libpostal] if you're on a \*nix machine
2. Install [node-postal][node-postal] as a dependency in your project, _after
   installing libpostal_

#### Experimental usage

Notice the import is slightly different, you should import this library as
`i18n-postal-address/strings`.

```js
const PostalAddress = require('i18n-postal-address/strings').default

const postalAddress = new PostalAddress()

postalAddress.fromString(
  'Barboncino 781 Franklin Ave, Crown Heights, Brooklyn, NY 11238',
)

console.log(postalAddress.toString())
```

```txt
Barboncino 781 Franklin Ave
Crown Heights Brooklyn
NY 11238
```

## Background

### Why

The [libpostal][libpostal] library is not available on the web.

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
[install-libpostal]: ./scripts/install-libpostal.sh
[libpostal]: https://github.com/openvenues/libpostal
[msappendix]: https://msdn.microsoft.com/en-us/library/cc195167.aspx
[node-postal]: https://github.com/openvenues/node-postal
[pa]: https://schema.org/PostalAddress
[playground]: https://joaocarmo.com/i18n-postal-address-playground
[qad]: http://i18napis.appspot.com/address
[skypack]: https://skypack.dev
