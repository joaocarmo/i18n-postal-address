// Runs the built package with plain node on older Node.js versions. Imports it
// by name, so Node.js resolves it through the package.json `exports`. Needs
// `pnpm build` first.
import assert from 'node:assert/strict'
import PostalAddress, {
  PostalAddressError,
  addressFormats,
} from 'i18n-postal-address'
import * as formats from 'i18n-postal-address/formats'

const { NODE_MAJOR } = process.env

if (NODE_MAJOR) {
  assert.ok(
    process.versions.node.startsWith(`${NODE_MAJOR}.`),
    `expected Node.js ${NODE_MAJOR}, got ${process.version}`,
  )
}

assert.deepEqual(
  Object.keys(formats).sort(),
  Object.keys(addressFormats).sort(),
  'the formats entry point and addressFormats differ',
)

const address = new PostalAddress({ formats, defaultFormat: 'US' })
  .setCompanyName('Deutscher Bundestag')
  .setAddress1('Platz der Republik 1')
  .setCity('Berlin')
  .setCountry('Germany')
  .setPostalCode('11011')
  .setFormat({ country: 'DE', type: 'business' })

assert.equal(
  address.toString(),
  'Deutscher Bundestag\nPlatz der Republik 1\n11011 Berlin\nGERMANY',
)

assert.throws(() => new PostalAddress({ formats: {} }), PostalAddressError)

console.log(`Smoke test passed on Node.js ${process.version}`)
