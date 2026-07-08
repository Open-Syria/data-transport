# Import Workflow

1. Add or update a source manifest under `imports/manifests/`.
2. Store ignored raw files under `imports/raw/`.
3. Normalize records into `data/locations.json`.
4. Add or update source entries in `data/sources.json`.
5. Add dated `sourceReferences` for every `sourceIds` entry.
6. Run validation and reports.
7. Document source decisions and known gaps.

Never import all rows blindly. Filter by scope, license, and safety.

## Current Automation Path

The first seed was prepared from the local `../data-automation` repository:

```bash
opensyria-automation collect-transport-sources \
  --output outputs/transport/source-candidates.json \
  --raw-dir outputs/transport/raw

opensyria-automation export-transport-seed \
  --candidates outputs/transport/source-candidates.json \
  --output ../data-transport/data/locations.json \
  --gaps-output outputs/transport/seed-review-gaps.json

opensyria-automation collect-transport-geonames \
  --output outputs/transport/geonames-candidates.json \
  --raw-dir outputs/transport/raw

opensyria-automation export-transport-geonames-seed \
  --candidates outputs/transport/geonames-candidates.json \
  --input ../data-transport/data/locations.json \
  --output ../data-transport/data/locations.json \
  --gaps-output outputs/transport/geonames-review-gaps.json
```

The local gaps files are the review queues for held source rows.

Transport automation exports dated `sourceReferences` from candidate artifact
timestamps and source-row metadata. Refresh these references whenever raw source
downloads are refreshed.

After importing or repairing non-ASCII names, search canonical JSON for literal
question-mark placeholders. Do not leave lossy `?` replacement characters in
Arabic names, transliteration aliases, or neighboring-country aliases when a
source-backed spelling can be recovered.

Official UNECE UN/LOCODE packages should be used for currentness review before
release, but not as a canonical redistributable import source until the official
redistribution and derivative compilation terms are cleared. Continue using the
approved DataHub mirror for canonical UN/LOCODE source references.

Rail-to-geography links should use reviewed OpenSyria Data Geography locality
matches. Accept exact or near-exact station place-name matches only when the
governorate is compatible and the coordinate distance is small; keep fuzzy or
distant matches held.

The Wikidata airport enrichment batch accepted only exact IATA+ICAO matches on
existing airport records. Broader Wikidata matches should stay in review outputs
until identity and safety are checked.

Wikidata GeoNames enrichment may add identifiers to existing reviewed records
only when the Wikidata GeoNames ID exactly matches the canonical record's
GeoNames ID and the item identity is compatible. Do not replace canonical
coordinates, names, types, or status from Wikidata in this enrichment path.

Wikidata UN/LOCODE enrichment may add identifiers to existing locality-style
transport and trade records only when the Wikidata UN/LOCODE exactly matches
the canonical `externalIds.unLocode` value and the item identity is compatible.
Do not use this path for specific facilities such as oil terminals unless the
Wikidata item directly represents the same facility.

Wikidata railway station records may be imported only after manual review of
station identity, coordinates, and duplicate risk against GeoNames rail
terminals. Add new records only for clear public railway-station identities, and
keep operational status `unknown` unless an approved non-live status source
supports a different value.

The GeoNames airport enrichment batch accepted only exact matches to existing
public airport records. Ambiguous airport rows and military-looking rows stay in
review outputs.

The GeoNames abandoned railroad station review accepts `RSTNQ` rows only as
inactive historical rail references. Do not use these rows as evidence of
current rail service, and do not infer exact locality links from nearest
coordinates without a reviewed geography match.

GeoNames border-post rows may enrich existing border crossings only when the
identity and coordinates align with stronger border-crossing sources. Keep rows
held when coordinates diverge materially or the feature describes a building
rather than a crossing identity.

The HIU/Stanford and HDX border crossing batches import stable historical
reference points only. Do not use them to publish live opening hours, current
accessibility, or operational status. When a source separates the Syrian
crossing name from the neighboring-country crossing name, prefer the
Syrian-side name for the canonical record and keep the counterpart name only as
an alias when useful for search continuity.
