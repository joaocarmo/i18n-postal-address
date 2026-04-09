import PostalAddressError from './postal-address-error.js'
import type PostalAddressInterface from './types/postal-address.js'
import type {
  AcceptAddressFormat,
  AddFormatArgs,
  AddressFormats,
  AddressObject,
  AddressOutputFormat,
  ClassProperties,
  FormatTypes,
  PostalAddressOptions,
} from './types/address-format.js'
import arrayParser from './address-parsers.js'
import {
  constructInitialObject,
  containsValidTokens,
  isValidFormat,
} from './utils.js'
import untypedCountries from './data/countries.json' with { type: 'json' }

const countries: Record<string, string> = untypedCountries

class PostalAddress implements PostalAddressInterface {
  private formatForCountry: string

  private formatForType: FormatTypes

  private useTransforms: boolean

  private object: AddressObject

  private allowed: {
    [key in keyof ClassProperties]: ClassProperties[key][]
  }

  private addressFormats: AddressFormats

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

    this.formatForCountry = defaultFormat ?? formatKeys[0]
    this.formatForType = 'default'
    this.useTransforms = true
    this.object = constructInitialObject()
    this.allowed = {
      formatForCountry: formatKeys,
      formatForType: ['business', 'default', 'english', 'french', 'personal'],
    }
    this.addressFormats = formats
  }

  private getFormat(): AcceptAddressFormat | null {
    const { formatForCountry, formatForType, addressFormats } = this
    const formatsAvailable = addressFormats[formatForCountry]

    if (!formatsAvailable) {
      return null
    }

    const outputType =
      formatsAvailable?.[formatForType] || formatsAvailable?.default

    return outputType?.array ?? null
  }

  private format(): AddressOutputFormat | null {
    const format = this.getFormat()

    if (format) {
      return arrayParser(this.object, format, this.useTransforms)
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

  public setFirstFamilyName(newValue: string): this {
    this.setProperty('firstFamilyName', newValue)
    return this
  }

  public setGivenName(newValue: string): this {
    this.setProperty('givenName', newValue)
    return this
  }

  public setGu(newValue: string): this {
    this.setProperty('gu', newValue)
    return this
  }

  public setHonorificPrefix(newValue: string): this {
    this.setProperty('honorificPrefix', newValue)
    return this
  }

  public setJobTitle(newValue: string): this {
    this.setProperty('jobTitle', newValue)
    return this
  }

  public setFamilyName(newValue: string): this {
    this.setProperty('familyName', newValue)

    if (this.propagateToRelatedProperties) {
      this.setProperty('secondFamilyName', newValue)
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

  public setSecondFamilyName(newValue: string): this {
    this.setProperty('secondFamilyName', newValue)

    if (this.propagateToRelatedProperties) {
      this.setProperty('familyName', newValue)
    }
    return this
  }

  public setAdditionalName(newValue: string): this {
    this.setProperty('additionalName', newValue)
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

  /** @deprecated Use `setGivenName` instead */
  public setFirstName(newValue: string): this {
    return this.setGivenName(newValue)
  }

  /** @deprecated Use `setFamilyName` instead */
  public setLastName(newValue: string): this {
    return this.setFamilyName(newValue)
  }

  /** @deprecated Use `setAdditionalName` instead */
  public setSecondName(newValue: string): this {
    return this.setAdditionalName(newValue)
  }

  /** @deprecated Use `setFirstFamilyName` instead */
  public setFirstLastName(newValue: string): this {
    return this.setFirstFamilyName(newValue)
  }

  /** @deprecated Use `setSecondFamilyName` instead */
  public setSecondLastName(newValue: string): this {
    return this.setSecondFamilyName(newValue)
  }

  /** @deprecated Use `setHonorificPrefix` instead */
  public setHonorific(newValue: string): this {
    return this.setHonorificPrefix(newValue)
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
    return this.format() || []
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
}

export default PostalAddress
