import { AddressObject } from './address-format'

export default interface PostalAddressInterface {
  // Public methods
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
  setOutputFormat(string: string): this
  setFormat(
    {
      country,
      type,
      useTransforms,
    }: { country: string, type: string, useTransforms: boolean },
  ): this
  toString(): string
  raw(): AddressObject
}
