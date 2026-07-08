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

Release builds currently publish `locations` and `status-snapshots` artifacts.

Flat CSV and SQL location artifacts include `world_port_index`,
`source_references_json`, `latest_source_accessed_at`, and
`latest_source_record_date` columns derived from canonical records and
`sourceReferences`.

Flat CSV and SQL status snapshot artifacts include `location_id`,
`observed_status`, `status_as_of`, `source_names_json`, `status_note`,
`source_references_json`, `latest_source_accessed_at`, and
`latest_source_record_date`.

Do not edit generated artifacts directly.
