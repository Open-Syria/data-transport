# Changelog

## v0.1.0

- Initial transport dataset repository scaffold.
- Added canonical transport location and source schemas.
- Added validation, reporting, coverage, and release artifact tooling.
- Added the first reviewed transport seed with 14 locations from OurAirports and
  DataHub UN/LOCODE.
- Added reviewed OpenSyria geography locality links for the first seed.
- Expanded the seed with 28 active railroad stations and 3 GeoNames harbor/port
  identifier merges.
- Added dated `sourceReferences` to every location record and release artifact.
- Added 6 Wikidata airport identifier enrichments matched by exact IATA and
  ICAO codes.
- Added 6 GeoNames airport identifier enrichments for existing public airport
  records.
- Removed Al Thaurah Airport (`SOR`) from canonical data pending status,
  identity, and safety review.
- Added 30 stable public border crossing reference records from the
  public-domain HIU/Stanford border crossings dataset.
- Cross-checked 27 border crossing records against the public-domain HDX 2015
  HIU CSV and corrected canonical names to prefer Syrian-side crossing names.
- Added reviewed OpenSyria geography administrative links for 17 border
  crossing records.
- Added NGA World Port Index support and enriched 3 main seaport records with
  WPI identifiers and port-specific coordinates.
- Added 6 public GeoNames maritime terminal subfacility records for wharves and
  piers around Tartus, Arwad, and Latakia.
- Added 5 inactive GeoNames abandoned railroad station records with dated
  source-row references.
- Enriched Nasib Border Crossing with a reviewed GeoNames border-post identifier
  and Arabic facility name.
- Added 16 reviewed OpenSyria geography locality links for rail terminal
  records.
- Added 2 Wikidata identifier enrichments from exact GeoNames ID matches for
  Tartus and Nasib Border Crossing.
- Added 5 Wikidata identifier enrichments from exact UN/LOCODE matches for
  locality-style transport and trade records.
- Added an official UN/LOCODE currentness review against the 2025-1 production
  package and 2026-06-16 pre-release, with no new Syria codes found.
- Added 3 reviewed public railway station records from Wikidata and enriched 3
  existing rail terminal records with Wikidata station identifiers.
- Repaired corrupted question-mark placeholders in maritime Arabic labels,
  GeoNames transliteration aliases, and the Meidan Ekbis neighboring-country
  alias.
- Reviewed port-specific Wikidata items for Latakia, Baniyas, and Tartus and
  held them pending a locality-versus-facility port modeling split.
- Added 2 exact Wikidata border crossing enrichments for existing public
  crossing records and documented held neighboring-side/checkpoint candidates.
- Added 5 reviewed GeoNames public road transit terminal records.
- Added a dated status snapshot schema, release artifacts, and 9 Logistics
  Cluster border crossing status observations from the 2026-03-09 Syria access
  update.
- Added 12 additional Logistics Cluster status snapshots from the 30 April 2026
  Syria coordination meeting, covering border crossings, ports, and airports.
