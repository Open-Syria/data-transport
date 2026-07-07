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
- any external ID,
- dated source references,
- source-row dates,
- OurAirports identifiers,
- UN/LOCODE identifiers,
- Wikidata identifiers.

Generated coverage output should not be committed in normal pull requests.

## Current Coverage Summary

The first seed contains 77 locations:

- 6 airport-typed records,
- 30 border crossing records,
- 5 seaport-typed records,
- 6 terminal records,
- 6 road terminal records,
- 30 rail terminal records,
- 1 oil terminal record.
- 77 records with dated source references.
- 77 records with upstream source-row dates.
- 63 records with administrative location data.
- 43 records with GeoNames identifiers.
- 6 records with Wikidata identifiers.
- 3 records with NGA World Port Index identifiers.
- 27 border crossing records cross-checked against the HDX 2015 HIU source.
- 17 border crossing records with reviewed OpenSyria geography locality links.

The current contribution focus is Arabic facility names for records that still
lack them, remaining administrative geography links for border crossings and
rail records, source review for held ambiguous GeoNames and Wikidata rows, and
official-source cross-checks.
