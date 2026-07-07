# Releases

Releases publish generated artifacts from canonical JSON files.

Prepare a release:

```bash
pnpm run release:prepare -- --version v0.1.0
```

Build only:

```bash
pnpm run release:build
```

Generated files are written to `dist/release/`.

