export type AddressParts =
  | 'additionalName'
  | 'address1'
  | 'address2'
  | 'addressNum'
  | 'careOf'
  | 'city'
  | 'companyName'
  | 'country'
  | 'countryAlpha2'
  | 'do'
  | 'dong'
  | 'familyName'
  | 'firstFamilyName'
  | 'givenName'
  | 'gu'
  | 'honorificPrefix'
  | 'honorificSuffix'
  | 'jobTitle'
  | 'postalCode'
  | 'prefecture'
  | 'province'
  | 'region'
  | 'republic'
  | 'secondFamilyName'
  | 'si'
  | 'state'
  | 'title'

export type Address = {
  [key in AddressParts]: string
}

export interface AddressObject extends Address {
  [key: string]: string
}

export interface TransformFunction {
  (string: string): string
}

export interface AddressFormatOptions {
  attribute: keyof AddressObject
  transforms?: TransformFunction[]
}

export type AddressFormatPart = keyof AddressObject | AddressFormatOptions

export interface AddressFormat {
  array?: AddressFormatPart[][]
}

export type AcceptAddressFormat = AddressFormat[keyof AddressFormat]

export interface AddFormatArgs {
  country: string
  format: AcceptAddressFormat
  parser?: string
  type?: string
}

export interface AddressFormats {
  [key: string]: {
    [key: string]: AddressFormat
  }
}

export type AddressOutputFormat = string[][]

export interface ParserInterface {
  (
    object: AddressObject,
    format: AcceptAddressFormat,
    useTransforms: boolean,
  ): AddressOutputFormat
}

export type FormatTypes =
  | 'business'
  | 'default'
  | 'english'
  | 'french'
  | 'personal'

export type ClassProperties = {
  formatForCountry: string
  formatForType: FormatTypes
}

export interface PostalAddressOptions {
  formats: AddressFormats
  defaultFormat?: string
}
