import objectInitialState from '../object-initial-state'

describe('Object Initial State', () => {
  it("should start with all keys' values as empty strings", () => {
    const keys = Object.keys(objectInitialState)
    const numKeys = keys.length
    const numEmptyStrs = keys.reduce((acc, val) => {
      if (typeof objectInitialState[val] === 'string'
      && !objectInitialState[val]) {
        return acc + 1
      }
      return acc
    }, 0)

    expect(numEmptyStrs).toBe(numKeys)
  })
})
