# Data Schema

Canonical transport data currently contains three files:

- `data/locations.json`
- `data/sources.json`
- `data/status-snapshots.json`

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

`status-snapshots.json` is an array of dated observations about a canonical
location. Each record has:

- stable OpenSyria snapshot `id`,
- `locationId` pointing to an existing `locations.json` record,
- `observedStatus`,
- `statusAsOf`,
- source-provided crossing/place names,
- concise `statusNote`,
- approved `sourceIds`,
- dated `sourceReferences`,
- `sourceStatus`.

Status snapshots are time-bound evidence. They must not be treated as live
operating conditions or as a replacement for stable location identity.

Machine-readable JSON Schemas live in `schemas/`.
