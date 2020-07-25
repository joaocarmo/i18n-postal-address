// Import modules and constants
import PostalAddressInterface from './types/postal-address'
import {
  AddressFormat,
  AddressFormats,
  AddressObject,
  Countries,
  ParserInterface,
  Validator,
} from './types/address-format'
import allAddressFormats from './address-formats'
import allAddressParsers from './address-parsers'
import objectInitialState from './object-initial-state'
import countries from './countries.json'

class PostalAddress implements PostalAddressInterface {
  outputFormat: 'array' | 'string'

  formatForCountry: string

  formatForType: 'business' | 'english' | 'default' | 'french' | 'personal'

  useTransforms: boolean

  object: AddressObject

  validators: {
    [key: string]: Validator
  }

  allowed: {
    [key: string]: string[]
  }

  addressFormats: AddressFormats

  addressParsers: {
    [key: string]: ParserInterface
  }

  constructor() {
    // Possible values: 'array', 'string'
    this.outputFormat = 'array'
    // 2-letter country code
    this.formatForCountry = 'US'
    // Possible values: 'business', 'english', 'default', 'french', 'personal'
    this.formatForType = 'default'
    // Transform input data or keep it as is
    this.useTransforms = true
    // The object properties that can be set
    this.object = { ...objectInitialState }
    // Validator functions
    this.validators = {
      formatForCountry: (value) => this.allowed.formatForCountry.includes(value),
      formatForType: (value) => this.allowed.formatForType.includes(value),
      outputFormat: (value) => this.allowed.outputFormat.includes(value),
    }
    // Allowed values
    this.allowed = {
      formatForCountry: Object.keys(allAddressFormats),
      formatForType: ['business', 'default', 'english', 'french', 'personal'],
      outputFormat: ['array', 'string'],
    }
    // Address formats
    this.addressFormats = allAddressFormats
    // Parsers
    this.addressParsers = allAddressParsers
  }

  validator(property: string, newValue: string, object = true): string {
    let oldValue = ''

    if (object) {
      oldValue = this.object[property]
    } else {
      oldValue = this[property] as string
    }
    const validatorFn = this.validators[property]

    if (typeof validatorFn === 'function') {
      if (validatorFn(newValue)) {
        return newValue
      }
      return oldValue
    }
    return newValue
  }

  setProperty(property: string, newValue: string, object = true): void {
    if (typeof newValue === 'string') {
      if (object) {
        if (typeof this.object[property] === 'string') {
          this.object[property] = this.validator(property, newValue, object)
        }
      } else if (typeof this[property] === 'string') {
        this[property] = this.validator(property, newValue, object)
      }
    }
  }

  setAddress(newValue: string): void {
    this.setAddress1(newValue)
  }

  setAddress1(newValue: string): void {
    this.setProperty('address1', newValue)
    this.setProperty('dong', newValue)
  }

  setAddress2(newValue: string): void {
    this.setProperty('address2', newValue)
  }

  setAddressNum(newValue: string): void {
    this.setProperty('addressNum', newValue)
  }

  setCity(newValue: string): void {
    this.setProperty('city', newValue)
    this.setProperty('si', newValue)
  }

  setCompanyName(newValue: string): void {
    this.setProperty('companyName', newValue)
  }

  setCountry(newValue: string): void {
    this.setProperty('country', newValue)
    const countryAlpha2 = (countries as Countries)[newValue]

    if (countryAlpha2) {
      this.setProperty('countryAlpha2', countryAlpha2)
    }
  }

  setDo(newValue: string): void {
    this.setProperty('do', newValue)
    this.setProperty('province', newValue)
  }

  setDong(newValue: string): void {
    this.setProperty('dong', newValue)
    this.setProperty('address1', newValue)
  }

  setFirstLastName(newValue: string): void {
    this.setProperty('firstLastName', newValue)
  }

  setFirstName(newValue: string): void {
    this.setProperty('firstName', newValue)
  }

  setGu(newValue: string): void {
    this.setProperty('gu', newValue)
  }

  setHonorific(newValue: string): void {
    this.setProperty('honorific', newValue)
  }

  setJobTitle(newValue: string): void {
    this.setProperty('jobTitle', newValue)
  }

  setLastName(newValue: string): void {
    this.setProperty('lastName', newValue)
    this.setProperty('secondLastName', newValue)
  }

  setPostalCode(newValue: string): void {
    this.setProperty('postalCode', newValue)
  }

  setPrefecture(newValue: string): void {
    this.setProperty('prefecture', newValue)
  }

  setProvince(newValue: string): void {
    this.setProperty('province', newValue)
    this.setProperty('do', newValue)
  }

  setRegion(newValue: string): void {
    this.setProperty('region', newValue)
  }

  setRepublic(newValue: string): void {
    this.setProperty('republic', newValue)
  }

  setSecondLastName(newValue: string): void {
    this.setProperty('secondLastName', newValue)
    this.setProperty('lastName', newValue)
  }

  setSecondName(newValue: string): void {
    this.setProperty('secondName', newValue)
  }

  setSi(newValue: string): void {
    this.setProperty('si', newValue)
    this.setProperty('city', newValue)
  }

  setState(newValue: string): void {
    this.setProperty('state', newValue)
  }

  setTitle(newValue: string): void {
    this.setProperty('title', newValue)
  }

  setOutputFormat(string: string): void {
    this.setProperty('outputFormat', string, false)
  }

  setFormat(
    {
      country,
      type,
      useTransforms,
    }: { country: string, type: string, useTransforms: boolean },
  ): void {
    if (typeof country === 'string') {
      this.setProperty('formatForCountry', country, false)
    }
    if (typeof type === 'string') {
      this.setProperty('formatForType', type, false)
    }
    if (typeof useTransforms === 'boolean') {
      this.useTransforms = useTransforms
    }
  }

  getFormat(overrideFormat: string): AddressFormat | null {
    const {
      outputFormat, formatForCountry, formatForType, addressFormats,
    } = this
    const format: string = overrideFormat || outputFormat
    let formatsAvailable = addressFormats[formatForCountry]

    if (!formatsAvailable) {
      // Default to the US format
      formatsAvailable = addressFormats.US
    }
    let outputType: { array?: AddressFormat } = { array: undefined }

    if (formatsAvailable[formatForType]) {
      outputType = formatsAvailable[formatForType]
    } else if (formatsAvailable.default) {
      outputType = formatsAvailable.default
    }
    if (outputType[format]) {
      return outputType[format]
    } if (outputType.array) {
      return outputType.array
    }
    return null
  }

  getParser(overrideFormat: string): ParserInterface | null {
    const { outputFormat, addressParsers } = this
    const format = overrideFormat || outputFormat

    if (addressParsers[format]) {
      return addressParsers[format]
    }
    return null
  }

  output(overrideFormat: string): string[][] | string | null {
    const { useTransforms } = this

    const outputFormat = this.getFormat(overrideFormat)
    const outputParser = this.getParser(overrideFormat)

    if (typeof outputParser === 'function' && outputFormat) {
      return outputParser(this.object, outputFormat, useTransforms)
    }
    return null
  }

  toString(): string {
    const output: string[][] = this.output('array') as string[][]

    if (output) {
      return output.map((part) => part.join(' ')).join('\n')
    }
    return ''
  }

  raw(): AddressObject {
    return this.object
  }
}

export default PostalAddress
