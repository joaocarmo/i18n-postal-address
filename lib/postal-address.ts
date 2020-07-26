// Import modules and constants
import PostalAddressInterface from './types/postal-address'
import {
  AddressFormatPart,
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
  private outputFormat: 'array' | 'string'

  private formatForCountry: string

  private formatForType: 'business' | 'english' | 'default' | 'french' | 'personal'

  private useTransforms: boolean

  private object: AddressObject

  private validators: {
    [key: string]: Validator
  }

  private allowed: {
    [key: string]: string[]
  }

  private addressFormats: AddressFormats

  private addressParsers: {
    [key: string]: ParserInterface
  }

  public constructor() {
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

  private validator(property: string, newValue: string, object = true): string {
    let oldValue = ''
    const validatorFn = this.validators[property]

    if (object) {
      oldValue = this.object[property]
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      oldValue = this[property]
    }

    if (typeof validatorFn === 'function') {
      if (validatorFn(newValue)) {
        return newValue
      }
      return oldValue
    }

    return newValue
  }

  private getFormat(overrideFormat: string): AddressFormatPart[][] | null {
    const {
      outputFormat, formatForCountry, formatForType, addressFormats,
    } = this

    const format = overrideFormat || outputFormat
    let formatsAvailable = addressFormats[formatForCountry]
    let outputType: AddressFormat = {}

    if (!formatsAvailable) {
      // Default to the US format
      formatsAvailable = addressFormats?.US
    }

    if (formatsAvailable?.[formatForType as keyof AddressFormats]) {
      outputType = formatsAvailable[formatForType]
    } else if (formatsAvailable.default) {
      outputType = formatsAvailable?.default
    }

    if (outputType?.[format as keyof AddressFormat]) {
      return outputType?.[format as keyof AddressFormat] || null
    }

    if (outputType?.array) {
      return outputType.array
    }

    return null
  }

  private getParser(overrideFormat: string): ParserInterface | null {
    const { outputFormat, addressParsers } = this
    const format = overrideFormat || outputFormat

    if (addressParsers[format]) {
      return addressParsers[format]
    }

    return null
  }

  private output(overrideFormat: string): string[][] | string | null {
    const { useTransforms } = this

    const outputFormat = this.getFormat(overrideFormat)
    const outputParser = this.getParser(overrideFormat)

    if (typeof outputParser === 'function' && outputFormat) {
      return outputParser(this.object, outputFormat, useTransforms)
    }

    return null
  }

  private setProperty(property: string, newValue: string, object = true): void {
    if (typeof newValue === 'string') {
      if (object) {
        if (typeof this.object[property] === 'string') {
          this.object[property] = this.validator(property, newValue, object)
        }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      } else if (typeof this[property] === 'string') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
        this[property] = this.validator(property, newValue, object)
      }
    }
  }

  public setAddress(newValue: string): void {
    this.setAddress1(newValue)
  }

  public setAddress1(newValue: string): void {
    this.setProperty('address1', newValue)
    this.setProperty('dong', newValue)
  }

  public setAddress2(newValue: string): void {
    this.setProperty('address2', newValue)
  }

  public setAddressNum(newValue: string): void {
    this.setProperty('addressNum', newValue)
  }

  public setCity(newValue: string): void {
    this.setProperty('city', newValue)
    this.setProperty('si', newValue)
  }

  public setCompanyName(newValue: string): void {
    this.setProperty('companyName', newValue)
  }

  public setCountry(newValue: string): void {
    this.setProperty('country', newValue)
    const countryAlpha2 = (countries as Countries)[newValue]

    if (countryAlpha2) {
      this.setProperty('countryAlpha2', countryAlpha2)
    }
  }

  public setDo(newValue: string): void {
    this.setProperty('do', newValue)
    this.setProperty('province', newValue)
  }

  public setDong(newValue: string): void {
    this.setProperty('dong', newValue)
    this.setProperty('address1', newValue)
  }

  public setFirstLastName(newValue: string): void {
    this.setProperty('firstLastName', newValue)
  }

  public setFirstName(newValue: string): void {
    this.setProperty('firstName', newValue)
  }

  public setGu(newValue: string): void {
    this.setProperty('gu', newValue)
  }

  public setHonorific(newValue: string): void {
    this.setProperty('honorific', newValue)
  }

  public setJobTitle(newValue: string): void {
    this.setProperty('jobTitle', newValue)
  }

  public setLastName(newValue: string): void {
    this.setProperty('lastName', newValue)
    this.setProperty('secondLastName', newValue)
  }

  public setPostalCode(newValue: string): void {
    this.setProperty('postalCode', newValue)
  }

  public setPrefecture(newValue: string): void {
    this.setProperty('prefecture', newValue)
  }

  public setProvince(newValue: string): void {
    this.setProperty('province', newValue)
    this.setProperty('do', newValue)
  }

  public setRegion(newValue: string): void {
    this.setProperty('region', newValue)
  }

  public setRepublic(newValue: string): void {
    this.setProperty('republic', newValue)
  }

  public setSecondLastName(newValue: string): void {
    this.setProperty('secondLastName', newValue)
    this.setProperty('lastName', newValue)
  }

  public setSecondName(newValue: string): void {
    this.setProperty('secondName', newValue)
  }

  public setSi(newValue: string): void {
    this.setProperty('si', newValue)
    this.setProperty('city', newValue)
  }

  public setState(newValue: string): void {
    this.setProperty('state', newValue)
  }

  public setTitle(newValue: string): void {
    this.setProperty('title', newValue)
  }

  public setOutputFormat(string: string): void {
    this.setProperty('outputFormat', string, false)
  }

  public setFormat(
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

  public toString(): string {
    const output: string[][] = this.output('array') as string[][]

    if (output) {
      return output.map((part) => part.join(' ')).join('\n')
    }

    return ''
  }

  public raw(): AddressObject {
    return this.object
  }
}

export default PostalAddress
