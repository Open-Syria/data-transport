# Coverage Analysis

Run:

```bash
pnpm run coverage:data
```

The command writes:

```text
dist/coverage/coverage-report.json
dist/coverage/COVERAGE.md
```

The coverage analyzer currently checks:

- English names,
- Arabic names,
- coordinates,
- administrative location links,
- administrative locality IDs,
- any external ID,
- dated source references,
- source-row dates,
- OurAirports identifiers,
- UN/LOCODE identifiers,
- Wikidata identifiers,
- status snapshot as-of dates,
- status snapshot source names,
- status snapshot notes,
- route snapshot as-of dates,
- route snapshot source names,
- route snapshot location links,
- route snapshot notes.

Generated coverage output should not be committed in normal pull requests.

## Current Coverage Summary

The current released snapshot contains 90 locations:

- 6 airport-typed records,
- 30 border crossing records,
- 5 seaport-typed records,
- 6 terminal records,
- 11 road terminal records,
- 38 rail terminal records,
- 1 oil terminal record.
- 90 records with dated source references.
- 90 records with upstream source-row dates.
- 76 records with administrative location data.
- 60 records with reviewed OpenSyria geography locality IDs.
- 54 records with GeoNames identifiers.
- 21 records with Wikidata identifiers.
- 3 records with NGA World Port Index identifiers.
- 5 inactive abandoned railroad station references from GeoNames.
- 27 border crossing records cross-checked against the HDX 2015 HIU source.
- 17 border crossing records with reviewed OpenSyria geography locality links.
- 23 rail terminal records with reviewed OpenSyria geography locality links.
- 1 border crossing record with reviewed GeoNames border-post enrichment.
- 2 border crossing records with reviewed Wikidata identifier enrichment.
- 3 public railway station records from reviewed Wikidata station items.
- 5 public road transit terminal records from reviewed GeoNames `TRANT` rows.
- 28 dated status snapshots from Logistics Cluster updates, covering border
  crossings, main ports, and airports.
- 5 dated route snapshots from the Logistics Cluster 2026-05-25 regional
  supply-route snapshot, published without geometry or live routing details.

The current contribution focus is Arabic facility names for records that still
lack them, remaining administrative geography links for border crossings and
rail records with ambiguous or distant matches, source review for held
ambiguous GeoNames and Wikidata rows, road and freight terminal expansion,
airport status cross-checks, route snapshot source review, and official-source
cross-checks.
