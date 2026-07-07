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

opensyria-automation collect-transport-geonames \
  --output outputs/transport/geonames-candidates.json \
  --raw-dir outputs/transport/raw

opensyria-automation export-transport-geonames-seed \
  --candidates outputs/transport/geonames-candidates.json \
  --input ../data-transport/data/locations.json \
  --output ../data-transport/data/locations.json \
  --gaps-output outputs/transport/geonames-review-gaps.json
```

The local gaps files are the review queues for held source rows.
