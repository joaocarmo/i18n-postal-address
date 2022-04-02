import type { PostalLabels, PostalResult } from 'node-postal'
import { pascalCase } from './address-transforms'
import type { LabelConfig, ParserMap } from './address-mappings'
import type {
  AddressFormatPart,
  AddressOutputFormat,
  AddressParts,
  ParserInterface,
  ParserOutput,
  TransformFunction,
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
      (acc: string[], label: LabelConfig<PostalLabels>) => {
        let addressValue = ''
        let transformFn: TransformFunction = (value) => value

        result.forEach(({ component, value }) => {
          if (typeof label === 'string') {
            addressValue = component === label ? value : addressValue
          }
          if (
            typeof label === 'object' &&
            typeof label.attribute === 'string'
          ) {
            addressValue = component === label.attribute ? value : addressValue
            transformFn = label.transform
          }
        })

        if (addressValue) {
          const value = transformFn(pascalCase(addressValue))
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
