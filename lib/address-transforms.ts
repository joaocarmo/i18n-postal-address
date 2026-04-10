import type { TransformFunction } from './types/address-format.js'

export const addCommaAfter: TransformFunction = (string) => {
  if (string && typeof string === 'string') {
    return `${string},`
  }

  return string
}

export const capitalize: TransformFunction = (string) => {
  if (typeof string === 'string') {
    return string.toUpperCase()
  }

  return string
}

export const capitalizeWhenTwo: TransformFunction = (string) => {
  if (string && typeof string === 'string' && string.length === 2) {
    return string.toUpperCase()
  }

  return string
}

export const pascalCase: TransformFunction = (string) => {
  if (typeof string === 'string') {
    return string.replace(
      /(\w)(\w*)/g,
      (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
    )
  }

  return string
}
