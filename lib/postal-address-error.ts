export default class PostalAddressError extends Error {
  constructor(...args: string[]) {
    super(...args)

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PostalAddressError)
    }

    this.name = 'PostalAddressError'
  }
}
