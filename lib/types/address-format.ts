export type AddressParts =
  | 'address1'
  | 'address2'
  | 'addressNum'
  | 'city'
  | 'companyName'
  | 'country'
  | 'countryAlpha2'
  | 'do'
  | 'dong'
  | 'firstLastName'
  | 'firstName'
  | 'gu'
  | 'honorific'
  | 'jobTitle'
  | 'lastName'
  | 'postalCode'
  | 'prefecture'
  | 'province'
  | 'region'
  | 'republic'
  | 'secondLastName'
  | 'secondName'
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
  string?: string
}

export type AcceptAddressFormat = AddressFormat[keyof AddressFormat]

export type AvailableAddressFormat = keyof AddressFormat

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

export type AddressOutputFormats = {
  array: AddressOutputFormat
  string: string
}

export interface ParserInterface<T extends keyof AddressOutputFormats> {
  (
    object: AddressObject,
    format: AcceptAddressFormat,
    useTransforms: boolean,
  ): AddressOutputFormats[T]
}

export interface Validator<K = string> {
  (string: K): boolean
}

export type OutputFormat = keyof AddressOutputFormats

export type FormatTypes =
  | 'business'
  | 'default'
  | 'english'
  | 'french'
  | 'personal'

export type ClassProperties = {
  formatForCountry: string
  formatForType: FormatTypes
  outputFormat: OutputFormat
}

export type ParserOutput = Partial<{
  [key in AddressParts]: string
}>

export type Parsers = '' | 'libpostal'
