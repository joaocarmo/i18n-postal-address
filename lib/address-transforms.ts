import type { TransformFunction } from './types/address-format.js'

export const addCommaAfter: TransformFunction = (value) => {
  if (value && typeof value === 'string') {
    return `${value},`
  }

  return value
}

export const omitIfSameAsCity: TransformFunction = (value, address) => {
  if (
    typeof value === 'string' &&
    value.normalize().trim().toLowerCase() ===
      address?.city?.normalize().trim().toLowerCase()
  ) {
    return ''
  }

  return value
}

// A full Argentine postal code (CPA), such as C1043AAZ, already encodes the province.
export const omitIfArgentineCpa: TransformFunction = (value, address) => {
  if (/^[A-Z]\d{4}[A-Z]{3}$/i.test(address?.postalCode?.trim() ?? '')) {
    return ''
  }

  return value
}

export const capitalize: TransformFunction = (value) => {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }

  return value
}

/**
 * @deprecated No built-in format uses it. The next major version removes it.
 * Use a custom transform function instead.
 */
export const capitalizeWhenTwo: TransformFunction = (value) => {
  if (value && typeof value === 'string' && value.length === 2) {
    return value.toUpperCase()
  }

  return value
}

/**
 * @deprecated No built-in format uses it. The next major version removes it.
 * Use a custom transform function instead.
 */
export const pascalCase: TransformFunction = (value) => {
  if (typeof value === 'string') {
    return value.replace(
      /(\w)(\w*)/g,
      (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
    )
  }

  return value
}
