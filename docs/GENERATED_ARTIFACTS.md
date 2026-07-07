# Generated Artifacts

`pnpm run release:build` writes release files under `dist/release/`.

Artifacts are generated from canonical JSON and include:

- JSON,
- NDJSON,
- CSV,
- SQL,
- YAML,
- XML,
- `release-manifest.json`.

Flat CSV and SQL location artifacts include `world_port_index`,
`source_references_json`, `latest_source_accessed_at`, and
`latest_source_record_date` columns derived from canonical records and
`sourceReferences`.

Do not edit generated artifacts directly.
