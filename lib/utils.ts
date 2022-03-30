import StringParser from './string-parser'
import PostalAddressError from './postal-address-error'
import objectInitialState from './object-initial-state'
import type {
  AcceptAddressFormat,
  AddressObject,
  Parsers,
  Validator,
} from './types/address-format'

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

export const parseStringToObject = (
  address: string,
  parser: Parsers,
): AddressObject => {
  const initialState: AddressObject = { ...objectInitialState }

  if (!STRING_PARSER_ENABLED) {
    throw new PostalAddressError(
      'This feature is not supported in your environment',
    )
  }

  if (!parser) {
    throw new PostalAddressError('No parser specified')
  }

  const worker = new StringParser({ parser })
  const output = worker.parse(address)

  return { ...initialState, ...output }
}

export const parseValidator = <K = string>(
  oldValue: K,
  newValue: K,
  validatorFn: Validator<K>,
): K => {
  if (typeof validatorFn === 'function') {
    if (validatorFn(newValue)) {
      return newValue
    }
    return oldValue
  }

  return newValue
}

export const containsValidTokens = (
  format: AcceptAddressFormat,
  parser = 'array',
): boolean =>
  parser === 'array' && Array.isArray(format)
    ? format.every((row) =>
        row.every((cell) => {
          const attribute = typeof cell === 'object' ? cell.attribute : cell
          return allowedTokens.includes(attribute as string)
        }),
      )
    : false

export const isValidFormat = (
  format: AcceptAddressFormat,
  parser = 'array',
): boolean => {
  if (parser === 'array') {
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
  }
  return false
}
