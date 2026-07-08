import path from 'node:path';
import {
  locationRecordSchema,
  parseJsonArray,
  readJson,
  routeSnapshotRecordSchema,
  sourceRecordSchema,
  statusSnapshotRecordSchema,
} from './lib/data-schemas.mjs';

const root = process.cwd();

function getDataDirectory() {
  const dataDirArg = process.argv.find((arg) => arg.startsWith('--data-dir='));
  const dataDirIndex = process.argv.indexOf('--data-dir');

  if (!dataDirArg && dataDirIndex !== -1 && process.argv[dataDirIndex + 1] === undefined) {
    throw new Error('--data-dir requires a directory path');
  }

  const dataDirValue =
    dataDirArg?.slice('--data-dir='.length) ??
    (dataDirIndex === -1 ? undefined : process.argv[dataDirIndex + 1]);

  if (dataDirValue === '' || dataDirValue?.startsWith('--')) {
    throw new Error('--data-dir requires a directory path');
  }

  return path.resolve(root, dataDirValue ?? 'data');
}

function countBy(records, getKey) {
  return Object.fromEntries(
    [
      ...records.reduce((counts, record) => {
        const key = getKey(record);

        counts.set(key, (counts.get(key) ?? 0) + 1);

        return counts;
      }, new Map()),
    ].sort(([first], [second]) => first.localeCompare(second)),
  );
}

async function loadData(dataDirectory) {
  return {
    sources: parseJsonArray(
      sourceRecordSchema,
      await readJson(path.join(dataDirectory, 'sources.json')),
      'sources',
    ),
    locations: parseJsonArray(
      locationRecordSchema,
      await readJson(path.join(dataDirectory, 'locations.json')),
      'locations',
    ),
    statusSnapshots: parseJsonArray(
      statusSnapshotRecordSchema,
      await readJson(path.join(dataDirectory, 'status-snapshots.json')),
      'statusSnapshots',
    ),
    routeSnapshots: parseJsonArray(
      routeSnapshotRecordSchema,
      await readJson(path.join(dataDirectory, 'route-snapshots.json')),
      'routeSnapshots',
    ),
  };
}

function summarizeLocations(locations) {
  return {
    count: locations.length,
    bySourceStatus: countBy(locations, (record) => record.sourceStatus),
    byOperationalStatus: countBy(locations, (record) => record.operationalStatus),
    byLocationType: countBy(
      locations.flatMap((record) => record.locationTypes.map((locationType) => ({ locationType }))),
      (record) => record.locationType,
    ),
    byTransportMode: countBy(
      locations.flatMap((record) =>
        record.transportModes.map((transportMode) => ({ transportMode })),
      ),
      (record) => record.transportMode,
    ),
    withArabicName: locations.filter((record) => Boolean(record.name.ar)).length,
    withCoordinates: locations.filter((record) => Boolean(record.coordinates)).length,
    withAdministrativeLocation: locations.filter((record) => Boolean(record.administrativeLocation))
      .length,
    withAdministrativeLocality: locations.filter((record) =>
      Boolean(record.administrativeLocation?.localityId),
    ).length,
    withExternalIds: locations.filter((record) => Object.keys(record.externalIds).length > 0)
      .length,
    withSourceReferences: locations.filter((record) => record.sourceReferences.length > 0).length,
    withSourceRecordDate: locations.filter((record) =>
      record.sourceReferences.some((reference) => reference.sourceRecordDate),
    ).length,
    withOurAirportsIdent: locations.filter((record) => Boolean(record.externalIds.ourairportsIdent))
      .length,
    withUnLocode: locations.filter((record) => Boolean(record.externalIds.unLocode)).length,
    withGeoNames: locations.filter((record) => Boolean(record.externalIds.geonames)).length,
    withWikidata: locations.filter((record) => Boolean(record.externalIds.wikidata)).length,
    withWorldPortIndex: locations.filter((record) => Boolean(record.externalIds.worldPortIndex))
      .length,
    withOpenSyriaGeography: locations.filter((record) =>
      record.sourceIds.includes('opensyria-data-geography'),
    ).length,
  };
}

function summarizeStatusSnapshots(statusSnapshots) {
  return {
    count: statusSnapshots.length,
    byObservedStatus: countBy(statusSnapshots, (record) => record.observedStatus),
    byStatusAsOf: countBy(statusSnapshots, (record) => record.statusAsOf),
    bySourceStatus: countBy(statusSnapshots, (record) => record.sourceStatus),
    withSourceReferences: statusSnapshots.filter((record) => record.sourceReferences.length > 0)
      .length,
    withSourceRecordDate: statusSnapshots.filter((record) =>
      record.sourceReferences.some((reference) => reference.sourceRecordDate),
    ).length,
  };
}

function summarizeRouteSnapshots(routeSnapshots) {
  return {
    count: routeSnapshots.length,
    byRouteType: countBy(routeSnapshots, (record) => record.routeType),
    byObservedStatus: countBy(routeSnapshots, (record) => record.observedStatus),
    byStatusAsOf: countBy(routeSnapshots, (record) => record.statusAsOf),
    byTransportMode: countBy(
      routeSnapshots.flatMap((record) =>
        record.transportModes.map((transportMode) => ({ transportMode })),
      ),
      (record) => record.transportMode,
    ),
    withLocationIds: routeSnapshots.filter((record) => record.locationIds.length > 0).length,
    withSourceReferences: routeSnapshots.filter((record) => record.sourceReferences.length > 0)
      .length,
    withSourceRecordDate: routeSnapshots.filter((record) =>
      record.sourceReferences.some((reference) => reference.sourceRecordDate),
    ).length,
  };
}

const dataDirectory = getDataDirectory();
const data = await loadData(dataDirectory);

console.log(
  JSON.stringify(
    {
      ok: true,
      dataDirectory: path.relative(root, dataDirectory).replaceAll('\\', '/'),
      sources: {
        count: data.sources.length,
        byStatus: countBy(data.sources, (source) => source.status),
        byLicense: countBy(data.sources, (source) => source.license),
      },
      locations: summarizeLocations(data.locations),
      routeSnapshots: summarizeRouteSnapshots(data.routeSnapshots),
      statusSnapshots: summarizeStatusSnapshots(data.statusSnapshots),
    },
    null,
    2,
  ),
);
