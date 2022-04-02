import type { PostalLabels, PostalResult } from 'node-postal'
import { pascalCase } from './address-transforms'
import type { ParserMap } from './address-mappings'
import type {
  AddressFormatPart,
  AddressOutputFormat,
  AddressParts,
  ParserInterface,
  ParserOutput,
} from './types/address-format'

const arrayParser: ParserInterface<'array'> = (
  object,
  format,
  useTransforms = true,
) => {
  const result: AddressOutputFormat = []

  if (Array.isArray(format)) {
    format.forEach((line: AddressFormatPart[]) => {
      const subResult: string[] = []

      if (Array.isArray(line)) {
        line.forEach((part: AddressFormatPart) => {
          if (typeof part === 'string') {
            if (object[part]) {
              subResult.push(object[part])
            }
          } else if (typeof part === 'object') {
            if (typeof part.attribute === 'string') {
              let value = object[part.attribute]

              if (useTransforms) {
                if (Array.isArray(part.transforms)) {
                  part.transforms.forEach((transform) => {
                    if (typeof transform === 'function') {
                      value = transform(value)
                    }
                  })
                }
              }
              if (value) {
                subResult.push(value)
              }
            }
          }
        })
      }
      if (subResult.length > 0) {
        result.push(subResult)
      }
    })
  }

  return result
}

const addressParsers = {
  array: arrayParser,
  string: null,
}

export const parseLibpostal = (
  mapping: ParserMap<PostalLabels>,
  result: PostalResult[],
): ParserOutput => {
  const ADDRESS_DELIMITER = ' '
  const output: ParserOutput = {}
  const keys = Object.keys(mapping) as AddressParts[]

  keys.forEach((key) => {
    const addressPart = mapping[key].reduce(
      (acc: string[], label: PostalLabels) => {
        const addressFound = result.find(
          ({ component, value }) => component === label && value,
        )

        if (addressFound) {
          // Uses an heuristic to determine if we should PascalCase the value
          const value =
            addressFound.value.length > 3
              ? pascalCase(addressFound.value)
              : addressFound.value
          acc.push(value)
        }

        return acc
      },
      [],
    )

    output[key] = addressPart.join(ADDRESS_DELIMITER)
  })

  return output
}

export default addressParsers
