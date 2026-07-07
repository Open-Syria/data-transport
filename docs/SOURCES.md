# Sources

Every canonical record must cite approved reusable public sources.
Each cited source must also appear in the record's `sourceReferences` with an
access timestamp and, when available, a source row identifier and source row
date.

Preferred source families:

- OurAirports for public airport reference data,
- UN/LOCODE for transport and trade location codes,
- Wikidata for public identifiers and cross-checking,
- GeoNames for names, coordinates, and public gazetteer references,
- NGA World Port Index for public maritime identifiers and port coordinates,
- HIU/Stanford and HDX public-domain border crossing data for stable crossing
  reference points,
- official public sources with clear reuse terms.

Do not import from:

- Google Maps or other proprietary map databases,
- sources with unclear licensing,
- no-redistribution or permission-required sources,
- non-commercial-only sources when broad reuse is required,
- scraped sources whose terms do not allow dataset redistribution.

OpenStreetMap-derived data requires an explicit ODbL review before use in
default release artifacts.

## Current Seed Sources

The first canonical seed uses:

- OurAirports for public civil/reference airport records,
- DataHub UN/LOCODE codelist for public transport and trade location codes.
- OpenSyria Data Geography for reviewed locality and parent administrative
  cross-links.
- GeoNames for active railroad stations and broad harbor/port identifiers.
- GeoNames for exact airport identifier enrichment on existing public airport
  records.
- Wikidata for exact airport identifier enrichment when existing records match
  by both IATA and ICAO code.
- NGA World Port Index for WPI identifiers and port-specific coordinates on
  existing main seaport records.
- HIU/Stanford public-domain data for stable border crossing reference records.
- HDX's archived 2015 HIU border crossing CSV for Syrian-side crossing names,
  coordinates, and dated source cross-checks.

Wikidata and official public sources remain supporting cross-check sources for
later batches.
