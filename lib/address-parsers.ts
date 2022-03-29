import type { PostalLabels, PostalResult } from 'node-postal'
import type { ParserMap } from './address-mappings'
import type {
  AddressFormatPart,
  AddressOutputFormat,
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
  const output: ParserOutput = {}

  result.forEach((entry) => {
    const { component, value } = entry

    if (component in mapping) {
      const mappedKeys = mapping[component]
      mappedKeys.forEach((key) => {
        output[key] = value || ''
      })
    }
  })

  return output
}

export default addressParsers
