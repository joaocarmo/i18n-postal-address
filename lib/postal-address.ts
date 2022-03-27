import PostalAddressError from './postal-address-error'
import type PostalAddressInterface from './types/postal-address'
import type {
  AddFormatArgs,
  AddressFormat,
  AddressFormatPart,
  AddressFormats,
  AddressObject,
  ClassProperties,
  Countries,
  FormatTypes,
  OutputFormat,
  ParserInterface,
  Validator,
} from './types/address-format'
import allAddressFormats from './address-formats'
import allAddressParsers from './address-parsers'
import objectInitialState from './object-initial-state'
import { containsValidTokens, isValidFormat, parseValidator } from './utils'
import countries from './countries.json'

class PostalAddress implements PostalAddressInterface {
  private outputFormat: OutputFormat

  private formatForCountry: string

  private formatForType: FormatTypes

  private useTransforms: boolean

  private object: AddressObject

  private validators: {
    [key in keyof ClassProperties]: Validator<ClassProperties[key]>
  }

  private allowed: {
    [key in keyof ClassProperties]: ClassProperties[key][]
  }

  private addressFormats: AddressFormats

  private addressParsers: {
    [key: string]: ParserInterface
  }

  public constructor(initialObject?: AddressObject) {
    // Possible values: 'array' | 'string'
    this.outputFormat = 'array'
    // 2-letter country code
    this.formatForCountry = 'US'
    // Possible values: 'business' | 'english' | 'default' | 'french' | 'personal'
    this.formatForType = 'default'
    // Transform input data or keep it as is
    this.useTransforms = true
    // The object properties that can be set
    this.object = { ...objectInitialState, ...initialObject }
    // Validator functions
    this.validators = {
      formatForCountry: (value) =>
        this.allowed.formatForCountry.includes(value),
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

  private getFormat(overrideFormat: string): AddressFormatPart[][] | null {
    const { outputFormat, formatForCountry, formatForType, addressFormats } =
      this

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

  public output(overrideFormat = ''): string[][] | string | null {
    const { useTransforms } = this

    const outputFormat = this.getFormat(overrideFormat)
    const outputParser = this.getParser(overrideFormat)

    if (typeof outputParser === 'function' && outputFormat) {
      return outputParser(this.object, outputFormat, useTransforms)
    }

    return null
  }

  private setProperty<T extends keyof AddressObject>(
    property: T,
    newValue: string,
  ): void {
    if (
      typeof newValue === 'string' &&
      property in this.object &&
      typeof this.object[property] === 'string'
    ) {
      this.object[property] = newValue
    }
  }

  public setAddress(newValue: string): this {
    this.setAddress1(newValue)
    return this
  }

  public setAddress1(newValue: string): this {
    this.setProperty('address1', newValue)
    this.setProperty('dong', newValue)
    return this
  }

  public setAddress2(newValue: string): this {
    this.setProperty('address2', newValue)
    return this
  }

  public setAddressNum(newValue: string): this {
    this.setProperty('addressNum', newValue)
    return this
  }

  public setCity(newValue: string): this {
    this.setProperty('city', newValue)
    this.setProperty('si', newValue)
    return this
  }

  public setCompanyName(newValue: string): this {
    this.setProperty('companyName', newValue)
    return this
  }

  public setCountry(newValue: string): this {
    this.setProperty('country', newValue)
    const countryAlpha2 = (countries as Countries)[newValue]

    if (countryAlpha2) {
      this.setProperty('countryAlpha2', countryAlpha2)
    }

    return this
  }

  public setDo(newValue: string): this {
    this.setProperty('do', newValue)
    this.setProperty('province', newValue)
    return this
  }

  public setDong(newValue: string): this {
    this.setProperty('dong', newValue)
    this.setProperty('address1', newValue)
    return this
  }

  public setFirstLastName(newValue: string): this {
    this.setProperty('firstLastName', newValue)
    return this
  }

  public setFirstName(newValue: string): this {
    this.setProperty('firstName', newValue)
    return this
  }

  public setGu(newValue: string): this {
    this.setProperty('gu', newValue)
    return this
  }

  public setHonorific(newValue: string): this {
    this.setProperty('honorific', newValue)
    return this
  }

  public setJobTitle(newValue: string): this {
    this.setProperty('jobTitle', newValue)
    return this
  }

  public setLastName(newValue: string): this {
    this.setProperty('lastName', newValue)
    this.setProperty('secondLastName', newValue)
    return this
  }

  public setPostalCode(newValue: string): this {
    this.setProperty('postalCode', newValue)
    return this
  }

  public setPrefecture(newValue: string): this {
    this.setProperty('prefecture', newValue)
    return this
  }

  public setProvince(newValue: string): this {
    this.setProperty('province', newValue)
    this.setProperty('do', newValue)
    return this
  }

  public setRegion(newValue: string): this {
    this.setProperty('region', newValue)
    return this
  }

  public setRepublic(newValue: string): this {
    this.setProperty('republic', newValue)
    return this
  }

  public setSecondLastName(newValue: string): this {
    this.setProperty('secondLastName', newValue)
    this.setProperty('lastName', newValue)
    return this
  }

  public setSecondName(newValue: string): this {
    this.setProperty('secondName', newValue)
    return this
  }

  public setSi(newValue: string): this {
    this.setProperty('si', newValue)
    this.setProperty('city', newValue)
    return this
  }

  public setState(newValue: string): this {
    this.setProperty('state', newValue)
    return this
  }

  public setTitle(newValue: string): this {
    this.setProperty('title', newValue)
    return this
  }

  public setOutputFormat(format: OutputFormat): this {
    this.outputFormat = parseValidator(
      this.outputFormat,
      format,
      this.validators.outputFormat,
    )
    return this
  }

  public setFormat({
    country,
    type,
    useTransforms,
  }: {
    country?: string
    type?: FormatTypes
    useTransforms?: boolean
  }): this {
    if (typeof country === 'string') {
      this.formatForCountry = parseValidator(
        this.formatForCountry,
        country,
        this.validators.formatForCountry,
      )
    }
    if (typeof type === 'string') {
      this.formatForType = parseValidator(
        this.formatForType,
        type,
        this.validators.formatForType,
      )
    }
    if (typeof useTransforms === 'boolean') {
      this.useTransforms = useTransforms
    }

    return this
  }

  public addFormat({
    country,
    format,
    parser = 'array',
    type = 'default',
  }: AddFormatArgs): this {
    if (!country) {
      throw new PostalAddressError('Country is not specified, but is required')
    }

    if (typeof country !== 'string' || country.length !== 2) {
      throw new PostalAddressError('Country is not an ISO 3166-1 alpha-2 code')
    }

    if (!format) {
      throw new PostalAddressError('Format is not specified, but is required')
    }

    if (!isValidFormat(format, parser)) {
      throw new PostalAddressError(
        'Format is invalid, should be an array of arrays of strings or objects',
      )
    }

    if (!containsValidTokens(format, parser)) {
      throw new PostalAddressError('Format contains invalid tokens')
    }

    const countryAlpha2 = country.toUpperCase()

    this.addressFormats[countryAlpha2] = {
      [type]: {
        [parser]: format,
      },
    }

    return this
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
