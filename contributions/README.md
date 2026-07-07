# Transport Contribution Workflow

Use this guide for focused transport data corrections and missing-record
contributions.

## Before Editing

Check:

- `docs/FIELD_REFERENCE.md`
- `docs/ID_POLICY.md`
- `docs/SOURCES.md`
- `docs/REVIEW_PROCESS.md`

## Allowed Normal Edits

- add or correct public names and aliases,
- add approved source IDs,
- add source-backed coordinates,
- add IATA, ICAO, UN/LOCODE, GeoNames, Wikidata, or OurAirports identifiers,
- connect a record to an existing OpenSyria geography ID when the relationship
  is source-backed.

## Safety Review

Hold a record for maintainer review if it is military-only, tactical, a
checkpoint, recently operational, or ambiguous enough that publication could
cause safety issues.

## Validation

Run:

```bash
pnpm run validate
```

