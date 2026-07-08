# Release Checklist

- [ ] `CHANGELOG.md` has the release heading.
- [ ] `pnpm run validate` passes.
- [ ] `pnpm run report:data` reviewed.
- [ ] `pnpm run coverage:data` reviewed.
- [ ] Source access timestamps and source-row dates are current.
- [ ] Source decisions and known gaps are documented.
- [ ] Route snapshots, if present, are dated, source-backed, high-level, and
      free of geometry or live routing details.
- [ ] Release artifacts are built with the intended version.
- [ ] `release-manifest.json` contains only approved sources and visible source
      license limitations.

Prepare artifacts:

```bash
pnpm run release:prepare -- --version v0.1.0
```
