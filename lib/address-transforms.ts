import { TransformFunction } from './types/address-format'

// eslint-disable-next-line import/prefer-default-export
export const capitalize: TransformFunction = (string) => {
  if (typeof string === 'string') {
    return string.toUpperCase()
  }
  return ''
}
