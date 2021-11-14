import { addCommaAfter, capitalize } from '../address-transforms'

describe('Address Transforms: addCommaAfter', () => {
  it('should accept "string" and output "string,"', () => {
    expect(addCommaAfter('string')).toBe('string,')
  })

  it('should do nothing if empty', () => {
    expect(addCommaAfter('')).toBe('')
  })
})

describe('Address Transforms: capitalize', () => {
  it('should accept "string" and output "STRING"', () => {
    expect(capitalize('string')).toBe('STRING')
  })

  it('should do nothing if empty', () => {
    expect(capitalize('')).toBe('')
  })
})
