export interface AddFormatArgs {
  country: string
  format: AddressFormatPart[][]
  parser?: string
  type?: string
}

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
}

export interface AddressFormats {
  [key: string]: {
    [key: string]: AddressFormat
  }
}

export type AddressOutputFormat = string[][]

export interface Countries {
  [key: string]: string
}

export interface ParserInterface {
  (
    object: AddressObject,
    format: AddressFormatPart[][],
    useTransforms: boolean,
  ): AddressOutputFormat
}

export interface Validator {
  (string: string): boolean
}
