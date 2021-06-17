// Import modules and constants
import PostalAddressError from './postal-address-error'
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
import { containsValidTokens, isValidFormat } from './utils'
import * as constants from './constants'
import countries from './countries.json'

class PostalAddress implements PostalAddressInterface {
  private outputFormat: 'array' | 'string'

  private outputParser: 'array' | 'string'

  private formatForCountry: string

  private formatForType:
    | 'business'
    | 'english'
    | 'default'
    | 'french'
    | 'personal'

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
    // Possible values: 'array' | 'string'
    this.outputFormat = constants.DEFAULT_OUTPUT_FORMAT
    // Possible values: 'array' | 'string'
    this.outputParser = constants.DEFAULT_OUTPUT_PARSER
    // 2-letter country code
    this.formatForCountry = constants.DEFAULT_FORMAT_FOR_COUNTRY
    // Possible values: 'business' | 'english' | 'default' | 'french' | 'personal'
    this.formatForType = constants.DEFAULT_FORMAT_FOR_TYPE
    // Transform input data or keep it as is
    this.useTransforms = constants.DEFAULT_USE_TRANSFORMS
    // The object properties that can be set
    this.object = { ...objectInitialState }
    // Allowed values
    this.allowed = {
      formatForCountry: Object.keys(allAddressFormats),
      formatForType: constants.ALLOWED_FORMAT_FOR_TYPE,
      outputFormat: constants.ALLOWED_OUTPUT_FORMAT,
      outputParser: constants.ALLOWED_OUTPUT_PARSER,
    }
    // Validator functions
    this.validators = {
      formatForCountry: (value) =>
        this.allowed.formatForCountry.includes(value),
      formatForType: (value) => this.allowed.formatForType.includes(value),
      outputFormat: (value) => this.allowed.outputFormat.includes(value),
      outputParser: (value) => this.allowed.outputParser.includes(value),
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

  private getParser(overrideParser: string): ParserInterface | null {
    const { outputParser, addressParsers } = this
    const parser = overrideParser || outputParser

    if (addressParsers[parser]) {
      return addressParsers[parser]
    }

    return null
  }

  public output(
    overrideFormat = '',
    overrideParser = '',
  ): string[][] | string | null {
    const { useTransforms } = this

    const outputFormat = this.getFormat(overrideFormat)
    const outputParser = this.getParser(overrideParser)

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

  public setOutputFormat(newValue: string): this {
    this.setProperty('outputFormat', newValue, false)
    return this
  }

  public setOutputParser(newValue: string): this {
    this.setProperty('outputParser', newValue, false)
    return this
  }

  public setFormat({
    country,
    type,
    useTransforms,
  }: {
    country?: string
    type?: string
    useTransforms?: boolean
  }): this {
    if (typeof country === 'string') {
      this.setProperty('formatForCountry', country, false)
    }
    if (typeof type === 'string') {
      this.setProperty('formatForType', type, false)
    }
    if (typeof useTransforms === 'boolean') {
      this.useTransforms = useTransforms
    }

    return this
  }

  public addFormat({
    country,
    format,
    parser = constants.DEFAULT_OUTPUT_PARSER,
    type = constants.DEFAULT_FORMAT_FOR_TYPE,
  }: {
    country: string
    format: AddressFormatPart[][]
    parser: string
    type: string
  }): this {
    if (!country) {
      throw new PostalAddressError(constants.ERROR_REQUIRED_COUNTRY)
    }

    if (typeof country !== 'string' || country.length !== 2) {
      throw new PostalAddressError(constants.ERROR_INVALID_COUNTRY)
    }

    if (!format) {
      throw new PostalAddressError(constants.ERROR_REQUIRED_FORMAT)
    }

    if (!isValidFormat(format, parser)) {
      throw new PostalAddressError(constants.ERROR_INVALID_FORMAT)
    }

    if (!containsValidTokens(format, parser)) {
      throw new PostalAddressError(constants.ERROR_INVALID_TOKENS)
    }

    const countryAlpha2 = country.toUpperCase()

    this.addressFormats[countryAlpha2] = {
      [type]: {
        [parser]: format,
      },
    }

    return this
  }

  public fromString(_string: string): this {
    if (_string && typeof _string === 'string' && _string.length > 0) {
      this.setProperty('_string', _string)
      this.setOutputParser('string')
      return this
    }

    throw new PostalAddressError(constants.ERROR_INVALID_STRING)
  }

  public toString(): string {
    const output: string[][] = this.output(constants.OUTPUT_ARRAY) as string[][]

    if (output) {
      return output
        .map((part) => part.join(constants.JOIN_FIRST_SEPARATOR))
        .join(constants.JOIN_SECOND_SEPARATOR)
    }

    return ''
  }

  public raw(): AddressObject {
    return this.object
  }
}

export default PostalAddress
