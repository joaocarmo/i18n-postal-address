const arrayParser = (object, format) => {
  const result = []

  if (Array.isArray(format)) {
    format.forEach((line) => {
      const subResult = []

      if (Array.isArray(line)) {
        line.forEach((part) => {
          if (object[part]) {
            subResult.push(object[part])
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

const stringParser = (object, format) => {
  return ''
}

const addressParsers = {
  array: arrayParser,
  string: stringParser,
}

export default addressParsers
