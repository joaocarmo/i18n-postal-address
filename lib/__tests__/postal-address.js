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

  it('', () => {
    myAddressBusiness.setAddress1('Happy Park')
    myAddressBusiness.setAddress2('Edifício 4, Piso 2')
    myAddressBusiness.setCity('Porto')
    myAddressBusiness.setCompanyName('SmartShoes Portugal, Lda.')
    myAddressBusiness.setCountry('Portugal')
    myAddressBusiness.setPostalCode('4000-123')
    myAddressBusiness.setOutputFormat('array')
    myAddressBusiness.setFormat({
      country: 'RU',
      type: 'business',
    })

    expect(myAddressBusiness.toString()).toBe(expectedOutput)
  })
})
