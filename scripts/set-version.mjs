#!/usr/bin/env node

// Sets the version in package.json from a release tag name, such as v1.2.3.
// Validates the tag before it writes the file.

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// SemVer 2.0 without build metadata: https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
// npm drops build metadata on publish.
const SEMVER =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?$/

function fail(message) {
  console.error(message)
  process.exit(1)
}

const tag = process.argv[2]

if (tag === undefined) {
  fail('Usage: node scripts/set-version.mjs <tag>, such as v1.2.3')
}

const version = tag.replace(/^v/, '')

if (!SEMVER.test(version)) {
  fail(
    `"${tag}" is not a SemVer version without build metadata, such as v1.2.3`,
  )
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pkgFile = resolve(root, 'package.json')

const pkg = JSON.parse(readFileSync(pkgFile, 'utf8'))

pkg.version = version
writeFileSync(pkgFile, `${JSON.stringify(pkg, null, 2)}\n`)

console.log(`Version set to ${version}`)
