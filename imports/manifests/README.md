# Import Manifests

Import manifests document source review and transformation decisions. They are
not a substitute for reviewing the canonical `data/*.json` output.

Use `source-import.template.json` as the starting point for a new source
review. Include `data/status-snapshots.json` in `targetFiles` when importing
dated operational evidence instead of stable location identity.

Include `data/route-snapshots.json` in `targetFiles` only for high-level,
source-dated route or corridor observations without geometry, live routing
guidance, convoy information, or tactical details.
