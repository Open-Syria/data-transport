# ID Policy

Transport location IDs use lowercase ASCII slugs:

```text
sy-<stable-location-name>
```

Rules:

- IDs are stable after release.
- IDs should not include source-specific identifiers unless the source identifier
  is the public name.
- Names can improve without changing IDs.
- Duplicate names should be disambiguated by locality or function.
- Do not reuse deprecated IDs for a different real-world location.

External IDs belong in `externalIds`, not in the OpenSyria `id`.

Source row identifiers belong in `sourceReferences[].sourceRecordId`, not in
the OpenSyria `id`.

Status snapshot IDs extend the location ID with the observation date and source
slug:

```text
sy-<stable-location-name>-status-YYYY-MM-DD-<source-slug>
```

Snapshot IDs identify a dated observation, not a new real-world location.

Route snapshot IDs use the route or corridor slug, observation date, and source
slug:

```text
sy-route-<stable-route-or-corridor-name>-status-YYYY-MM-DD-<source-slug>
```

Route snapshot IDs identify dated source observations, not route geometry or
live route availability.
