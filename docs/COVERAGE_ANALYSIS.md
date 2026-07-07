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

