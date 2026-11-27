# i18n-postal-address

[![npm version](https://badge.fury.io/js/i18n-postal-address.svg)](https://badge.fury.io/js/i18n-postal-address)
[![Tests](https://github.com/joaocarmo/i18n-postal-address/actions/workflows/tests.yml/badge.svg)](https://github.com/joaocarmo/i18n-postal-address/actions/workflows/tests.yml)

A JavaScript library to produce international postal addresses formatted by
region for Node.js and the web. Supports **249 countries and territories** with format data
sourced from [Google's Address Data Service][google-address-data].

**Try it out in the [playground]!**

## Installation

```sh
npm install i18n-postal-address

# or

pnpm add i18n-postal-address
```

> **Note:** This is an ESM-only package. It requires Node.js >= 18.

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

The methods can be chained one after the other for cleaner code.

```js
import PostalAddress, { addressFormats } from 'i18n-postal-address'

const myAddressPersonal = new PostalAddress({
  formats: addressFormats,
  defaultFormat: 'US',
})

myAddressPersonal
  .setAddress1('Rua das Flores, 15')
  .setCity('Porto')
  .setCountry('Portugal')
  .setGivenName('Ana')
  .setHonorificPrefix('Sra.')
  .setFamilyName('Ferreira')
  .setPostalCode('4050-265')
  .setAdditionalName('Sousa')
  .setFormat({ country: 'PT' })

console.log(myAddressPersonal.toArray())

console.log(myAddressPersonal.toString())
```

`toArray()`

```txt
[ [ 'Sra.', 'Ana', 'Sousa', 'Ferreira' ],
  [ 'Rua das Flores, 15' ],
  [ '4050-265', 'Porto' ],
  [ 'PORTUGAL' ] ]
```

`toString()`

```txt
Sra. Ana Sousa Ferreira
Rua das Flores, 15
4050-265 Porto
PORTUGAL
```

## Available Class Methods

### Address Attributes

```js
setAdditionalName(string)
setAddress(string) // alias of setAddress1
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

  country: 'CA' | ... (an ISO 3166-1 alpha-2 code, in any case)
  type: 'business' | 'english' | 'default' | 'french' | 'personal'
  useTransforms: true | false
*/

const postalAddress = new PostalAddress({
  formats: addressFormats,
  defaultFormat: 'US',
})

postalAddress.setFormat({ country, type, useTransforms })
```

The `english` type of `CN`, `JP`, `KR` and `KP` gives the Latin-script order, for an address written in Latin script. It does not transliterate the values.

In the default type of `CN`, `JP`, `KR` and `KP`, `honorificPrefix` and `honorificSuffix` both print after the name, in that order, because these languages put honorifics there: `郵政 太郎 様`, `李志敏 先生 收`. The `english` type prints `honorificPrefix` before the name.

The default type of `CN` prints the name without spaces, and that of `JP` prints the prefecture and city without a space, as the postal operators write them: `東京都中央区`. A name in Latin script belongs in the `english` type.

### Propagation

```js
/*
  On by default. Some setters also fill a related attribute:
    setCity() and setSi() set each other
    setAddress1() and setDong() set each other
    setDo() and setProvince() set each other
    setFamilyName() and setSecondFamilyName() set each other
    setCountry() also sets countryAlpha2, for an English country name: the
    current or an earlier ISO 3166-1 short name, or the name that browsers
    show. Case, accents and spaces around the name do not matter
*/

postalAddress.setPropagation(false)
```

Propagation also covers the first administrative level. Formats read it as `state`, `province`, `region`, `prefecture`, `do` or `republic`. When a format reads 1 of them and it is empty, it prints the first of the others that is set. For example, a value set with `setState()` prints in the `CA` format, which reads `province`.

### Objects

```js
// Replaces every attribute; attributes left out become empty
postalAddress.fromObject({ givenName: 'Ana', city: 'Porto' })

// Returns a copy of every attribute
postalAddress.toObject()
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
// => [['do', 'si', 'gu', 'dong', 'addressNum'], ['address2'], ...]

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
  The country should be an ISO 3166-1 alpha-2 code, in any case

  The format should be an array of array of strings or objects
    - The strings should be valid attribute names
    - The objects should contain the attribute (required)
    - The objects may contain an array of transforming functions that will be
      applied sequentially over the given attribute with the following signature
        (value, address) => string
      where address holds every attribute, such as address.city
      The address is read-only. A write to it throws in strict mode, which
      every ES module uses
    - A comma that a transform adds to the last part of a line is dropped, so
      a separator prints only when another part follows
    - The objects may contain a separator string that replaces the space
      between the part and the part before it, when both have a value
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

postalAddress.addFormat({
  country: 'JP',
  format: [
    ['postalCode', 'prefecture', { attribute: 'city', separator: '' }],
    ['address1'],
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

Only the `KR` and `KP` formats print `addressNum`. Other formats ignore it.

Only the `KR` default format prints `jobTitle`, before the name, as Korea Post asks.

In `KR`, `si` holds a city or county (`-si`, `-gun`), and `gu` holds the level below it (`-gu`, `-eup`, `-myeon`). Leave `si` empty for an autonomous district of Seoul or a metropolitan city, which goes in `gu`. `address2` holds the detailed address (building, floor, unit) and the reference item in brackets, such as `(어진동)`.

In `RU`, `region` holds the district (район) and prints below the town. `republic` or `state` holds the subject (republic, krai or oblast).

## Background

### Why

Need to present postal addresses for different regions worldwide stored in
individual parts (company name, address, postal code, city, county, country,
...).

### Data Sources

Address formats are sourced from [Google's Address Data Service][google-address-data]
(the same data that powers Chrome autofill and Android address input). The library
includes tooling scripts to fetch, transform, and diff Google's data against the
built-in format definitions.

[UPU S42][upu-s42] is the international standard for postal address templates.

### Field mapping

The attributes map to the [HTML autofill tokens][autofill] and to the fields of Google's data. Use the table to fill an address from a form or another source.

| Attribute                                                     | HTML autofill           | Google's data              |
| ------------------------------------------------------------- | ----------------------- | -------------------------- |
| `honorificPrefix`                                             | `honorific-prefix`      | Name (`%N`)                |
| `givenName`                                                   | `given-name`            | Name (`%N`)                |
| `additionalName`                                              | `additional-name`       | Name (`%N`)                |
| `familyName`, `firstFamilyName`, `secondFamilyName`           | `family-name`           | Name (`%N`)                |
| `honorificSuffix`                                             | `honorific-suffix`      | Name (`%N`)                |
| `jobTitle`                                                    | `organization-title`    | None                       |
| `companyName`                                                 | `organization`          | Organization (`%O`)        |
| `address1`, `dong`                                            | `address-line1`         | Street address (`%A`)      |
| `address2`                                                    | `address-line2`         | Street address (`%A`)      |
| `addressNum`                                                  | Part of `address-line1` | Street address (`%A`)      |
| `state`, `province`, `region`, `prefecture`, `do`, `republic` | `address-level1`        | Administrative area (`%S`) |
| `city`, `si`                                                  | `address-level2`        | Locality (`%C`)            |
| `gu`                                                          | `address-level3`        | Dependent locality (`%D`)  |
| `postalCode`                                                  | `postal-code`           | Postal code (`%Z`)         |
| `country`                                                     | `country-name`          | None                       |
| `countryAlpha2`                                               | `country`               | Region code                |

`title` and `careOf` have no counterpart in either. The first administrative level has 6 attribute names. A value set under any of them prints in a format that reads another (see [Propagation](#propagation)).

### Inspiration

**Disclaimer:** It doesn't mean this library tries to recreate any of these

MSDN > ... > Globalization and Localization >
[Appendix V International Address Formats][msappendix]

[PostalAddress][pa]

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, checks, updating the address
formats and releases.

<!-- References -->

[autofill]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete
[google-address-data]: https://chromium-i18n.appspot.com/ssl-address
[msappendix]: https://learn.microsoft.com/en-us/previous-versions/cc195167(v=msdn.10)
[pa]: https://schema.org/PostalAddress
[playground]: https://joaocarmo.com/i18n-postal-address-playground
[upu-s42]: https://www.upu.int/en/Postal-Solutions/Programmes-Services/Addressing-Solutions
