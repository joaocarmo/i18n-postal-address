import PostalAddress from './postal-address.js'
import type { AddressFormats } from './types/address-format.js'
import * as formats from './formats/index.js'
import type * as PostalAddressType from './types/address-format.js'

const addressFormats: AddressFormats = { ...formats }

export default PostalAddress
export { addressFormats }
export { default as PostalAddressError } from './postal-address-error.js'
export type { PostalAddressType }
