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
- `sourceStatus`.

Machine-readable JSON Schemas live in `schemas/`.

