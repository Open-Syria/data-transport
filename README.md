# OpenSyria Data Transport

[![Validate](https://github.com/Open-Syria/data-transport/actions/workflows/validate.yml/badge.svg)](https://github.com/Open-Syria/data-transport/actions/workflows/validate.yml)
[![License](https://img.shields.io/badge/license-see%20LICENSE.md-blue.svg)](LICENSE.md)
[![Node.js 24+](https://img.shields.io/badge/node-%3E%3D24-339933?logo=node.js&logoColor=white)](package.json)
[![pnpm 11](https://img.shields.io/badge/pnpm-11-F69220?logo=pnpm&logoColor=white)](package.json)

OpenSyria Data Transport is the canonical repository for public, non-personal
Syrian transport and trade location reference data.

The repository publishes versioned release artifacts consumed by
[`datasets-api`](https://github.com/Open-Syria/datasets-api). It is focused on
stable public reference locations, not live routing, military, checkpoint,
surveillance, or operational infrastructure data.

## Scope

Approved scope may include:

- civil airports and airfields,
- seaports and maritime terminals,
- rail, road, postal, and trade terminals,
- UN/LOCODE transport and trade locations,
- stable public identifiers such as IATA, ICAO, UN/LOCODE, GeoNames, and
  Wikidata IDs,
- source-backed coordinates and administrative links when safe to publish.

Out of scope:

- personal data,
- private addresses or accounts,
- checkpoints,
- military-only or tactical locations,
- live route availability,
- surveillance-related data,
- proprietary map data,
- data that cannot be legally redistributed.

## Current Status

This repository is in seed status. Canonical files, schemas, validation scripts,
release tooling, and source-review manifests are in place.

The canonical `data/locations.json` file currently contains 71 reviewed seed
records from the first transport import:

- 6 public civil/reference airport records from OurAirports,
- 7 standalone UN/LOCODE transport and trade locations,
- 5 UN/LOCODE identifier merges into accepted airport records.
- 28 active railroad station records from GeoNames.
- 3 GeoNames harbor/port identifier merges into existing seaport records.
- 6 GeoNames airport identifier enrichments for existing public airport records.
- 30 stable border crossing reference records from the public-domain HIU/Stanford
  border crossings dataset.
- 13 reviewed administrative locality links from OpenSyria Data Geography.
- 6 Wikidata identifier enrichments for airports matched by both IATA and ICAO
  code.
- Dated source references on every record, including source access timestamps
  and source-row dates where the upstream source provides them.

Held source rows remain in local maintainer review outputs and are not part of
the canonical dataset.

## Repository Layout

```text
data/
  locations.json
  sources.json
schemas/
  locations.schema.json
  sources.schema.json
  source-import.schema.json
  release-manifest.schema.json
scripts/
  validate-data.mjs
  validate-schemas.mjs
  validate-imports.mjs
  build-release.mjs
  report-data.mjs
  analyze-coverage.mjs
imports/
  manifests/
examples/
fixtures/
docs/
contributions/
```

## Commands

```bash
corepack enable pnpm
pnpm install
pnpm run validate
pnpm run report:data
pnpm run coverage:data
pnpm run release:build
pnpm run release:prepare -- --version v0.1.0
```

Generated release files are written to:

```text
dist/release/
```

Coverage analysis files are written to:

```text
dist/coverage/
```

Generated files should not be edited directly.

## Source Policy

Every canonical record must be traceable to approved reusable public sources.
Use `sourceIds` for the approved source list and `sourceReferences` for dated
source evidence such as access timestamps, source row identifiers, and upstream
row dates.

Preferred seed sources include OurAirports, UN/LOCODE, Wikidata, GeoNames,
HIU/Stanford public-domain border crossing data, and official public sources
with clear reuse terms. OpenStreetMap-derived data may be useful, but ODbL
share-alike requirements must be reviewed before it is mixed into default
release artifacts.

See [docs/SOURCES.md](docs/SOURCES.md).

## Contribution Model

Public contributions are controlled and should focus on approved data fixes,
missing public reference records within scope, source attribution, and
documentation corrections.

For a normal data pull request:

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) and
   [contributions/README.md](contributions/README.md).
2. Edit only the relevant canonical files under `data/` unless a maintainer
   approved broader work.
3. Use only public, legally reusable sources.
4. Run `pnpm run validate`.
5. Explain changed files, source IDs, source URLs, and uncertainty.

## Documentation

Start with:

- [Data schema](docs/DATA_SCHEMA.md)
- [Field reference](docs/FIELD_REFERENCE.md)
- [ID policy](docs/ID_POLICY.md)
- [Sources](docs/SOURCES.md)
- [Review process](docs/REVIEW_PROCESS.md)
- [Import workflow](docs/IMPORT_WORKFLOW.md)
- [Release process](docs/releases.md)
- [Coverage analysis](docs/COVERAGE_ANALYSIS.md)

## License

See [LICENSE.md](LICENSE.md).
