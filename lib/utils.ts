import objectInitialState from './object-initial-state.js'
import type {
  AcceptAddressFormat,
  AddressObject,
} from './types/address-format.js'

export const allowedTokens = Object.keys(objectInitialState)

export const constructInitialObject = (
  presetState?: Partial<AddressObject>,
): AddressObject => {
  const initialState: AddressObject = { ...objectInitialState }
  const entries = Object.entries(presetState || {})

  entries.forEach(([key, value]) => {
    if (key in initialState && typeof value === 'string') {
      initialState[key] = value
    }
  })

  return initialState
}

export const containsValidTokens = (format: AcceptAddressFormat): boolean =>
  Array.isArray(format)
    ? format.every((row) =>
        row.every((cell) => {
          const attribute = typeof cell === 'object' ? cell.attribute : cell
          return allowedTokens.includes(attribute as string)
        }),
      )
    : false

export const isValidFormat = (format: AcceptAddressFormat): boolean => {
  if (Array.isArray(format)) {
    const [row] = format

    if (Array.isArray(row)) {
      const [cell] = row

      if (typeof cell === 'string') {
        return true
      }

      if (typeof cell === 'object' && typeof cell.attribute === 'string') {
        return true
      }
    }
  }
  return false
}
