# Data Quality

Validation answers: "Is this data structurally allowed?"

Reporting answers: "How complete, sourceable, and reviewable is this data?"

Run:

```bash
pnpm run validate
pnpm run report:data
pnpm run coverage:data
```

Validation fails on:

- invalid JSON shape,
- unknown fields,
- missing required fields,
- duplicate IDs,
- duplicate source IDs on one record,
- records that reference unknown sources,
- records that reference non-approved sources,
- records whose `sourceIds` and `sourceReferences` do not match,
- status snapshots that reference unknown location IDs,
- route snapshots that reference unknown location IDs,
- duplicate aliases within a record,
- aliases that duplicate canonical names,
- duplicate external identifiers where uniqueness is expected.

Completeness targets vary by field. Missing coordinates, Arabic names, and
external IDs are acceptable when no approved public source supports them.

## Current Released Snapshot

As of the current released snapshot:

- 90 transport location records pass schema and source validation.
- 28 dated status snapshot records pass schema, source, and location-reference
  validation.
- 5 dated route snapshot records pass schema, source, and location-reference
  validation.
- 90 records have source-backed coordinates.
- 63 records have external IDs.
- 90 records have dated source references.
- 90 records have upstream source-row dates.
- 6 records have OurAirports identifiers.
- 12 records have UN/LOCODE identifiers.
- 54 records have GeoNames identifiers.
- 21 records have Wikidata identifiers.
- 3 records have NGA World Port Index identifiers.
- 60 records have reviewed OpenSyria geography locality IDs.
- 76 records have administrative location data.
- 47 records have Arabic names.
- 6 records are public maritime terminal subfacilities from GeoNames.
- 5 records are public road transit terminals from GeoNames.
- 5 records are inactive abandoned railroad station references from GeoNames.
- 30 records are border crossings from public-domain HIU reference data.
- 27 border crossing records have a second dated HDX 2015 source reference.
- 17 border crossing records have reviewed OpenSyria geography locality links.
- 23 rail terminal records have reviewed OpenSyria geography locality links.
- 1 border crossing record has a reviewed GeoNames border-post identifier.
- 2 border crossing records have reviewed Wikidata identifiers and Arabic
  names from exact public crossing matches.
- 3 public railway station records come from reviewed Wikidata station items.
- 28 status snapshots come from Logistics Cluster updates: 9 border crossing
  observations from 2026-03-09, 12 border crossing, port, and airport
  observations from the 2026-04-30 coordination meeting, 2 airport observations
  from the 2026-05-21 Middle East regional coordination meeting, and 5
  crossing/port observations from the 2026-05-25 regional supply-route
  snapshot.
- 5 route snapshots come from the 2026-05-25 Logistics Cluster regional
  supply-route snapshot and are published without geometry or live routing
  instructions.

Operational status is currently `unknown` for 85 records and `inactive` for the
5 abandoned GeoNames railroad station references. The dataset does not publish
live operating conditions.
