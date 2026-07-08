# Contributing

Thank you for helping improve OpenSyria transport data.

## Good Contributions

- correct a public transport or trade location record,
- add a missing public reference location within the approved scope,
- improve names, aliases, source attribution, coordinates, or external IDs,
- add dated status snapshots when a maintainer-approved public source supports
  the `statusAsOf` date,
- document uncertainty or source conflicts,
- improve examples, schemas, or validation when maintainer-approved.

## Not Accepted

Do not add:

- personal data,
- private addresses or contact details,
- checkpoint or surveillance-related data,
- military-only or tactical transport locations,
- live operational status or undated status claims,
- proprietary map data,
- data from sources that do not allow redistribution.

## Normal Data Pull Request

1. Read `README.md`, `docs/FIELD_REFERENCE.md`, `docs/SOURCES.md`, and
   `contributions/README.md`.
2. Keep the edit focused.
3. Use approved public sources and include source IDs plus dated
   `sourceReferences`. For status snapshots, include `statusAsOf` and keep the
   edit separate from stable location identity.
4. Run:

   ```bash
   pnpm run validate
   ```

5. Explain what changed, why, and which public sources support it.

Schema, source policy, release tooling, and dataset-scope changes require
maintainer discussion before implementation.
