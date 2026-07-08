# Import Manifests

Import manifests document source review and transformation decisions. They are
not a substitute for reviewing the canonical `data/*.json` output.

Use `source-import.template.json` as the starting point for a new source
review. Include `data/status-snapshots.json` in `targetFiles` when importing
dated operational evidence instead of stable location identity.
