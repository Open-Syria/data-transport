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
| `externalIds` | Public identifiers such as IATA, ICAO, UN/LOCODE, Wikidata, GeoNames, or OurAirports. |
| `sourceIds` | Approved sources supporting the record. |
| `sourceStatus` | Release lifecycle status for the record. |
| `notes` | Maintainer review notes for uncertainty or scope decisions. |

