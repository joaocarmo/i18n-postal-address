import type {
  AddressFormatPart,
  AddressOutputFormat,
  ParserInterface,
} from './types/address-format.js'

const arrayParser: ParserInterface = (object, format, useTransforms = true) => {
  const result: AddressOutputFormat = []
  // A frozen copy: a transform can't change the caller's address or what later transforms see.
  const address = Object.freeze({ ...object })

  if (Array.isArray(format)) {
    format.forEach((line: AddressFormatPart[]) => {
      const subResult: string[] = []
      // A comma that a transform added after the last part has nothing to separate.
      let lastWithoutComma: string | undefined
      // A separator joins a part to the part before it. An empty part with a separator keeps the join going.
      let previousPrinted = false

      if (Array.isArray(line)) {
        line.forEach((part: AddressFormatPart) => {
          if (typeof part === 'string') {
            const value = object[part]
            previousPrinted = Boolean(value)
            if (value) {
              subResult.push(value)
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
                const printed =
                  typeof part.separator === 'string' && previousPrinted
                    ? `${subResult.pop()}${part.separator}${value}`
                    : value
                subResult.push(printed)
                lastWithoutComma =
                  value.endsWith(',') && !object[part.attribute]?.endsWith(',')
                    ? printed.slice(0, -1)
                    : undefined
              }
              previousPrinted =
                Boolean(value) ||
                (typeof part.separator === 'string' && previousPrinted)
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
