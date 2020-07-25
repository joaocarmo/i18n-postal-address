import { capitalize } from '../address-transforms'

describe('Address Transforms', () => {
  it('should accept "string" and output "STRING"', () => {
    expect(capitalize('string')).toBe('STRING')
  })
})
