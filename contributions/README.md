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
- add or update dated `sourceReferences` for the approved source IDs,
- add source-backed coordinates,
- add IATA, ICAO, UN/LOCODE, GeoNames, Wikidata, or OurAirports identifiers,
- connect a record to an existing OpenSyria geography ID when the relationship
  is source-backed,
- add a dated status snapshot when it points to an existing canonical
  `locationId` and has a reviewed `statusAsOf` source date,
- add a dated high-level route snapshot when it points to existing canonical
  `locationIds`, has a reviewed `statusAsOf` source date, and excludes geometry
  or live routing instructions.

## Safety Review

Hold a record for maintainer review if it is military-only, tactical, a
checkpoint, undated status, recently operational without a source date, or
ambiguous enough that publication could cause safety issues. Hold route
geometry, convoy information, checkpoint routing, and live route guidance.

## Validation

Run:

```bash
pnpm run validate
```
