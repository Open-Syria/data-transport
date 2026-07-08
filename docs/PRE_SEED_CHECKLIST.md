# Pre-Seed Checklist

- [x] Source licenses reviewed.
- [x] Military-only and sensitive records excluded or held.
- [x] Every canonical record has an approved source.
- [x] Every canonical record has dated source references.
- [x] IDs follow `docs/ID_POLICY.md`.
- [x] Coordinates are source-backed or `null`.
- [x] External IDs are checked for duplicate identity risk.
- [x] `pnpm run validate` passes.
- [x] `pnpm run report:data` reviewed.
- [x] `pnpm run coverage:data` reviewed.

First seed completed from OurAirports, the DataHub UN/LOCODE codelist,
OpenSyria Data Geography, GeoNames Syria, Wikidata, NGA World Port Index, and
HIU/Stanford/HDX border crossing data. Reviewed GeoNames abandoned rail rows are
included only as inactive historical references. Held rows remain in local
maintainer review outputs.

Dated status snapshots are reviewed separately from stable location records.
The first two status snapshot batches use Logistics Cluster 2026-03-09 border
crossing evidence and 2026-04-30 Syria coordination meeting evidence. They do
not change canonical location `operationalStatus` values.
