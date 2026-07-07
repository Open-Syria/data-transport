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

- 71 transport location records pass schema and source validation.
- 71 records have source-backed coordinates.
- 41 records have external IDs.
- 71 records have dated source references.
- 71 records have upstream source-row dates.
- 6 records have OurAirports identifiers.
- 12 records have UN/LOCODE identifiers.
- 37 records have GeoNames identifiers.
- 6 records have Wikidata identifiers.
- 13 records have reviewed OpenSyria geography locality IDs.
- 26 records have Arabic names.
- 30 records are border crossings from public-domain HIU/Stanford reference data.

Operational status is currently `unknown` for every record because this dataset
does not publish live operating conditions.
