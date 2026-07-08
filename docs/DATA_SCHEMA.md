# Data Schema

Canonical transport data currently contains four files:

- `data/locations.json`
- `data/route-snapshots.json`
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

`route-snapshots.json` is an array of dated high-level observations about
transport routes or corridors. Each record has:

- stable OpenSyria route snapshot `id`,
- localized route or corridor `name`,
- `routeType` such as `corridor` or `route`,
- one or more `transportModes`,
- `observedStatus`,
- `statusAsOf`,
- source-backed `origin` and `destination` labels,
- zero or more `transitCountries`,
- one or more matched canonical `locationIds`,
- source-provided `sourceNames`,
- optional `indicativeLeadTime`,
- optional `routeNote`,
- approved `sourceIds`,
- dated `sourceReferences`,
- `sourceStatus`.

Route snapshots are time-bound, high-level evidence. They must not include
route geometry, live routing instructions, tactical details, convoy data, or
checkpoint information.

Machine-readable JSON Schemas live in `schemas/`.
