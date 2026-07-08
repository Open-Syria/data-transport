import path from 'node:path';
import {
  ensureAliasQuality,
  ensureKnownSources,
  ensureLocationQuality,
  ensurePublicationTextChecksPass,
  ensureRouteSnapshotQuality,
  ensureStatusSnapshotQuality,
  ensureUnique,
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

async function loadData(dataDirectory) {
  const sources = parseJsonArray(
    sourceRecordSchema,
    await readJson(path.join(dataDirectory, 'sources.json')),
    'sources',
  );
  const locations = parseJsonArray(
    locationRecordSchema,
    await readJson(path.join(dataDirectory, 'locations.json')),
    'locations',
  );
  const statusSnapshots = parseJsonArray(
    statusSnapshotRecordSchema,
    await readJson(path.join(dataDirectory, 'status-snapshots.json')),
    'statusSnapshots',
  );
  const routeSnapshots = parseJsonArray(
    routeSnapshotRecordSchema,
    await readJson(path.join(dataDirectory, 'route-snapshots.json')),
    'routeSnapshots',
  );

  return {
    locations,
    routeSnapshots,
    sources,
    statusSnapshots,
  };
}

function validateData(data) {
  ensurePublicationTextChecksPass(data, 'data');
  ensureUnique(data.sources, (source) => source.id, 'sources');
  ensureUnique(data.locations, (record) => record.id, 'locations');
  ensureUnique(data.routeSnapshots, (record) => record.id, 'routeSnapshots');
  ensureUnique(data.statusSnapshots, (record) => record.id, 'statusSnapshots');
  ensureKnownSources(data.locations, data.sources, 'location');
  ensureKnownSources(data.routeSnapshots, data.sources, 'routeSnapshot');
  ensureKnownSources(data.statusSnapshots, data.sources, 'statusSnapshot');
  ensureAliasQuality(data.locations, 'location');
  ensureLocationQuality(data.locations);
  ensureRouteSnapshotQuality(data.routeSnapshots, data.locations);
  ensureStatusSnapshotQuality(data.statusSnapshots, data.locations);
}

const dataDirectory = getDataDirectory();
const data = await loadData(dataDirectory);

validateData(data);

console.log(
  JSON.stringify(
    {
      ok: true,
      dataDirectory: path.relative(root, dataDirectory).replaceAll('\\', '/'),
      counts: {
        locations: data.locations.length,
        routeSnapshots: data.routeSnapshots.length,
        sources: data.sources.length,
        statusSnapshots: data.statusSnapshots.length,
      },
    },
    null,
    2,
  ),
);
