# Architecture

This file is a map of the source code. It says where things live and how an address goes from its parts to the output.

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, build and tests.

## How an address is written

1. The constructor of `PostalAddress` (`lib/postal-address.ts`) takes the formats to use and a default country. It checks them and starts with every address part empty (`object-initial-state.ts`).
2. Each `set*()` method stores 1 part of the address. Values that are not strings are ignored. While propagation is on (`setPropagation()`), some setters also fill a related part, such as `setCity()` for `si` or `setCountry()` for `countryAlpha2`, using `data/countries.ts`.
3. `setFormat()` picks the country, the format type (`default`, `business`, `english`, `french` or `personal`) and whether the transforms run. `addFormat()` adds or replaces a format after checking it (`utils.ts`).
4. `toArray()` takes the format for the chosen country and type, or the country's `default` format when that type does not exist. It passes the format to `arrayParser()` (`address-parsers.ts`). The parser walks the format line by line, reads each part from the address, applies the part's transforms and leaves out empty parts and empty lines.
5. `toString()` joins the parts of a line with spaces and the lines with new lines.

## Modules

Each module in `lib/` has 1 job:

- `index.ts`: the public exports.
- `postal-address.ts`: the `PostalAddress` class.
- `postal-address-error.ts`: the error class.
- `address-parsers.ts`: `arrayParser()`, which turns a format and an address into lines.
- `address-transforms.ts`: the transforms a format can apply to a part, such as `capitalize`.
- `formats/index.ts`: the formats of each country, 1 export per ISO 3166-1 alpha-2 code. The package also exports them as `i18n-postal-address/formats`.
- `data/countries.ts`: country names and their ISO 3166-1 alpha-2 codes.
- `object-initial-state.ts`: every address part, empty.
- `utils.ts`: format checks and the initial address object.
- `types/`: the public types.

## Invariants

- `lib/` has no runtime dependency and does no I/O. Only `scripts/` uses the network.
- Formats are plain data. `package.json` sets `sideEffects: false`, so `formats/index.ts` must stay free of side effects for tree-shaking.
- The package is ESM-only. `dist/` must run on the oldest Node.js version that `engines` allows.

## Scripts

The scripts in `scripts/` compare the built-in formats with Google's data. `pnpm formats:update` runs them in this order:

1. `fetch-google-formats.ts`: downloads Google's data into `scripts/.cache/`.
2. `transform-google-formats.ts`: turns it into the library's format.
3. `diff-formats.ts`: compares the result with `lib/formats/index.ts` and prints the differences.

## Tests

- Unit tests sit next to their module, in files named after it: `<module>.test.ts`. The tests of a script sit next to the script.
- The functional test lives in `test/functional/`. It tests the built package in `dist/`, with its own Vitest config (`vitest.functional.config.ts`).
- The smoke test lives in `test/smoke/`. It is a plain `node` script with no dependencies that imports the package by name, so it also checks `exports`, and runs `dist/` on older Node.js versions. `CONTRIBUTING.md` lists the versions.
