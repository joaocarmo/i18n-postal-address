import PostalAddressError from './postal-address-error.js'
import type PostalAddressInterface from './types/postal-address.js'
import type {
  AcceptAddressFormat,
  AddFormatArgs,
  AddressFormats,
  AddressObject,
  AddressOutputFormat,
  AddressOutputFormats,
  AvailableAddressFormat,
  ClassProperties,
  FormatTypes,
  OutputFormat,
  ParserInterface,
  PostalAddressOptions,
} from './types/address-format.js'
import allAddressParsers from './address-parsers.js'
import {
  constructInitialObject,
  containsValidTokens,
  isValidFormat,
} from './utils.js'
import untypedCountries from './data/countries.json' with { type: 'json' }

const countries: Record<string, string> = untypedCountries

class PostalAddress implements PostalAddressInterface {
  private outputFormat: OutputFormat

  private formatForCountry: string

  private formatForType: FormatTypes

  private useTransforms: boolean

  private object: AddressObject

  private allowed: {
    [key in keyof ClassProperties]: ClassProperties[key][]
  }

  private addressFormats: AddressFormats

  private addressParsers: {
    [key in AvailableAddressFormat]: ParserInterface<key> | null
  }

  /**
   * If `true`, changes to one property will propagate to related properties.
   * Default is `true`.
   */
  private propagateToRelatedProperties: boolean = true

  public constructor(options: PostalAddressOptions) {
    const { formats, defaultFormat } = options
    const formatKeys = Object.keys(formats)

    if (formatKeys.length === 0) {
      throw new PostalAddressError('At least one format must be provided')
    }

    if (formatKeys.length >= 2 && !defaultFormat) {
      throw new PostalAddressError(
        'Multiple formats provided, but no default format specified',
      )
    }

    if (defaultFormat && !formatKeys.includes(defaultFormat)) {
      throw new PostalAddressError(
        `Default format "${defaultFormat}" is not in the provided formats`,
      )
    }

    // Possible values: 'array' | 'string'
    this.outputFormat = 'array'
    // 2-letter country code
    this.formatForCountry = defaultFormat ?? formatKeys[0]
    // Possible values: 'business' | 'english' | 'default' | 'french' | 'personal'
    this.formatForType = 'default'
    // Transform input data or keep it as is
    this.useTransforms = true
    // The object properties that can be set
    this.object = constructInitialObject()
    // Allowed values
    this.allowed = {
      formatForCountry: formatKeys,
      formatForType: ['business', 'default', 'english', 'french', 'personal'],
      outputFormat: ['array', 'string'],
    }
    // Address formats
    this.addressFormats = formats
    // Parsers
    this.addressParsers = allAddressParsers
  }

  private getFormat<T extends AvailableAddressFormat>(
    overrideFormat: T,
  ): AcceptAddressFormat | null {
    const { outputFormat, formatForCountry, formatForType, addressFormats } =
      this

    const format = overrideFormat || outputFormat
    const formatsAvailable = addressFormats[formatForCountry]

    if (!formatsAvailable) {
      return null
    }

    const outputType =
      formatsAvailable?.[formatForType] || formatsAvailable?.default

    if (outputType?.[format]) {
      return outputType[format]
    }

    if (outputType?.array) {
      return outputType.array
    }

    return null
  }

  private getParser<T extends AvailableAddressFormat>(
    overrideFormat: T,
  ): ParserInterface<T> | null {
    const { outputFormat, addressParsers } = this
    const format = overrideFormat || outputFormat

    if (addressParsers[format]) {
      return addressParsers[format]
    }

    return null
  }

  public output<T extends AvailableAddressFormat>(
    overrideFormat: T,
  ): AddressOutputFormats[T] | null {
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

    if (this.propagateToRelatedProperties) {
      this.setProperty('dong', newValue)
    }
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

  public setCareOf(newValue: string): this {
    this.setProperty('careOf', newValue)
    return this
  }

  public setCity(newValue: string): this {
    this.setProperty('city', newValue)

    if (this.propagateToRelatedProperties) {
      this.setProperty('si', newValue)
    }
    return this
  }

  public setCompanyName(newValue: string): this {
    this.setProperty('companyName', newValue)
    return this
  }

  public setCountry(newValue: string): this {
    this.setProperty('country', newValue)

    if (this.propagateToRelatedProperties) {
      const countryAlpha2 = countries[newValue]

      if (countryAlpha2) {
        this.setProperty('countryAlpha2', countryAlpha2)
      }
    }

    return this
  }

  public setDo(newValue: string): this {
    this.setProperty('do', newValue)

    if (this.propagateToRelatedProperties) {
      this.setProperty('province', newValue)
    }
    return this
  }

  public setDong(newValue: string): this {
    this.setProperty('dong', newValue)

    if (this.propagateToRelatedProperties) {
      this.setProperty('address1', newValue)
    }
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

    if (this.propagateToRelatedProperties) {
      this.setProperty('secondLastName', newValue)
    }
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

    if (this.propagateToRelatedProperties) {
      this.setProperty('do', newValue)
    }
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

    if (this.propagateToRelatedProperties) {
      this.setProperty('lastName', newValue)
    }
    return this
  }

  public setSecondName(newValue: string): this {
    this.setProperty('secondName', newValue)
    return this
  }

  public setSi(newValue: string): this {
    this.setProperty('si', newValue)

    if (this.propagateToRelatedProperties) {
      this.setProperty('city', newValue)
    }
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

  public setPropagation(propagate: boolean): this {
    this.propagateToRelatedProperties = propagate
    return this
  }

  public setOutputFormat(format: OutputFormat): this {
    if (!this.allowed.outputFormat.includes(format)) {
      throw new PostalAddressError(`Output format "${format}" is not valid`)
    }
    this.outputFormat = format
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
      if (!this.allowed.formatForCountry.includes(country)) {
        throw new PostalAddressError(
          `Country "${country}" is not in the provided formats`,
        )
      }
      this.formatForCountry = country
    }
    if (typeof type === 'string') {
      if (!this.allowed.formatForType.includes(type)) {
        throw new PostalAddressError(`Format type "${type}" is not valid`)
      }
      this.formatForType = type
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

    // Make sure the country code is capitalized
    const countryAlpha2 = country.toUpperCase()

    // Add the format to the list
    this.addressFormats = {
      ...this.addressFormats,
      [countryAlpha2]: {
        [type]: {
          [parser]: format,
        },
      },
    }

    // Update the validator
    this.allowed.formatForCountry = Object.keys(this.addressFormats)

    return this
  }

  public fromObject(presetState: Partial<AddressObject>): this {
    this.object = constructInitialObject(presetState)

    return this
  }

  public getAddressFormat({
    country,
    type = 'default',
  }: {
    country: string
    type?: FormatTypes
  }): AcceptAddressFormat | null {
    const { addressFormats } = this
    const formatsAvailable = addressFormats[country]

    const outputType = formatsAvailable?.[type] || formatsAvailable?.default

    return outputType?.array ?? null
  }

  public toArray(): AddressOutputFormat {
    return this.output('array') || []
  }

  public toObject(): AddressObject {
    return this.object
  }

  public toString(): string {
    const output = this.toArray()

    if (output?.length) {
      return output.map((part) => part.join(' ')).join('\n')
    }

    return ''
  }

  /**
   * @deprecated Use `toObject` instead.
   */
  public raw(): AddressObject {
    return this.toObject()
  }
}

export default PostalAddress
