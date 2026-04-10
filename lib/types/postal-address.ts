import type {
  AcceptAddressFormat,
  AddFormatArgs,
  AddressObject,
  AddressOutputFormat,
  FormatTypes,
} from './address-format.js'

export default interface PostalAddressInterface {
  addFormat({ country, format, parser, type }: AddFormatArgs): this
  fromObject(presetState: Partial<AddressObject>): this
  getAddressFormat({
    country,
    type,
  }: {
    country: string
    type?: FormatTypes
  }): AcceptAddressFormat | null
  setAdditionalName(newValue: string): this
  setAddress(newValue: string): this
  setAddress1(newValue: string): this
  setAddress2(newValue: string): this
  setAddressNum(newValue: string): this
  setCareOf(newValue: string): this
  setCity(newValue: string): this
  setCompanyName(newValue: string): this
  setCountry(newValue: string): this
  setDo(newValue: string): this
  setDong(newValue: string): this
  setFamilyName(newValue: string): this
  setFirstFamilyName(newValue: string): this
  setGivenName(newValue: string): this
  setGu(newValue: string): this
  setHonorificPrefix(newValue: string): this
  setHonorificSuffix(newValue: string): this
  setJobTitle(newValue: string): this
  setPostalCode(newValue: string): this
  setPrefecture(newValue: string): this
  setProvince(newValue: string): this
  setRegion(newValue: string): this
  setRepublic(newValue: string): this
  setSecondFamilyName(newValue: string): this
  setSi(newValue: string): this
  setState(newValue: string): this
  setTitle(newValue: string): this
  setPropagation(propagate: boolean): this
  setFormat({
    country,
    type,
    useTransforms,
  }: {
    country?: string
    type?: FormatTypes
    useTransforms?: boolean
  }): this
  toArray(): AddressOutputFormat
  toObject(): AddressObject
  toString(): string
}
