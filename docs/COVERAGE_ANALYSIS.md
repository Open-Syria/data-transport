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
- OurAirports identifiers,
- UN/LOCODE identifiers.

Generated coverage output should not be committed in normal pull requests.

## Current Coverage Summary

The first seed contains 14 locations:

- 7 airport-typed records,
- 5 seaport-typed records,
- 6 road terminal records,
- 2 rail terminal records,
- 1 oil terminal record.

The current contribution focus is Arabic facility names, the unresolved
Al Thaurah/T2 locality link, and official-source cross-checks.
