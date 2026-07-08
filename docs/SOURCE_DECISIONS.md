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

A 2026-07-08 recheck reached the same decision: `SOR` remains out of canonical
public airport data because the row has conflicting public identity/status
signals and overlaps a military-airbase identity.

## UN/LOCODE

Status: DataHub mirror approved and imported for seed review; official UNECE
source proposed for direct review.

UN/LOCODE rows should be cross-checked against the current official UNECE code
list. Ambiguous rows should be held rather than imported automatically.

The current canonical data keeps 7 standalone public transport/trade locations
and 5 airport identifier merges into accepted OurAirports airport records. Rows
with out-of-country coordinates, unknown function codes, airport-only functions
without accepted public airport confirmation, or mixed airport/ground functions
that risk duplicate identity were held.
UN/LOCODE `Date` values are normalized into month-precision
`sourceReferences[].sourceRecordDate` values.

The official UNECE 2025-1 production package and the pre-release listed as last
updated 2026-06-16 were reviewed on 2026-07-08. Both official packages contain
the same Syria row set as the DataHub mirror: 19 location codes plus the country
header row. No new Syria UN/LOCODE rows were found. Official UN terms restrict
redistribution and derivative compilation, so the official package remains a
currentness review source while canonical records continue to cite the approved
DataHub mirror.

## Wikidata and GeoNames

Status: approved for public identifiers, names, coordinates, and cross-checking.

Use them as supporting sources, not as a shortcut around scope or safety review.

The first Wikidata import accepted exact airport identifier enrichment only. The
import accepted 6 existing airport records whose Wikidata item matched by both
IATA and ICAO code. It held city/locality, port, single-code airport, and
military-looking matches for later review.

A follow-up Wikidata import accepted 2 exact GeoNames ID matches for existing
canonical records: Tartus port and Nasib Border Crossing. The batch added only
Wikidata identifiers and dated source references; it did not replace canonical
coordinates, names, location types, or operational status.

A follow-up Wikidata import accepted 5 exact UN/LOCODE matches for existing
locality-style transport and trade records: Al Ladhiqiyah, Arwad, Baniyas,
Homs, and Yabrud. The batch added only Wikidata identifiers and dated source
references; it did not replace canonical coordinates, names, location types, or
operational status. Tartus Oil Terminal was left unchanged because no exact
Wikidata UN/LOCODE match was found for that facility-specific record.

A follow-up Wikidata rail review accepted 3 new prominent public railway
station records for Aleppo, Homs, and Qamishli, and enriched 3 existing
GeoNames rail terminal records for Damascus Hejaz, Qadam, and Latakia. These
records use `operationalStatus: "unknown"` and do not publish live service
availability. Wikidata items with missing English labels or unclear
facility-level identity remain held.

A follow-up Wikidata port modeling review held port-specific Wikidata items for
Latakia, Baniyas, and Tartus because the current main seaport records already
combine source-backed UN/LOCODE, WPI, GeoNames, and locality identity. Adding
those as separate records would require a broader locality-versus-facility
modeling split. The Tartus naval base Wikidata item was rejected as
military/sensitive and out of scope.

GeoNames was imported for the first non-airport expansion batch. The import
accepted active railroad station (`RSTN`) rows and broad harbor/port (`HBR`,
`PRT`) rows. It held abandoned rail stations, airport rows, border posts,
customs rows, heliports, and port subfacilities for later review.
GeoNames `modification_date` values are stored as day-precision
`sourceReferences[].sourceRecordDate` values.

A follow-up GeoNames review accepted 6 airport identifier enrichments for
existing public airport records only. Ambiguous or military-looking airport rows
remain held.

A follow-up maritime review accepted 6 public GeoNames `WHRF` and `PIER` rows as
terminal records. These rows represent wharf/pier subfacilities around Tartus,
Arwad, and Latakia, so they use `locationTypes: ["terminal"]` rather than
duplicating main seaport identities.
The canonical labels were later repaired against GeoNames alternatenames to
replace corrupted question-mark placeholders in Arabic names and diacritic
transliteration aliases.

A follow-up rail review accepted 5 GeoNames abandoned railroad station `RSTNQ`
rows as inactive rail terminal references. These rows are historical reference
points, not current-service evidence. They use governorate-level administrative
links from the GeoNames admin code only; exact locality links were not inferred
from nearest coordinates.

A follow-up border-post review accepted the GeoNames `PSTB` row for Nasib as an
enrichment of the existing Nasib Border Crossing record because its name matches
and its point is within about 210 meters of the HIU/HDX point. The At Tanf
`PSTB` row remains held because its point is about 7.9 kilometers from the
existing HIU/HDX crossing point. The Nasib `CSTM` customs-building row remains
held because it describes a customs/banking/insurance building rather than a
distinct crossing identity.

## NGA World Port Index

Status: approved and imported for public maritime identifiers and coordinates.

The World Port Index batch accepted the 3 Syria rows from the official NGA
`UpdatedPub150.csv` download: Tartus, Baniyas, and Al Ladhiqiyah. All 3 matched
existing main seaport records by UN/LOCODE and name, so the batch enriched those
records with `externalIds.worldPortIndex` and WPI port-specific coordinates.

No new standalone maritime records were added from WPI. Tartus Oil Terminal was
left as a separate UN/LOCODE-backed record because WPI models Tartus as the main
port with oil-terminal facilities rather than a distinct terminal identity.

Do not add duplicate port-specific records for Latakia, Baniyas, or Tartus until
the dataset has a deliberate model for separating city/trade-location records
from physical port facility records.

## OpenSyria Data Geography

Status: approved and imported for administrative locality cross-links.

The first seed uses OpenSyria Data Geography to attach reviewed locality and
parent administrative IDs. Locality Arabic names are copied only when the
transport record represents a locality-style transport/trade location, not a
specific airport or terminal facility.

A follow-up border crossing review added 17 administrative links where the
crossing name had an exact or obvious nearby locality match. Ambiguous border
records remain unlinked rather than using nearest-place inference.

A follow-up rail review added 16 administrative locality links for GeoNames rail
terminal records where station place names had exact or near-exact OpenSyria
geography locality matches, compatible governorates, and close coordinate
distance. Fuzzy or distant rail candidates remain held rather than using
nearest-place inference.

## HIU Border Crossings

Status: approved and imported for stable public border crossing reference
points.

The source is a public-domain U.S. Department of State Humanitarian Information
Unit point dataset mirrored by Stanford/UC Berkeley GeoData. It was issued on
2014-03-12, so records imported from it must keep `operationalStatus` as
`unknown` and must not be interpreted as live border status.

The first border crossing batch imported 30 named crossing records from the
Stanford/UC Berkeley mirror. Tower-style rows (`Hadallat (Tower 30/31)` and
`Tower 22`) were held for identity and safety review before publication.

The HDX archived 2015 CSV was then used to cross-check 27 existing border
crossing records. Where HDX separated a Syrian-side crossing name from the
neighboring-country crossing name, the Syrian-side name became canonical. The
neighboring-country name was kept only as an alias for search continuity.
The Meidan Ekbis neighboring-country alias was later normalized from a corrupted
HDX character placeholder to the English-searchable Islahiye spelling.

The HDX 2015 rows for `Hadallat (Tower 30/31)` and `Tower 22` remain held.
