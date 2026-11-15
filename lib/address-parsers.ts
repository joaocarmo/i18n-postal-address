import type {
  AddressFormatPart,
  AddressOutputFormat,
  ParserInterface,
} from './types/address-format.js'

const arrayParser: ParserInterface = (object, format, useTransforms = true) => {
  const result: AddressOutputFormat = []

  if (Array.isArray(format)) {
    format.forEach((line: AddressFormatPart[]) => {
      const subResult: string[] = []
      // A comma that a transform added after the last part has nothing to separate.
      let endsWithAddedComma = false

      if (Array.isArray(line)) {
        line.forEach((part: AddressFormatPart) => {
          if (typeof part === 'string') {
            if (object[part]) {
              subResult.push(object[part])
              endsWithAddedComma = false
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
                endsWithAddedComma =
                  value.endsWith(',') && !object[part.attribute]?.endsWith(',')
              }
            }
          }
        })
      }
      if (endsWithAddedComma) {
        subResult.push(subResult.pop()!.slice(0, -1))
      }
      if (subResult.length > 0) {
        result.push(subResult)
      }
    })
  }

  return result
}

export default arrayParser
