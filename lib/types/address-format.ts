export interface AddressObject {
  [key: string]: string;
}

export interface TransformFunction {
  (string: string): string;
}

export interface AddressFormatOptions {
  attribute?: string;
  transforms?: TransformFunction[];
}

export type AddressFormatPart = string | AddressFormatOptions

export type AddressFormat = AddressFormatPart[][]

export interface AddressFormats {
  [key: string]: {
    [key: string]: {
      array: AddressFormat,
      string?: string,
    }
  }
}

export type AddressOutputFormat = string[][]
