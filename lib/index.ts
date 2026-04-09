import PostalAddress from './postal-address.js'
import type { AddressFormats } from './types/address-format.js'
import * as formats from './formats/index.js'
import type * as PostalAddressType from './types/address-format.js'

const addressFormats: AddressFormats = { ...formats }

// Export the PostalAddress main class
export default PostalAddress

// Export the address formats
export { addressFormats }

// Export the inner types
export type { PostalAddressType }
