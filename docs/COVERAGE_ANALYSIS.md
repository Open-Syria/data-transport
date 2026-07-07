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
- UN/LOCODE identifiers.

Generated coverage output should not be committed in normal pull requests.

## Current Coverage Summary

The first seed contains 42 locations:

- 7 airport-typed records,
- 5 seaport-typed records,
- 6 road terminal records,
- 30 rail terminal records,
- 1 oil terminal record.
- 42 records with dated source references.
- 41 records with upstream source-row dates.

The current contribution focus is Arabic facility names for records that still
lack them, the unresolved Al Thaurah/T2 locality link, source review for held
GeoNames rows, and official-source cross-checks.
