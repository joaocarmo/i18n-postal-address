import PostalAddress from '../postal-address'

describe('Postal Address', () => {
  let myAddressBusiness = null
  const expectedOutput = `\
Portugal
Porto
Happy Park
Edifício 4, Piso 2
SmartShoes Portugal, Lda.\
`

  it('should be a valid constructor', () => {
    expect(() => {
      myAddressBusiness = new PostalAddress()
    }).not.toThrow()
  })

  it('should output a valid formatted postal address', () => {
    myAddressBusiness
      .setAddress1('Happy Park')
      .setAddress2('Edifício 4, Piso 2')
      .setCity('Porto')
      .setCompanyName('SmartShoes Portugal, Lda.')
      .setCountry('Portugal')
      .setPostalCode('4000-123')
      .setOutputFormat('array')
      .setFormat({
        country: 'RU',
        type: 'business',
      })

    expect(myAddressBusiness.toString()).toBe(expectedOutput)
  })
})
