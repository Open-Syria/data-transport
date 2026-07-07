# Source Decisions

## OurAirports

Status: approved and imported for public civil/reference records.

OurAirports publishes open data downloads under public-domain terms. Maintainers
must still review Syria rows for scope and safety before importing.

The first seed imported 6 public airport records. Military-only, heliport,
unsupported, and small unverified airport rows were held for review.
OurAirports does not expose source-row dates in the airport CSV, so canonical
records store source access timestamps and OurAirports identifiers.

A follow-up status review removed Al Thaurah Airport (`SOR`) from canonical
data. OurAirports and UN/LOCODE list public identifiers, but another public
airport directory labels it closed and the matching Wikidata IATA item describes
Tabqa Military Airbase. Keep it held until an approved source resolves identity,
status, and safety.

## UN/LOCODE

Status: DataHub mirror approved and imported for seed review; official UNECE
source proposed for direct review.

UN/LOCODE rows should be cross-checked against the current official UNECE code
list. Ambiguous rows should be held rather than imported automatically.

The current canonical data keeps 7 standalone public transport/trade locations
and 5 airport identifier merges into accepted OurAirports airport records. Rows with
out-of-country coordinates, unknown function codes, airport-only functions
without accepted public airport confirmation, or mixed airport/ground functions
that risk duplicate identity were held.
UN/LOCODE `Date` values are normalized into month-precision
`sourceReferences[].sourceRecordDate` values.

## Wikidata and GeoNames

Status: approved for public identifiers, names, coordinates, and cross-checking.

Use them as supporting sources, not as a shortcut around scope or safety review.

Wikidata was imported for exact airport identifier enrichment only. The import
accepted 6 existing airport records whose Wikidata item matched by both IATA and
ICAO code. It held city/locality, port, single-code airport, and
military-looking matches for later review.

GeoNames was imported for the first non-airport expansion batch. The import
accepted active railroad station (`RSTN`) rows and broad harbor/port (`HBR`,
`PRT`) rows. It held abandoned rail stations, airport rows, border posts,
customs rows, heliports, and port subfacilities for later review.
GeoNames `modification_date` values are stored as day-precision
`sourceReferences[].sourceRecordDate` values.

A follow-up GeoNames review accepted 6 airport identifier enrichments for
existing public airport records only. Ambiguous or military-looking airport rows
remain held.

## OpenSyria Data Geography

Status: approved and imported for administrative locality cross-links.

The first seed uses OpenSyria Data Geography to attach reviewed locality and
parent administrative IDs. Locality Arabic names are copied only when the
transport record represents a locality-style transport/trade location, not a
specific airport or terminal facility.

## HIU/Stanford Border Crossings

Status: approved and imported for stable public border crossing reference
points.

The source is a public-domain U.S. Department of State Humanitarian Information
Unit point dataset mirrored by Stanford/UC Berkeley GeoData. It was issued on
2014-03-12, so records imported from it must keep `operationalStatus` as
`unknown` and must not be interpreted as live border status.

The first border crossing batch imported 30 named crossing records. Tower-style
rows (`Hadallat (Tower 30/31)` and `Tower 22`) were held for identity and safety
review before publication.
