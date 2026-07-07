# Import Workflow

1. Add or update a source manifest under `imports/manifests/`.
2. Store ignored raw files under `imports/raw/`.
3. Normalize records into `data/locations.json`.
4. Add or update source entries in `data/sources.json`.
5. Run validation and reports.
6. Document source decisions and known gaps.

Never import all rows blindly. Filter by scope, license, and safety.

