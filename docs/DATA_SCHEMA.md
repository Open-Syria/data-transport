# Data Schema

Canonical transport data currently contains two files:

- `data/locations.json`
- `data/sources.json`

`locations.json` is an array of public transport and trade location records.
Each record has:

- stable OpenSyria `id`,
- localized `name`,
- optional `aliases`,
- one or more `locationTypes`,
- one or more `transportModes`,
- conservative `operationalStatus`,
- optional source-backed `coordinates`,
- optional `administrativeLocation`,
- optional `externalIds`,
- approved `sourceIds`,
- dated `sourceReferences` for source access time and row-level source dates
  where available,
- `sourceStatus`.

Machine-readable JSON Schemas live in `schemas/`.
