# Imports

Raw import files are not committed by default. Keep raw downloads under
`imports/raw/`, which is ignored by Git.

Every import or planned import should have a manifest under
`imports/manifests/` describing:

- source ID and title,
- source URL and license,
- access date,
- raw file names and checksums when available,
- imported fields,
- target files,
- transforms,
- review notes.

Status-only imports should target `data/status-snapshots.json`, not
`data/locations.json`, unless a maintainer explicitly approves a stable
location-level status change.

Validate manifests with:

```bash
pnpm run validate:imports
```
