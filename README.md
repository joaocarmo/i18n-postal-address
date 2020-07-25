# i18n-postal-address

[![npm version](https://badge.fury.io/js/i18n-postal-address.svg)](https://badge.fury.io/js/i18n-postal-address)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
![tests](https://github.com/joaocarmo/i18n-postal-address/workflows/Tests/badge.svg)

A JavaScript library to produce international postal addresses formatted by
region.

## Installation

```sh
npm install i18n-postal-address

# or

yarn add i18n-postal-address
```

## Usage

#### On the web

It's exposed through the _window_ global object as explained below.

`index.html`

```html
<head>
  <script type="text/javascript" src="./postal-address.js"></script>
  <script type="text/javascript" src="./foo.js"></script>
</head>
```

`foo.js`

```js
// define myAddress
var PostalAddress = window.PostalAddress.default;
var myAddress = new PostalAddress();

// ...
```

#### With a bundler / Node.js

With a bundler (e.g. webpack) or in Node.js you can just require / import it.

```js
import PostalAddress from 'i18n-postal-address'

// define myAddress
const myAddress = new PostalAddress()
```

## Example

```js
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

**Address Attributes**

```txt
setAddress1
setAddress2
setAddressNum
setCity
setCompanyName
setCountry
setDo
setDong
setFirstLastName
setFirstName
setGu
setHonorific
setJobTitle
setLastName
setPostalCode
setPrefecture
setProvince
setRegion
setRepublic
setSecondLastName
setSecondName
setSi
setState
setTitle
```

**Options**

These affect the output format

```javascript
/*
  Input one country and one type,
  Define whether text transformations should be executed

  country: 'CA', ...
  type: 'business', 'english', 'default', 'french', 'personal'
  useTransforms: true, false
*/
setFormat({ country, type, useTransforms })
```

### Why?

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

### Forking / Contributing

Build

```txt
yarn build
```

Test

```txt
yarn test:unit

yarn test:functional
```

<!-- References -->
[libpostal]: https://github.com/openvenues/libpostal
[msappendix]: https://msdn.microsoft.com/en-us/library/cc195167.aspx
[qad]: http://i18napis.appspot.com/address
[pa]: https://schema.org/PostalAddress
