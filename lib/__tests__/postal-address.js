import PostalAddress from '../postal-address'

describe('Postal Address', () => {
  let myAddressPersonal = null
  let myAddressBusiness = null
  const expectedOutputPT = `\
Portugal
Porto
Happy Park
Edifício 4, Piso 2
SmartShoes Portugal, Lda.\
`
  const expectedOutputUSWithoutTransforms = `\
123 Nevermore Rd
Austin TX 78752\
`
  const expectedOutputUSWithTransforms = `\
123 Nevermore Rd
Austin, TX 78752\
`

  it('should be a valid constructor', () => {
    expect(() => {
      myAddressPersonal = new PostalAddress()
    }).not.toThrow()
    expect(() => {
      myAddressBusiness = new PostalAddress()
    }).not.toThrow()
  })

  it('should output a valid formatted postal address (PT)', () => {
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

    expect(myAddressBusiness.toString()).toBe(expectedOutputPT)
  })

  it('should output a valid formatted postal address (US)', () => {
    myAddressPersonal
      .setAddress1('123 Nevermore Rd')
      .setCity('Austin')
      .setState('TX')
      .setPostalCode('78752')
      .setOutputFormat('array')
      .setFormat({
        country: 'US',
        type: 'personal',
        useTransforms: false,
      })

    expect(myAddressPersonal.toString()).toBe(expectedOutputUSWithoutTransforms)

    myAddressPersonal.setFormat({
      country: 'US',
      type: 'personal',
      useTransforms: true,
    })
    expect(myAddressPersonal.toString()).toBe(expectedOutputUSWithTransforms)
  })
})
