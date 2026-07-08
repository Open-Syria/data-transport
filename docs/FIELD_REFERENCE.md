# Field Reference

## Location Fields

| Field | Description |
| --- | --- |
| `id` | Stable OpenSyria ID such as `sy-damascus-international-airport`. |
| `name.en` | Required English canonical name. |
| `name.ar` | Optional Arabic canonical name when source-backed. |
| `aliases` | Alternate names, spellings, transliterations, or historical names. |
| `locationTypes` | Public reference type such as `airport`, `seaport`, or `terminal`. |
| `transportModes` | Transport modes such as `air`, `maritime`, `rail`, or `road`. |
| `operationalStatus` | Conservative public status: `active`, `inactive`, `closed`, or `unknown`. |
| `coordinates` | WGS84 point from an approved reusable source, or `null`. |
| `administrativeLocation` | Optional OpenSyria geography IDs or public locality names. |
| `externalIds` | Public identifiers such as IATA, ICAO, UN/LOCODE, Wikidata, GeoNames, World Port Index, or OurAirports. |
| `sourceIds` | Approved sources supporting the record. |
| `sourceReferences` | Dated source evidence for each `sourceIds` entry, including source access time and source-row ID/date when available. |
| `sourceReferences[].sourceId` | Approved source ID matching one entry in `sourceIds`. |
| `sourceReferences[].sourceRecordId` | Source-specific row or feature identifier, such as an OurAirports ident, UN/LOCODE, GeoNames ID, World Port Index number, or OpenSyria geography locality ID. |
| `sourceReferences[].sourceRecordDate` | Source-provided row date when available. Precision may be year, month, or day, for example `2026`, `2006-01`, or `2020-06-10`. |
| `sourceReferences[].accessedAt` | ISO timestamp for when the source data used by this record was accessed or reviewed. |
| `sourceStatus` | Release lifecycle status for the record. |
| `notes` | Maintainer review notes for uncertainty or scope decisions. |

## Status Snapshot Fields

| Field | Description |
| --- | --- |
| `id` | Stable snapshot ID such as `sy-nasib-border-crossing-status-2026-03-09-logistics-cluster`. |
| `locationId` | Existing canonical transport location ID that the observation describes. |
| `observedStatus` | Dated observed status: `active`, `limited`, `closed`, `inactive`, or `unknown`. |
| `statusAsOf` | Day-level date for the observation. Status snapshots require this field. |
| `countryPair` | Optional country pair or corridor label from the source context. |
| `sourceNames` | Source-provided names used to match the observation to a canonical location. |
| `statusNote` | Concise source-backed note explaining the observed status. |
| `sourceIds` | Approved sources supporting the snapshot. |
| `sourceReferences` | Dated source evidence for each `sourceIds` entry. |
| `sourceStatus` | Release lifecycle status for the snapshot. |
