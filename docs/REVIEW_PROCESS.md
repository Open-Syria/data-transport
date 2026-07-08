# Review Process

Transport records must pass:

- schema validation,
- approved-source validation,
- dated source-reference validation,
- licensing review,
- scope review,
- safety review.

Status snapshots must also pass location-reference review. They must point to
an existing canonical `locationId`, include `statusAsOf`, and keep dated status
evidence separate from stable `locations.json` identity.

Hold or reject records that are:

- military-only,
- tactical,
- checkpoint-related,
- surveillance-related,
- live operational data,
- too ambiguous to identify safely,
- unsupported by reusable public sources.

Before a public release, run:

```bash
pnpm run validate
pnpm run report:data
pnpm run coverage:data
```
