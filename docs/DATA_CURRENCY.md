# Data Currency

Transport data changes over time. This repository stores public reference data,
not live operating conditions.

Fields most likely to change:

- public names,
- public identifiers,
- official websites,
- coordinates and source corrections,
- closed or renamed locations.

Use `sourceReferences[].accessedAt` to see when the source data was collected or
reviewed for a record. Use `sourceReferences[].sourceRecordDate` to see the
upstream row date when the source provides one, such as UN/LOCODE month-level
dates, GeoNames day-level modification dates, or a dated status update
publication.

Dated operating evidence belongs in `data/status-snapshots.json` with
`statusAsOf`. These snapshots are historical observations from public sources,
not live access data.

Dated route or corridor evidence belongs in `data/route-snapshots.json` with
`statusAsOf`. Route snapshots are historical high-level observations from
public sources, not live routing guidance, route geometry, or schedule data.

Before each release:

1. Recheck source access dates.
2. Recheck whether OurAirports or UN/LOCODE published newer data.
3. Update record-level `sourceReferences` when imports are refreshed.
4. Keep uncertain live status as `unknown`.
5. Add recent status only as a dated snapshot with source date and review notes.
6. Do not publish live route availability, route geometry, or tactical
   operational status.

## Current Source Access

The first seed used OurAirports and the DataHub UN/LOCODE codelist accessed at
`2026-07-07T21:51:07.081Z`.

Official UNECE UN/LOCODE currentness was reviewed on
`2026-07-08T00:10:25.317Z` against the 2025-1 production package and the
pre-release listed as last updated `2026-06-16`; both contained the same Syria
location-code rows as the reviewed DataHub mirror.

OpenSyria Data Geography locality links, including the rail terminal locality
link batch, were reviewed against the local `../data-geography/data/localities.json`
file on `2026-07-08`.

GeoNames rail, inactive abandoned rail, and port expansion rows used the Syria
country dump accessed at `2026-07-07T22:24:22.381Z`.

GeoNames border-post enrichment for Nasib reused the same Syria country dump and
stored the GeoNames day-level modification date as the source-row date.

GeoNames airport identifier enrichment reused the same Syria country dump and
accepted only reviewed matches to existing public airport records.

GeoNames road transit terminal expansion reused the Syria country dump accessed
at `2026-07-08T00:44:07.416Z`. Record-level `sourceRecordDate` values come
from GeoNames day-level modification dates. The batch imports stable public
terminal reference locations only, not live departures, routes, or service
status.

Wikidata airport identifier enrichment used exact IATA and ICAO matches accessed
at `2026-07-07T22:44:40.220Z`.

Wikidata exact GeoNames ID enrichment used a SPARQL query accessed at
`2026-07-07T23:56:29.110Z`.

Wikidata exact UN/LOCODE enrichment used a SPARQL query accessed at
`2026-07-08T00:00:28.469Z`. Record-level `sourceRecordDate` values come from
Wikidata item modified timestamps.

Wikidata railway station expansion used a SPARQL query accessed at
`2026-07-08T00:15:58.378Z`. Record-level `sourceRecordDate` values come from
Wikidata item modified timestamps, and operational status remains `unknown`.

Wikidata port modeling review used a SPARQL query accessed at
`2026-07-08T00:27:06.606Z`. No canonical records were added because reviewed
port-specific items were duplicate-risk or out of scope.

Wikidata border crossing enrichment used a SPARQL query accessed at
`2026-07-08T00:30:56.148Z`. Record-level `sourceRecordDate` values come from
Wikidata item modified timestamps. The batch enriched exact existing public
crossing records only and did not import live crossing status or checkpoint
operations.

NGA World Port Index enrichment used the official `UpdatedPub150.csv` download
accessed at `2026-07-07T23:27:03.137Z`. The WPI CSV does not expose per-row
dates, so record-level WPI references use source access timestamps and WPI
numbers.

HIU/Stanford border crossing records use a public-domain source issued on
`2014-03-12` and accessed at `2026-07-07T23:04:31.920Z`. They are stable
reference points only and must not be read as current crossing operating status.

HDX border crossing enrichment uses the archived public-domain HIU CSV dated
`2015-06-11`, accessed at `2026-07-07T23:13:40.384Z`. HDX package metadata was
modified in 2025, but the imported record facts remain historical 2015
reference data, not live status.

Logistics Cluster border crossing status snapshots use the public Syria access
update published on `2026-03-09` and reviewed on
`2026-07-08T09:25:11.490Z`. The 9 imported rows are dated observations only.

Logistics Cluster Syria coordination meeting status snapshots use the 30 April
2026 meeting minutes, published/revised on `2026-05-14` and reviewed on
`2026-07-08T10:06:11.213Z`. The 12 imported rows are dated observations for
border crossings, ports, and airports. They do not change the canonical
`operationalStatus` values in `data/locations.json`.

Logistics Cluster regional supply-route status and route snapshots use the 25
May 2026 regional Middle East supply-route snapshot, published/revised on
`2026-05-25` and reviewed on `2026-07-08T10:12:08.051Z`. The 5 imported status
rows are point-location observations for named crossings and ports. The 5
imported route rows are high-level dated route/corridor observations with
origin/destination labels, matched location IDs, source names, and indicative
lead time only. Exact route geometry, ambiguous alternate route rows, tactical
details, and live routing claims remain out of scope.

Every canonical record currently has at least one dated source reference and at
least one upstream source-row date.
