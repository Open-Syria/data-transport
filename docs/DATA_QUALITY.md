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
- duplicate aliases within a record,
- aliases that duplicate canonical names,
- duplicate external identifiers where uniqueness is expected.

Completeness targets vary by field. Missing coordinates, Arabic names, and
external IDs are acceptable when no approved public source supports them.

## Current Seed Snapshot

As of the current seed snapshot:

- 77 transport location records pass schema and source validation.
- 77 records have source-backed coordinates.
- 47 records have external IDs.
- 77 records have dated source references.
- 77 records have upstream source-row dates.
- 6 records have OurAirports identifiers.
- 12 records have UN/LOCODE identifiers.
- 43 records have GeoNames identifiers.
- 6 records have Wikidata identifiers.
- 3 records have NGA World Port Index identifiers.
- 36 records have reviewed OpenSyria geography locality IDs.
- 63 records have administrative location data.
- 32 records have Arabic names.
- 6 records are public maritime terminal subfacilities from GeoNames.
- 30 records are border crossings from public-domain HIU reference data.
- 27 border crossing records have a second dated HDX 2015 source reference.
- 17 border crossing records have reviewed OpenSyria geography locality links.

Operational status is currently `unknown` for every record because this dataset
does not publish live operating conditions.
