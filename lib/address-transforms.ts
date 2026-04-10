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

export const capitalizeWhenTwo: TransformFunction = (value) => {
  if (value && typeof value === 'string' && value.length === 2) {
    return value.toUpperCase()
  }

  return value
}

export const pascalCase: TransformFunction = (value) => {
  if (typeof value === 'string') {
    return value.replace(
      /(\w)(\w*)/g,
      (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
    )
  }

  return value
}
