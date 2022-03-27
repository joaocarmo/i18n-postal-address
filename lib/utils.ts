import objectInitialState from './object-initial-state'
import type { AddressFormatPart } from './types/address-format'

export const allowedTokens = Object.keys(objectInitialState)

export const containsValidTokens = (
  format: AddressFormatPart[][],
  parser = 'array',
): boolean =>
  parser === 'array'
    ? format.every((row) =>
        row.every((cell) => {
          const attribute = typeof cell === 'object' ? cell.attribute : cell
          return allowedTokens.includes(attribute as string)
        }),
      )
    : false

export const isValidFormat = (
  format: AddressFormatPart[][],
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
