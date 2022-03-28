export interface AddressObject {
  address1: string
  address2: string
  addressNum: string
  city: string
  companyName: string
  country: string
  countryAlpha2: string
  do: string
  dong: string
  firstLastName: string
  firstName: string
  gu: string
  honorific: string
  jobTitle: string
  lastName: string
  postalCode: string
  prefecture: string
  province: string
  region: string
  republic: string
  secondLastName: string
  secondName: string
  si: string
  state: string
  title: string
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
