import type {
  AddressFormatPart,
  AddressOutputFormat,
  ParserInterface,
} from './types/address-format.js'

const arrayParser: ParserInterface = (object, format, useTransforms = true) => {
  const result: AddressOutputFormat = []
  // Transforms get a copy, so one that writes to it leaves the caller's address unchanged.
  const address = { ...object }

  if (Array.isArray(format)) {
    format.forEach((line: AddressFormatPart[]) => {
      const subResult: string[] = []
      // A comma that a transform added after the last part has nothing to separate.
      let lastWithoutComma: string | undefined

      if (Array.isArray(line)) {
        line.forEach((part: AddressFormatPart) => {
          if (typeof part === 'string') {
            if (object[part]) {
              subResult.push(object[part])
              lastWithoutComma = undefined
            }
          } else if (typeof part === 'object') {
            if (typeof part.attribute === 'string') {
              let value = object[part.attribute]

              if (useTransforms) {
                if (Array.isArray(part.transforms)) {
                  part.transforms.forEach((transform) => {
                    if (typeof transform === 'function') {
                      value = transform(value, address)
                    }
                  })
                }
              }
              if (value) {
                subResult.push(value)
                lastWithoutComma =
                  value.endsWith(',') && !object[part.attribute]?.endsWith(',')
                    ? value.slice(0, -1)
                    : undefined
              }
            }
          }
        })
      }
      if (lastWithoutComma !== undefined) {
        subResult[subResult.length - 1] = lastWithoutComma
      }
      if (subResult.length > 0) {
        result.push(subResult)
      }
    })
  }

  return result
}

export default arrayParser
