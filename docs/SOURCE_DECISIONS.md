# Source Decisions

## OurAirports

Status: approved and imported for public civil/reference records.

OurAirports publishes open data downloads under public-domain terms. Maintainers
must still review Syria rows for scope and safety before importing.

The first seed imported 7 public airport records. Military-only, heliport,
unsupported, and small unverified airport rows were held for review.

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

## Wikidata and GeoNames

Status: approved for public identifiers, names, coordinates, and cross-checking.

Use them as supporting sources, not as a shortcut around scope or safety review.

## OpenSyria Data Geography

Status: approved and imported for administrative locality cross-links.

The first seed uses OpenSyria Data Geography to attach reviewed locality and
parent administrative IDs. Locality Arabic names are copied only when the
transport record represents a locality-style transport/trade location, not a
specific airport or terminal facility.
