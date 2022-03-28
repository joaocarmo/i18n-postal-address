import type {
  AddFormatArgs,
  AddressObject,
  AddressOutputFormat,
  AddressOutputFormats,
  AvailableAddressFormat,
  FormatTypes,
  OutputFormat,
} from './address-format'

export default interface PostalAddressInterface {
  // Public methods
  addFormat({ country, format, parser, type }: AddFormatArgs): this
  setAddress(newValue: string): this
  setAddress1(newValue: string): this
  setAddress2(newValue: string): this
  setAddressNum(newValue: string): this
  setCity(newValue: string): this
  setCompanyName(newValue: string): this
  setCountry(newValue: string): this
  setDo(newValue: string): this
  setDong(newValue: string): this
  setFirstLastName(newValue: string): this
  setFirstName(newValue: string): this
  setGu(newValue: string): this
  setHonorific(newValue: string): this
  setJobTitle(newValue: string): this
  setLastName(newValue: string): this
  setPostalCode(newValue: string): this
  setPrefecture(newValue: string): this
  setProvince(newValue: string): this
  setRegion(newValue: string): this
  setRepublic(newValue: string): this
  setSecondLastName(newValue: string): this
  setSecondName(newValue: string): this
  setSi(newValue: string): this
  setState(newValue: string): this
  setTitle(newValue: string): this
  setOutputFormat(string: OutputFormat): this
  setFormat({
    country,
    type,
    useTransforms,
  }: {
    country?: string
    type?: FormatTypes
    useTransforms?: boolean
  }): this
  output<T extends AvailableAddressFormat>(
    overrideFormat: T,
  ): AddressOutputFormats[T] | null
  raw(): AddressObject
  toArray(): AddressOutputFormat
  toObject(): AddressObject
  toString(): string
}
