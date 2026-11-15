import type { TransformFunction } from './types/address-format.js'

export const addCommaAfter: TransformFunction = (value) => {
  if (value && typeof value === 'string') {
    return `${value},`
  }

  return value
}

export const capitalize: TransformFunction = (value) => {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }

  return value
}
