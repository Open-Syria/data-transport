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
- Wikidata identifiers.

Generated coverage output should not be committed in normal pull requests.

## Current Coverage Summary

The first seed contains 85 locations:

- 6 airport-typed records,
- 30 border crossing records,
- 5 seaport-typed records,
- 6 terminal records,
- 6 road terminal records,
- 38 rail terminal records,
- 1 oil terminal record.
- 85 records with dated source references.
- 85 records with upstream source-row dates.
- 71 records with administrative location data.
- 57 records with reviewed OpenSyria geography locality IDs.
- 49 records with GeoNames identifiers.
- 19 records with Wikidata identifiers.
- 3 records with NGA World Port Index identifiers.
- 5 inactive abandoned railroad station references from GeoNames.
- 27 border crossing records cross-checked against the HDX 2015 HIU source.
- 17 border crossing records with reviewed OpenSyria geography locality links.
- 23 rail terminal records with reviewed OpenSyria geography locality links.
- 1 border crossing record with reviewed GeoNames border-post enrichment.
- 3 public railway station records from reviewed Wikidata station items.

The current contribution focus is Arabic facility names for records that still
lack them, remaining administrative geography links for border crossings and
rail records with ambiguous or distant matches, source review for held ambiguous
GeoNames and Wikidata rows,
airport status cross-checks, and official-source cross-checks.
