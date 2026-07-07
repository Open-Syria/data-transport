import path from 'node:path';
import {
  ensureAliasQuality,
  ensureKnownSources,
  ensureLocationQuality,
  ensurePublicationTextChecksPass,
  ensureUnique,
  locationRecordSchema,
  parseJsonArray,
  readJson,
  sourceRecordSchema,
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

  return {
    locations,
    sources,
  };
}

function validateData(data) {
  ensurePublicationTextChecksPass(data, 'data');
  ensureUnique(data.sources, (source) => source.id, 'sources');
  ensureUnique(data.locations, (record) => record.id, 'locations');
  ensureKnownSources(data.locations, data.sources, 'location');
  ensureAliasQuality(data.locations, 'location');
  ensureLocationQuality(data.locations);
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
        sources: data.sources.length,
      },
    },
    null,
    2,
  ),
);
