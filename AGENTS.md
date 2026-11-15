# AGENTS.md

Instructions for coding agents working on `i18n-postal-address`, a TypeScript library that formats postal addresses by country.

Read these first. They are the rules for every contributor:

- [CONTRIBUTING.md](CONTRIBUTING.md): setup, checks, design rules, address formats and releases.
- [ARCHITECTURE.md](ARCHITECTURE.md): how an address is built from its parts, the source layout and where each test belongs.

## Before you finish

Run the checks in [CONTRIBUTING.md](CONTRIBUTING.md#checks) and report each result.

## Pull requests

- Use the PR template in `.github/PULL_REQUEST_TEMPLATE.md`.
- List problems you found but did not fix under a "Related, not done" heading in the PR body, each with the file and line.
- Do not edit `dist/`, `pnpm-lock.yaml` by hand, or the version in `package.json`. The release sets the version.
