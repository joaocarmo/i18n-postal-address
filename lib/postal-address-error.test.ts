import PostalAddressError from './postal-address-error'

describe('PostalAddressError', () => {
  it('should set the name and the message', () => {
    const error = new PostalAddressError('message')

    expect(error).toBeInstanceOf(Error)
    expect(error.name).toBe('PostalAddressError')
    expect(error.message).toBe('message')
  })

  it('should work where Error.captureStackTrace does not exist', () => {
    const { captureStackTrace } = Error

    try {
      // @ts-expect-error: some JavaScript engines have no captureStackTrace
      delete Error.captureStackTrace

      expect(new PostalAddressError('message').name).toBe('PostalAddressError')
    } finally {
      Error.captureStackTrace = captureStackTrace
    }
  })
})
