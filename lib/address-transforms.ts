import type { TransformFunction } from './types/address-format'

export const addCommaAfter: TransformFunction = (string) => {
  const comma = ','

  if (string && typeof string === 'string') {
    return `${string}${comma}`
  }

  return ''
}

export const capitalize: TransformFunction = (string) => {
  if (typeof string === 'string') {
    return string.toUpperCase()
  }

  return ''
}
