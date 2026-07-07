# Import Workflow

1. Add or update a source manifest under `imports/manifests/`.
2. Store ignored raw files under `imports/raw/`.
3. Normalize records into `data/locations.json`.
4. Add or update source entries in `data/sources.json`.
5. Run validation and reports.
6. Document source decisions and known gaps.

Never import all rows blindly. Filter by scope, license, and safety.

## Current Automation Path

The first seed was prepared from the local `../data-automation` repository:

```bash
opensyria-automation collect-transport-sources \
  --output outputs/transport/source-candidates.json \
  --raw-dir outputs/transport/raw

opensyria-automation export-transport-seed \
  --candidates outputs/transport/source-candidates.json \
  --output ../data-transport/data/locations.json \
  --gaps-output outputs/transport/seed-review-gaps.json
```

The local gaps file is the review queue for held source rows.
