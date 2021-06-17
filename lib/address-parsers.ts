import {
  AddressFormatPart,
  AddressOutputFormat,
  ParserInterface,
} from './types/address-format'

const objectParser: ParserInterface = (
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

const stringParser: ParserInterface = (
  object,
  format,
  useTransforms = true,
) => {
  const result: AddressOutputFormat = []
  return result
}

const addressParsers = {
  object: objectParser,
  string: stringParser,
}

export default addressParsers
