# OpenSyria Data Transport

[![Validate](https://github.com/Open-Syria/data-transport/actions/workflows/validate.yml/badge.svg)](https://github.com/Open-Syria/data-transport/actions/workflows/validate.yml)
[![License](https://img.shields.io/badge/license-see%20LICENSE.md-blue.svg)](LICENSE.md)
[![Node.js 24+](https://img.shields.io/badge/node-%3E%3D24-339933?logo=node.js&logoColor=white)](package.json)
[![pnpm 11](https://img.shields.io/badge/pnpm-11-F69220?logo=pnpm&logoColor=white)](package.json)

OpenSyria Data Transport is the canonical repository for public, non-personal
Syrian transport and trade location reference data, plus dated public status
and route snapshots when a reviewed source supports them.

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
- source-backed coordinates and administrative links when safe to publish,
- dated status snapshots for public transport locations when separated from
  stable location identity,
- dated high-level route or corridor snapshots without geometry or live routing
  claims.

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

This repository publishes a released reference dataset. Canonical files,
schemas, validation scripts, release tooling, and source-review manifests are
in place.

The canonical `data/locations.json` file currently contains 90 reviewed
released location records:

- 6 public civil/reference airport records from OurAirports,
- 7 standalone UN/LOCODE transport and trade locations,
- 5 UN/LOCODE identifier merges into accepted airport records.
- Official UNECE UN/LOCODE 2025-1 production and 2026-06-16 pre-release rows
  reviewed for currentness, with no new Syria codes found.
- 28 active railroad station records from GeoNames.
- 5 inactive/abandoned railroad station records from reviewed GeoNames `RSTNQ`
  rows.
- 3 public railway station records from reviewed Wikidata station items.
- 3 Wikidata railway station identifier enrichments for existing GeoNames rail
  terminal records.
- 3 GeoNames harbor/port identifier merges into existing seaport records.
- 6 GeoNames public maritime terminal subfacility records for wharves and
  piers.
- 5 GeoNames public road transit terminal records.
- 6 GeoNames airport identifier enrichments for existing public airport records.
- 1 GeoNames border-post enrichment for the existing Nasib Border Crossing
  record.
- 30 stable border crossing reference records from public-domain HIU datasets.
- 27 border crossing records cross-checked against the HDX 2015 HIU release,
  with Syrian-side names preferred over neighboring-country crossing names.
- 2 Wikidata border crossing identifier enrichments for exact existing public
  border crossing records.
- 3 NGA World Port Index identifier and coordinate enrichments for existing
  main seaport records.
- 60 reviewed administrative locality links from OpenSyria Data Geography,
  including 17 border crossing locality links and 23 rail terminal locality
  links.
- 76 records with administrative location data.
- 21 records with Wikidata identifiers, including 6 airports matched by both
  IATA and ICAO code, 2 exact GeoNames ID matches, 5 exact UN/LOCODE matches,
  6 reviewed railway station records or enrichments, and 2 exact border
  crossing enrichments.
- Dated source references on every record, including source access timestamps
  and source-row dates where the upstream source provides them.
- `data/status-snapshots.json` contains 28 dated status observations from
  Logistics Cluster updates: 9 border crossing observations from 2026-03-09,
  12 crossing, port, and airport observations from the 2026-04-30 Syria
  coordination meeting, 2 airport observations from the 2026-05-21 Middle East
  regional coordination meeting, and 5 crossing/port observations from the
  2026-05-25 regional supply-route snapshot. These are matched to existing
  canonical records without changing stable location `operationalStatus`
  values.
- `data/route-snapshots.json` contains 5 dated high-level route and corridor
  observations from the 2026-05-25 regional supply-route snapshot. These
  publish source-backed origin/destination labels, matched location IDs, status
  date, and indicative lead time without geometry or live routing instructions.

Held source rows remain in local maintainer review outputs and are not part of
the canonical dataset.

## Repository Layout

```text
data/
  locations.json
  route-snapshots.json
  sources.json
  status-snapshots.json
schemas/
  locations.schema.json
  route-snapshots.schema.json
  sources.schema.json
  status-snapshots.schema.json
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
pnpm run release:prepare -- --version v0.1.1 --status released
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

## Public API

The OpenSyria datasets API is wired to serve this repository's release artifacts
through read-only endpoints after the tagged release is published and the API is
deployed:

- `GET https://api.opensyria.org/api/v1/transport/locations`
- `GET https://api.opensyria.org/api/v1/transport/locations/{locationId}`
- `GET https://api.opensyria.org/api/v1/transport/status-snapshots`
- `GET https://api.opensyria.org/api/v1/transport/status-snapshots/{statusSnapshotId}`
- `GET https://api.opensyria.org/api/v1/transport/route-snapshots`
- `GET https://api.opensyria.org/api/v1/transport/route-snapshots/{routeSnapshotId}`

Filtered OpenAPI documentation is published at
`https://api.opensyria.org/openapi/transport.json`, and the public dataset page
is `https://opensyria.org/datasets/transport`.

## Source Policy

Every canonical record must be traceable to approved reusable public sources.
Use `sourceIds` for the approved source list and `sourceReferences` for dated
source evidence such as access timestamps, source row identifiers, and upstream
row dates. Current or recent operating evidence belongs in
`status-snapshots.json` or `route-snapshots.json` with `statusAsOf`, not in
stable location identity unless a maintainer explicitly approves a
location-level status change. Route snapshots must remain high-level,
source-dated, and geometry-free.

Preferred public release sources include OurAirports, UN/LOCODE, Wikidata,
GeoNames, NGA World Port Index, HIU/Stanford and HDX public-domain border
crossing data, and official public sources with clear reuse terms.
OpenStreetMap-derived data may be useful, but ODbL share-alike requirements
must be reviewed before it is mixed into default release artifacts.

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
