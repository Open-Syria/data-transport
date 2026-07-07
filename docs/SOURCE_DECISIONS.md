# Source Decisions

## OurAirports

Status: approved and imported for public civil/reference records.

OurAirports publishes open data downloads under public-domain terms. Maintainers
must still review Syria rows for scope and safety before importing.

The first seed imported 7 public airport records. Military-only, heliport,
unsupported, and small unverified airport rows were held for review.
OurAirports does not expose source-row dates in the airport CSV, so canonical
records store source access timestamps and OurAirports identifiers.

## UN/LOCODE

Status: DataHub mirror approved and imported for seed review; official UNECE
source proposed for direct review.

UN/LOCODE rows should be cross-checked against the current official UNECE code
list. Ambiguous rows should be held rather than imported automatically.

The first seed imported 7 standalone public transport/trade locations and merged
6 airport identifiers into accepted OurAirports airport records. Rows with
out-of-country coordinates, unknown function codes, airport-only functions
without accepted public airport confirmation, or mixed airport/ground functions
that risk duplicate identity were held.
UN/LOCODE `Date` values are normalized into month-precision
`sourceReferences[].sourceRecordDate` values.

## Wikidata and GeoNames

Status: approved for public identifiers, names, coordinates, and cross-checking.

Use them as supporting sources, not as a shortcut around scope or safety review.

GeoNames was imported for the first non-airport expansion batch. The import
accepted active railroad station (`RSTN`) rows and broad harbor/port (`HBR`,
`PRT`) rows. It held abandoned rail stations, airport rows, border posts,
customs rows, heliports, and port subfacilities for later review.
GeoNames `modification_date` values are stored as day-precision
`sourceReferences[].sourceRecordDate` values.

## OpenSyria Data Geography

Status: approved and imported for administrative locality cross-links.

The first seed uses OpenSyria Data Geography to attach reviewed locality and
parent administrative IDs. Locality Arabic names are copied only when the
transport record represents a locality-style transport/trade location, not a
specific airport or terminal facility.
