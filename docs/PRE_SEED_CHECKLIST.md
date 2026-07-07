# Pre-Seed Checklist

- [x] Source licenses reviewed.
- [x] Military-only and sensitive records excluded or held.
- [x] Every canonical record has an approved source.
- [x] IDs follow `docs/ID_POLICY.md`.
- [x] Coordinates are source-backed or `null`.
- [x] External IDs are checked for duplicate identity risk.
- [x] `pnpm run validate` passes.
- [x] `pnpm run report:data` reviewed.
- [x] `pnpm run coverage:data` reviewed.

First seed completed from OurAirports, the DataHub UN/LOCODE codelist,
OpenSyria Data Geography, and GeoNames Syria. Held rows remain in local
maintainer review outputs.
