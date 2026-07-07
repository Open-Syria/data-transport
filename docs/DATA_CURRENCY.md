# Data Currency

Transport data changes over time. This repository stores public reference data,
not live operating conditions.

Fields most likely to change:

- public names,
- public identifiers,
- official websites,
- coordinates and source corrections,
- closed or renamed locations.

Before each release:

1. Recheck source access dates.
2. Recheck whether OurAirports or UN/LOCODE published newer data.
3. Keep uncertain live status as `unknown`.
4. Do not publish live route availability or tactical operational status.

## Current Source Access

The first seed used OurAirports and the DataHub UN/LOCODE codelist accessed at
`2026-07-07T21:51:07.081Z`.

OpenSyria Data Geography locality links were reviewed against the local
`../data-geography/data/localities.json` file on `2026-07-08`.

GeoNames rail and port expansion rows used the Syria country dump accessed at
`2026-07-07T22:24:22.381Z`.
