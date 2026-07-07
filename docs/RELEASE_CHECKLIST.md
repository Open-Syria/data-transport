# Release Checklist

- [ ] `CHANGELOG.md` has the release heading.
- [ ] `pnpm run validate` passes.
- [ ] `pnpm run report:data` reviewed.
- [ ] `pnpm run coverage:data` reviewed.
- [ ] Source access timestamps and source-row dates are current.
- [ ] Source decisions and known gaps are documented.
- [ ] Release artifacts are built with the intended version.
- [ ] `release-manifest.json` contains only approved sources.

Prepare artifacts:

```bash
pnpm run release:prepare -- --version v0.1.0
```
