# Data Quality

Validation answers: "Is this data structurally allowed?"

Reporting answers: "How complete, sourceable, and reviewable is this data?"

Run:

```bash
pnpm run validate
pnpm run report:data
pnpm run coverage:data
```

Validation fails on:

- invalid JSON shape,
- unknown fields,
- missing required fields,
- duplicate IDs,
- duplicate source IDs on one record,
- records that reference unknown sources,
- records that reference non-approved sources,
- duplicate aliases within a record,
- aliases that duplicate canonical names,
- duplicate external identifiers where uniqueness is expected.

Completeness targets vary by field. Missing coordinates, Arabic names, and
external IDs are acceptable when no approved public source supports them.

