import { capitalize } from '../lib/address-transforms'

it('should accept "string" to equal "STRING"', () => {
  expect(capitalize('string')).toBe('STRING')
})
