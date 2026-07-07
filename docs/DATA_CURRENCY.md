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

GeoNames rail, inactive abandoned rail, and port expansion rows used the Syria
country dump accessed at `2026-07-07T22:24:22.381Z`.

GeoNames airport identifier enrichment reused the same Syria country dump and
accepted only reviewed matches to existing public airport records.

Wikidata airport identifier enrichment used exact IATA and ICAO matches accessed
at `2026-07-07T22:44:40.220Z`.

NGA World Port Index enrichment used the official `UpdatedPub150.csv` download
accessed at `2026-07-07T23:27:03.137Z`. The WPI CSV does not expose per-row
dates, so record-level WPI references use source access timestamps and WPI
numbers.

HIU/Stanford border crossing records use a public-domain source issued on
`2014-03-12` and accessed at `2026-07-07T23:04:31.920Z`. They are stable
reference points only and must not be read as current crossing operating status.

HDX border crossing enrichment uses the archived public-domain HIU CSV dated
`2015-06-11`, accessed at `2026-07-07T23:13:40.384Z`. HDX package metadata was
modified in 2025, but the imported record facts remain historical 2015
reference data, not live status.

Every canonical record currently has at least one dated source reference and at
least one upstream source-row date.
