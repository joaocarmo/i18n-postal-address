# Contributing

Use the Node.js version in `.nvmrc` (Node.js 26). Install [pnpm][pnpm], which Node.js 25 and later no longer include, then run `pnpm install`.

## Checks

Run these before you open a PR. CI runs the same checks.

```sh
pnpm build
pnpm test:coverage    # unit tests; coverage of lib/ must stay at 100%
pnpm test:functional  # type checks and runs the test against dist/
pnpm test:smoke       # runs dist/ with plain node
pnpm lint
pnpm type-check
pnpm pretty
```

`pnpm test:unit` runs the unit tests without coverage, so a filtered run such as `pnpm test:unit lib/utils.test.ts` works.

CI runs the smoke test on Node.js 18 and 20, the oldest version `engines` allows and the next major's minimum. `tsconfig.build.json` targets ES2022 so that `dist/` runs there.

## Design rules

- Semantic versioning:
  - patch: a bug fix, including a fix to a country's format;
  - minor: new API, a new country or format type, or a deprecation;
  - major: a removal. Deprecate first.
- Code, comments and commit messages use American English. Docs, PRs and issues use British English, short sentences and digits for quantities.
- A comment says only what the code cannot show. Leave ticket IDs, dates and history out of comments and test names, except in `TODO(#123)`. A reason for leaving something out goes in the commit or PR, not in a comment.
- Test names start with "should".
- A new dependency needs a reason that a few lines of code cannot cover, and a healthy project: recent releases, active maintenance and wide use on GitHub and npm.
- GitHub Actions are pinned to a commit SHA, with the version in a comment, such as `uses: actions/checkout@<sha> # v7.0.1`.

## Address formats

Each country's formats live in `lib/formats/index.ts`, as an export named after its ISO 3166-1 alpha-2 code. They come from [Google's Address Data Service][google-address-data].

To compare the built-in formats with Google's latest data:

```sh
pnpm formats:update
```

This fetches Google's data into `scripts/.cache/`, transforms it to the library's format and prints a diff that shows matches, differences and missing countries. It changes no file in `lib/`. Apply the changes you want to `lib/formats/index.ts` by hand, and add a test for each country you change.

## Release

The release tag is the only source of the version. On `main`, `package.json` stays at `0.0.0-development`.

1. Create a GitHub release on `main` with tag `vX.Y.Z` and publish it. A tag on another branch fails the workflow. A pre-release publishes with the npm dist-tag `next`, a release with `latest`.
2. The `Publish` workflow runs all checks on the tagged commit, writes the version from the tag into `package.json`, builds and publishes to npm. It removes the `prepare` script before it publishes, so the package on npm does not set up Git hooks.
3. Check the workflow run and the version on npm. If the publish step fails for an external reason, use "Re-run failed jobs": it runs on the same commit. If a check fails, fix it on `main` and release a new version.

Release notes live in the GitHub releases. `CHANGELOG.md` covers the versions before them and is no longer updated.

## Documentation

- `README.md`: what the library does, installation, usage and the API. It links to the rest.
- `ARCHITECTURE.md`: the source layout and how an address is built.

Markdown files keep link references at the end, after a `<!-- References -->` comment, and use no em dashes.

## Differences from vcard-creator

This repo follows the setup of [vcard-creator][vcard-creator], with these deliberate differences:

- `tsconfig.build.json` uses `module: nodenext`, which checks imports the way Node.js resolves them.
- `clean` uses `fs.rmSync()` in a `node -e` one-liner instead of the `rimraf` dependency. It also runs on Windows.
- `CHANGELOG.md` stays, because it is the only record of versions 0.0.1 to 0.0.7.
- `.editorconfig` stays.
- `tsx` runs the `formats:*` scripts, which have no counterpart in vcard-creator.

<!-- References -->

[google-address-data]: https://chromium-i18n.appspot.com/ssl-address
[pnpm]: https://pnpm.io/installation
[vcard-creator]: https://github.com/joaocarmo/vcard-creator
