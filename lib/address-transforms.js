// eslint-disable-next-line import/prefer-default-export
export const capitalize = (string) => {
  if (typeof string === 'string') {
    return string.toUpperCase()
  }
  return ''
}
