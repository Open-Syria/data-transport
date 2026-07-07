# Review Process

Transport records must pass:

- schema validation,
- approved-source validation,
- licensing review,
- scope review,
- safety review.

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

