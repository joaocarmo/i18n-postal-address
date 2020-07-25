import PostalAddress from '../postal-address'

describe('Postal Address', () => {
  it('the default exposed method is a constructor', () => {
    expect(() => {
      const myPostalAddress = new PostalAddress()
    }).not.toThrow()
  })
})
