const arrayParser = (object, format, useTransforms = true) => {
  const result = []

  if (Array.isArray(format)) {
    format.forEach((line) => {
      const subResult = []

      if (Array.isArray(line)) {
        line.forEach((part) => {
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

// eslint-disable-next-line no-unused-vars
const stringParser = (object, format, useTransforms = true) => ''

const addressParsers = {
  array: arrayParser,
  string: stringParser,
}

export default addressParsers
