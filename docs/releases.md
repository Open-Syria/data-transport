# Releases

Releases publish generated artifacts from canonical JSON files, including
location records, dated status snapshots, and dated route snapshots.

Published release artifacts are consumed by `datasets-api` for the public
transport endpoints and the filtered `/openapi/transport.json` contract after
the API integration is deployed. When a new release is promoted, update the API
release pin and dataset documentation in the same integration pass.

Prepare a release:

```bash
pnpm run release:prepare -- --version v0.1.0 --status seed
```

Publish the prepared release assets:

```bash
git tag v0.1.0
git push origin v0.1.0
```

The release workflow prepares artifacts with `--status seed` by default. Set the
repository variable `DATASET_RELEASE_STATUS` to another valid release status
when promoting a later release.

To publish manually instead of using the tag workflow:

```bash
GITHUB_REPOSITORY=Open-Syria/data-transport \
GITHUB_TOKEN=<token> \
pnpm run release:publish:github -- --tag v0.1.0
```

Build only:

```bash
pnpm run release:build
```

`release:prepare` writes a publishable `dist/release/release-manifest.json` with
GitHub release asset URLs. `release:build` is useful for local validation, but
does not prepare public artifact URLs by itself.

After the GitHub Release exists, verify the API integration from the sibling
`datasets-api` repository:

```bash
pnpm run datasets:sync
TRANSPORT_RELEASE_DIR=data/releases/transport/v0.1.0 pnpm run smoke:transport
```
