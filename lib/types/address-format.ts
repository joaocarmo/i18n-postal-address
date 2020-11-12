export interface AddressObject {
  [key: string]: string
}

export interface TransformFunction {
  (string: string): string
}

export interface AddressFormatOptions {
  attribute: string
  transforms?: TransformFunction[]
}

export type AddressFormatPart = string | AddressFormatOptions

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
