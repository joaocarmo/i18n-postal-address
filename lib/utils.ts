import { AddressFormatPart } from './types/address-format'

// eslint-disable-next-line import/prefer-default-export
export const isValidFormat = (
  format: AddressFormatPart[][], parser = 'array',
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
