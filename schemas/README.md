# Schemas

JSON Schemas define the public canonical shapes for transport data.

- `locations.schema.json` validates canonical transport and trade location records.
  Location records include dated `sourceReferences` so consumers can inspect
  source access time and source-row dates.
- `sources.schema.json` validates source registry entries.
- `source-import.schema.json` validates import manifests.
- `release-manifest.schema.json` validates generated release manifests.

Run:

```bash
pnpm run validate:schemas
```
