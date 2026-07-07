# Data Currency

Transport data changes over time. This repository stores public reference data,
not live operating conditions.

Fields most likely to change:

- public names,
- public identifiers,
- official websites,
- coordinates and source corrections,
- closed or renamed locations.

Use `sourceReferences[].accessedAt` to see when the source data was collected or
reviewed for a record. Use `sourceReferences[].sourceRecordDate` to see the
upstream row date when the source provides one, such as UN/LOCODE month-level
dates or GeoNames day-level modification dates.

Before each release:

1. Recheck source access dates.
2. Recheck whether OurAirports or UN/LOCODE published newer data.
3. Update record-level `sourceReferences` when imports are refreshed.
4. Keep uncertain live status as `unknown`.
5. Do not publish live route availability or tactical operational status.

## Current Source Access

The first seed used OurAirports and the DataHub UN/LOCODE codelist accessed at
`2026-07-07T21:51:07.081Z`.

OpenSyria Data Geography locality links were reviewed against the local
`../data-geography/data/localities.json` file on `2026-07-08`.

GeoNames rail and port expansion rows used the Syria country dump accessed at
`2026-07-07T22:24:22.381Z`.

Wikidata airport identifier enrichment used exact IATA and ICAO matches accessed
at `2026-07-07T22:44:40.220Z`.

Every canonical record currently has at least one dated source reference and at
least one upstream source-row date.
