import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  datasetReleaseStatusSchema,
  locationRecordSchema,
  parseJsonArray,
  readJson,
  releaseManifestSchema,
  routeSnapshotRecordSchema,
  sourceRecordSchema,
  statusSnapshotRecordSchema,
} from './lib/data-schemas.mjs';

const root = process.cwd();
const dataDirectory = path.resolve(root, getCliOption('--data-dir') ?? 'data');
const releaseDirectory = path.resolve(root, getCliOption('--release-dir') ?? 'dist/release');
const packageJson = await readJson(path.join(root, 'package.json'));
const releaseVersion = process.env.RELEASE_VERSION ?? `v${packageJson.version}`;
const releaseStatus = datasetReleaseStatusSchema.parse(process.env.RELEASE_STATUS ?? 'seed');
const releasePublishedAt = process.env.RELEASE_PUBLISHED_AT ?? null;
const assetBaseUrl = process.env.RELEASE_ASSET_BASE_URL;

const datasetConfigs = [
  {
    name: 'locations',
    tableName: 'transport_locations',
    fileName: 'locations.json',
    schema: locationRecordSchema,
    toPublicRecord: toLocationPublicRecord,
    toFlatRow: toLocationFlatRow,
    columns: [
      'id',
      'name_en',
      'name_ar',
      'aliases_json',
      'location_types_json',
      'transport_modes_json',
      'operational_status',
      'latitude',
      'longitude',
      'governorate_id',
      'district_id',
      'subdistrict_id',
      'locality_id',
      'locality_name_en',
      'locality_name_ar',
      'ourairports_ident',
      'iata',
      'icao',
      'un_locode',
      'wikidata_id',
      'geonames_id',
      'world_port_index',
      'website',
      'source_ids_json',
      'source_references_json',
      'latest_source_accessed_at',
      'latest_source_record_date',
      'source_status',
      'notes',
    ],
  },
  {
    name: 'status-snapshots',
    tableName: 'transport_status_snapshots',
    fileName: 'status-snapshots.json',
    schema: statusSnapshotRecordSchema,
    toPublicRecord: toStatusSnapshotPublicRecord,
    toFlatRow: toStatusSnapshotFlatRow,
    columns: [
      'id',
      'location_id',
      'observed_status',
      'status_as_of',
      'country_pair',
      'source_names_json',
      'status_note',
      'source_ids_json',
      'source_references_json',
      'latest_source_accessed_at',
      'latest_source_record_date',
      'source_status',
    ],
  },
  {
    name: 'route-snapshots',
    tableName: 'transport_route_snapshots',
    fileName: 'route-snapshots.json',
    schema: routeSnapshotRecordSchema,
    toPublicRecord: toRouteSnapshotPublicRecord,
    toFlatRow: toRouteSnapshotFlatRow,
    columns: [
      'id',
      'name_en',
      'route_type',
      'transport_modes_json',
      'observed_status',
      'status_as_of',
      'origin_en',
      'destination_en',
      'transit_countries_json',
      'location_ids_json',
      'source_names_json',
      'indicative_lead_time',
      'route_note',
      'source_ids_json',
      'source_references_json',
      'latest_source_accessed_at',
      'latest_source_record_date',
      'source_status',
    ],
  },
];

const artifactFormats = [
  {
    extension: 'json',
    format: 'json',
    mediaType: 'application/json',
    serialize: ({ records }) => stringifyJson({ items: records }),
  },
  {
    extension: 'ndjson',
    format: 'ndjson',
    mediaType: 'application/x-ndjson',
    serialize: ({ records }) => records.map((record) => stringifyCompactJson(record)).join('\n'),
  },
  {
    extension: 'csv',
    format: 'csv',
    mediaType: 'text/csv',
    serialize: ({ columns, rows }) => serializeCsv(columns, rows),
  },
  {
    extension: 'sql',
    format: 'sql',
    mediaType: 'application/sql',
    serialize: ({ columns, rows, tableName }) => serializeSql(tableName, columns, rows),
  },
  {
    extension: 'yaml',
    format: 'yaml',
    mediaType: 'application/yaml',
    serialize: ({ records }) => serializeYaml({ items: records }),
  },
  {
    extension: 'xml',
    format: 'xml',
    mediaType: 'application/xml',
    serialize: ({ name, records }) => serializeXml(name, records),
  },
];

function getCliOption(name) {
  const equalArg = process.argv.find((arg) => arg.startsWith(`${name}=`));
  const optionIndex = process.argv.indexOf(name);

  if (!equalArg && optionIndex !== -1 && process.argv[optionIndex + 1] === undefined) {
    throw new Error(`${name} requires a value`);
  }

  const value =
    equalArg?.slice(`${name}=`.length) ??
    (optionIndex === -1 ? undefined : process.argv[optionIndex + 1]);

  if (value === '' || value?.startsWith('--')) {
    throw new Error(`${name} requires a value`);
  }

  return value;
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function getArtifactUrl(relativePath) {
  if (!assetBaseUrl) {
    return undefined;
  }

  return `${assetBaseUrl.replace(/\/$/, '')}/${path.posix.basename(relativePath)}`;
}

function escapeNonAscii(value) {
  return value.replace(
    /[\u007f-\uffff]/g,
    (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`,
  );
}

function stringifyJson(data) {
  return escapeNonAscii(JSON.stringify(data, null, 2));
}

function stringifyCompactJson(data) {
  return escapeNonAscii(JSON.stringify(data));
}

function removeUndefined(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined),
  );
}

function toLocationPublicRecord(record) {
  return removeUndefined({
    id: record.id,
    name: record.name,
    aliases: record.aliases,
    locationTypes: record.locationTypes,
    transportModes: record.transportModes,
    operationalStatus: record.operationalStatus,
    coordinates: record.coordinates,
    administrativeLocation: record.administrativeLocation,
    externalIds: record.externalIds,
    sourceIds: record.sourceIds,
    sourceReferences: record.sourceReferences,
    sourceStatus: record.sourceStatus,
    notes: record.notes,
  });
}

function toLocationFlatRow(record) {
  return {
    id: record.id,
    name_en: record.name.en,
    name_ar: record.name.ar ?? null,
    aliases_json: stringifyCompactJson(record.aliases),
    location_types_json: stringifyCompactJson(record.locationTypes),
    transport_modes_json: stringifyCompactJson(record.transportModes),
    operational_status: record.operationalStatus,
    latitude: record.coordinates?.latitude ?? null,
    longitude: record.coordinates?.longitude ?? null,
    governorate_id: record.administrativeLocation?.governorateId ?? null,
    district_id: record.administrativeLocation?.districtId ?? null,
    subdistrict_id: record.administrativeLocation?.subdistrictId ?? null,
    locality_id: record.administrativeLocation?.localityId ?? null,
    locality_name_en: record.administrativeLocation?.localityName?.en ?? null,
    locality_name_ar: record.administrativeLocation?.localityName?.ar ?? null,
    ourairports_ident: record.externalIds.ourairportsIdent ?? null,
    iata: record.externalIds.iata ?? null,
    icao: record.externalIds.icao ?? null,
    un_locode: record.externalIds.unLocode ?? null,
    wikidata_id: record.externalIds.wikidata ?? null,
    geonames_id: record.externalIds.geonames ?? null,
    world_port_index: record.externalIds.worldPortIndex ?? null,
    website: record.externalIds.website ?? null,
    source_ids_json: stringifyCompactJson(record.sourceIds),
    source_references_json: stringifyCompactJson(record.sourceReferences),
    latest_source_accessed_at: latestSourceAccessedAt(record),
    latest_source_record_date: latestSourceRecordDate(record),
    source_status: record.sourceStatus,
    notes: record.notes ?? null,
  };
}

function toStatusSnapshotPublicRecord(record) {
  return removeUndefined({
    id: record.id,
    locationId: record.locationId,
    observedStatus: record.observedStatus,
    statusAsOf: record.statusAsOf,
    countryPair: record.countryPair,
    sourceNames: record.sourceNames,
    statusNote: record.statusNote,
    sourceIds: record.sourceIds,
    sourceReferences: record.sourceReferences,
    sourceStatus: record.sourceStatus,
  });
}

function toStatusSnapshotFlatRow(record) {
  return {
    id: record.id,
    location_id: record.locationId,
    observed_status: record.observedStatus,
    status_as_of: record.statusAsOf,
    country_pair: record.countryPair ?? null,
    source_names_json: stringifyCompactJson(record.sourceNames),
    status_note: record.statusNote,
    source_ids_json: stringifyCompactJson(record.sourceIds),
    source_references_json: stringifyCompactJson(record.sourceReferences),
    latest_source_accessed_at: latestSourceAccessedAt(record),
    latest_source_record_date: latestSourceRecordDate(record),
    source_status: record.sourceStatus,
  };
}

function toRouteSnapshotPublicRecord(record) {
  return removeUndefined({
    id: record.id,
    name: record.name,
    routeType: record.routeType,
    transportModes: record.transportModes,
    observedStatus: record.observedStatus,
    statusAsOf: record.statusAsOf,
    origin: record.origin,
    destination: record.destination,
    transitCountries: record.transitCountries,
    locationIds: record.locationIds,
    sourceNames: record.sourceNames,
    indicativeLeadTime: record.indicativeLeadTime,
    routeNote: record.routeNote,
    sourceIds: record.sourceIds,
    sourceReferences: record.sourceReferences,
    sourceStatus: record.sourceStatus,
  });
}

function toRouteSnapshotFlatRow(record) {
  return {
    id: record.id,
    name_en: record.name.en,
    route_type: record.routeType,
    transport_modes_json: stringifyCompactJson(record.transportModes),
    observed_status: record.observedStatus,
    status_as_of: record.statusAsOf,
    origin_en: record.origin.en,
    destination_en: record.destination.en,
    transit_countries_json: stringifyCompactJson(record.transitCountries),
    location_ids_json: stringifyCompactJson(record.locationIds),
    source_names_json: stringifyCompactJson(record.sourceNames),
    indicative_lead_time: record.indicativeLeadTime ?? null,
    route_note: record.routeNote ?? null,
    source_ids_json: stringifyCompactJson(record.sourceIds),
    source_references_json: stringifyCompactJson(record.sourceReferences),
    latest_source_accessed_at: latestSourceAccessedAt(record),
    latest_source_record_date: latestSourceRecordDate(record),
    source_status: record.sourceStatus,
  };
}

function latestSourceAccessedAt(record) {
  return latestStringValue(record.sourceReferences.map((reference) => reference.accessedAt));
}

function latestSourceRecordDate(record) {
  return latestStringValue(
    record.sourceReferences
      .map((reference) => reference.sourceRecordDate)
      .filter((value) => value !== undefined),
  );
}

function latestStringValue(values) {
  if (values.length === 0) {
    return null;
  }

  return values.toSorted().at(-1);
}

function formatTextArtifact(content) {
  if (content.length === 0) {
    return Buffer.from('\n');
  }

  return Buffer.from(`${content}\n`);
}

async function writeArtifact(relativePath, content) {
  const buffer = formatTextArtifact(content);
  const filePath = path.join(releaseDirectory, relativePath);

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, buffer);

  return buffer;
}

async function writeJson(filePath, data) {
  const buffer = Buffer.from(`${stringifyJson(data)}\n`);

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, buffer);

  return buffer;
}

function csvEscape(value) {
  if (value === null || value === undefined) {
    return '';
  }

  const text = escapeNonAscii(String(value));

  if (/[",\r\n]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }

  return text;
}

function serializeCsv(columns, rows) {
  return [
    columns.join(','),
    ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(',')),
  ].join('\n');
}

function sqlIdentifier(value) {
  return `"${value.replaceAll('"', '""')}"`;
}

function sqlValue(value) {
  if (value === null || value === undefined) {
    return 'NULL';
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return `'${escapeNonAscii(String(value)).replaceAll("'", "''")}'`;
}

function sqlColumnType(column) {
  if (column === 'latitude' || column === 'longitude') {
    return 'REAL';
  }

  return 'TEXT';
}

function serializeSql(tableName, columns, rows) {
  const createTable = [
    `CREATE TABLE IF NOT EXISTS ${sqlIdentifier(tableName)} (`,
    columns
      .map((column, index) => {
        const suffix = index === columns.length - 1 ? '' : ',';
        const primaryKey = column === 'id' ? ' PRIMARY KEY' : '';

        return `  ${sqlIdentifier(column)} ${sqlColumnType(column)}${primaryKey}${suffix}`;
      })
      .join('\n'),
    ');',
  ].join('\n');

  const inserts = rows.map((row) => {
    const identifiers = columns.map(sqlIdentifier).join(', ');
    const values = columns.map((column) => sqlValue(row[column])).join(', ');

    return `INSERT INTO ${sqlIdentifier(tableName)} (${identifiers}) VALUES (${values});`;
  });

  return [createTable, ...inserts].join('\n');
}

function yamlScalar(value) {
  if (value === null || value === undefined) {
    return 'null';
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  return escapeNonAscii(JSON.stringify(String(value)));
}

function serializeYamlValue(value, indentation = 0) {
  const indent = ' '.repeat(indentation);

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }

    return value
      .map((item) => {
        if (item && typeof item === 'object') {
          return `${indent}- ${serializeYamlValue(item, indentation + 2).trimStart()}`;
        }

        return `${indent}- ${yamlScalar(item)}`;
      })
      .join('\n');
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value);

    if (entries.length === 0) {
      return '{}';
    }

    return entries
      .map(([key, entryValue]) => {
        if (entryValue && typeof entryValue === 'object') {
          const serializedValue = serializeYamlValue(entryValue, indentation + 2);

          if (serializedValue === '[]' || serializedValue === '{}') {
            return `${indent}${key}: ${serializedValue}`;
          }

          return `${indent}${key}:\n${serializedValue}`;
        }

        return `${indent}${key}: ${yamlScalar(entryValue)}`;
      })
      .join('\n');
  }

  return yamlScalar(value);
}

function serializeYaml(value) {
  return serializeYamlValue(value);
}

function xmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
    .replace(
      /[\u007f-\uffff]/g,
      (character) => `&#x${character.charCodeAt(0).toString(16).padStart(4, '0')};`,
    );
}

function serializeXmlElement(name, value, indentation = 0) {
  const indent = ' '.repeat(indentation);

  if (value === null || value === undefined) {
    return `${indent}<${name} />`;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return `${indent}<${name} />`;
    }

    return [
      `${indent}<${name}>`,
      ...value.map((item) => serializeXmlElement('item', item, indentation + 2)),
      `${indent}</${name}>`,
    ].join('\n');
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value);

    if (entries.length === 0) {
      return `${indent}<${name} />`;
    }

    return [
      `${indent}<${name}>`,
      ...entries.map(([key, entryValue]) => serializeXmlElement(key, entryValue, indentation + 2)),
      `${indent}</${name}>`,
    ].join('\n');
  }

  return `${indent}<${name}>${xmlEscape(value)}</${name}>`;
}

function serializeXml(name, records) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<dataset name="${xmlEscape(name)}">`,
    serializeXmlElement('items', records, 2),
    '</dataset>',
  ].join('\n');
}

async function loadDataset(config) {
  return parseJsonArray(
    config.schema,
    await readJson(path.join(dataDirectory, config.fileName)),
    config.name,
  );
}

const datasetRecordsByName = new Map();

async function buildDatasetArtifacts(config) {
  const sourceRecords = await loadDataset(config);
  datasetRecordsByName.set(config.name, sourceRecords);

  const records = sourceRecords.map(config.toPublicRecord);
  const rows = records.map(config.toFlatRow);
  const artifacts = [];

  for (const artifactFormat of artifactFormats) {
    const fileName = `${config.name}.${artifactFormat.extension}`;
    const relativePath = path.posix.join('artifacts', fileName);
    const content = artifactFormat.serialize({
      name: config.name,
      tableName: config.tableName,
      columns: config.columns,
      records,
      rows,
    });
    const buffer = await writeArtifact(relativePath, content);
    const url = getArtifactUrl(relativePath);

    artifacts.push({
      name: config.name,
      format: artifactFormat.format,
      path: relativePath,
      ...(url ? { url } : {}),
      sha256: sha256(buffer),
      sizeBytes: buffer.byteLength,
      recordCount: records.length,
      mediaType: artifactFormat.mediaType,
    });
  }

  return artifacts;
}

function buildReleaseReadiness() {
  const locations = datasetRecordsByName.get('locations') ?? [];
  const routeSnapshots = datasetRecordsByName.get('route-snapshots') ?? [];
  const statusSnapshots = datasetRecordsByName.get('status-snapshots') ?? [];
  const locationCount = locations.length;
  const routeSnapshotCount = routeSnapshots.length;
  const statusSnapshotCount = statusSnapshots.length;
  const locationIds = new Set(locations.map((record) => record.id));
  const englishNameCount = locations.filter((record) => record.name.en).length;
  const sourcedCount = locations.filter((record) => record.sourceIds.length > 0).length;
  const sourceReferenceCount = locations.filter(
    (record) => record.sourceReferences.length === record.sourceIds.length,
  ).length;
  const typedCount = locations.filter(
    (record) => record.locationTypes.length > 0 && record.transportModes.length > 0,
  ).length;
  const coordinatesCount = locations.filter((record) => record.coordinates).length;
  const externalIdCount = locations.filter(
    (record) => Object.keys(record.externalIds).length > 0,
  ).length;
  const datedStatusSnapshotCount = statusSnapshots.filter((record) => record.statusAsOf).length;
  const statusSnapshotReferenceCount = statusSnapshots.filter(
    (record) => record.sourceReferences.length === record.sourceIds.length,
  ).length;
  const statusSnapshotLocationCount = statusSnapshots.filter((record) =>
    locationIds.has(record.locationId),
  ).length;
  const datedRouteSnapshotCount = routeSnapshots.filter((record) => record.statusAsOf).length;
  const routeSnapshotReferenceCount = routeSnapshots.filter(
    (record) => record.sourceReferences.length === record.sourceIds.length,
  ).length;
  const routeSnapshotLocationCount = routeSnapshots.filter((record) =>
    record.locationIds.every((locationId) => locationIds.has(locationId)),
  ).length;
  const hardRequirementsPassed =
    locationCount > 0 &&
    englishNameCount === locationCount &&
    sourcedCount === locationCount &&
    typedCount === locationCount;

  return {
    level: hardRequirementsPassed ? 'public_directory_ready' : 'raw_seed',
    publicApi: {
      status: hardRequirementsPassed ? 'approved' : 'not_approved',
      minimumLevel: 'public_directory_ready',
      reason: hardRequirementsPassed
        ? 'Approved for public transport reference endpoints. Coordinates and external IDs remain source-backed enrichment where absent.'
        : 'Public endpoints require at least one reviewed canonical location with names, source IDs, location types, and transport modes.',
    },
    checks: [
      {
        name: 'location_count',
        status: locationCount > 0 ? 'passed' : 'blocked',
        expected: 'one or more reviewed transport locations',
        actual: locationCount,
      },
      {
        name: 'english_names',
        status: englishNameCount === locationCount ? 'passed' : 'blocked',
        expected: locationCount,
        actual: englishNameCount,
      },
      {
        name: 'approved_public_sources',
        status: sourcedCount === locationCount ? 'passed' : 'blocked',
        expected: locationCount,
        actual: sourcedCount,
      },
      {
        name: 'dated_source_references',
        status: sourceReferenceCount === locationCount ? 'passed' : 'blocked',
        expected: locationCount,
        actual: sourceReferenceCount,
      },
      {
        name: 'typed_locations',
        status: typedCount === locationCount ? 'passed' : 'blocked',
        expected: locationCount,
        actual: typedCount,
      },
      {
        name: 'coordinates',
        status: coordinatesCount === locationCount ? 'passed' : 'warning',
        expected: locationCount,
        actual: coordinatesCount,
        notes: 'Coordinates must stay null until an approved public source supports them.',
      },
      {
        name: 'external_ids',
        status: externalIdCount === locationCount ? 'passed' : 'warning',
        expected: locationCount,
        actual: externalIdCount,
        notes:
          'External IDs are source-backed enrichment and may be absent for some public locations.',
      },
      {
        name: 'status_snapshot_dates',
        status: datedStatusSnapshotCount === statusSnapshotCount ? 'passed' : 'blocked',
        expected: statusSnapshotCount,
        actual: datedStatusSnapshotCount,
      },
      {
        name: 'status_snapshot_location_references',
        status: statusSnapshotLocationCount === statusSnapshotCount ? 'passed' : 'blocked',
        expected: statusSnapshotCount,
        actual: statusSnapshotLocationCount,
      },
      {
        name: 'status_snapshot_source_references',
        status: statusSnapshotReferenceCount === statusSnapshotCount ? 'passed' : 'blocked',
        expected: statusSnapshotCount,
        actual: statusSnapshotReferenceCount,
      },
      {
        name: 'route_snapshot_dates',
        status: datedRouteSnapshotCount === routeSnapshotCount ? 'passed' : 'blocked',
        expected: routeSnapshotCount,
        actual: datedRouteSnapshotCount,
      },
      {
        name: 'route_snapshot_location_references',
        status: routeSnapshotLocationCount === routeSnapshotCount ? 'passed' : 'blocked',
        expected: routeSnapshotCount,
        actual: routeSnapshotLocationCount,
      },
      {
        name: 'route_snapshot_source_references',
        status: routeSnapshotReferenceCount === routeSnapshotCount ? 'passed' : 'blocked',
        expected: routeSnapshotCount,
        actual: routeSnapshotReferenceCount,
      },
    ],
    domains: [
      {
        name: 'locations',
        status: locationCount > 0 ? 'ready' : 'empty',
        recordCount: locationCount,
        notes:
          locationCount > 0
            ? 'Canonical transport location records pass the configured seed requirements.'
            : 'The canonical location file is schema-ready but not populated yet.',
      },
      {
        name: 'status_snapshots',
        status: statusSnapshotCount > 0 ? 'ready' : 'empty',
        recordCount: statusSnapshotCount,
        notes:
          statusSnapshotCount > 0
            ? 'Dated status snapshots are published separately from stable location identity.'
            : 'No dated status snapshots are published yet.',
      },
      {
        name: 'route_snapshots',
        status: routeSnapshotCount > 0 ? 'partial' : 'empty',
        recordCount: routeSnapshotCount,
        notes:
          routeSnapshotCount > 0
            ? 'Dated high-level route snapshots are published without route geometry or live operational guarantees.'
            : 'No dated route snapshots are published yet.',
      },
    ],
    blockers: hardRequirementsPassed ? [] : ['canonical_location_seed_empty_or_incomplete'],
  };
}

const sources = parseJsonArray(
  sourceRecordSchema,
  await readJson(path.join(dataDirectory, 'sources.json')),
  'sources',
);
const approvedSources = sources.filter((source) => source.status === 'approved');
const artifacts = [];

for (const config of datasetConfigs) {
  artifacts.push(...(await buildDatasetArtifacts(config)));
}

const manifest = {
  schemaVersion: '1.0',
  generatedAt: new Date().toISOString(),
  dataset: {
    id: 'opensyria-transport',
    slug: 'transport',
    repository: 'data-transport',
    category: 'transport',
    title: {
      en: 'Transport Locations',
      ar: '\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0646\u0642\u0644',
    },
  },
  release: {
    version: releaseVersion,
    status: releaseStatus,
    publishedAt: releasePublishedAt,
    notes: 'Generated transport release artifacts.',
  },
  artifacts,
  sources: approvedSources.map((source) => ({
    id: source.id,
    title: source.title,
    url: source.url,
    license: source.license,
    fields: source.fields,
  })),
  readiness: buildReleaseReadiness(),
};

releaseManifestSchema.parse(manifest);

await writeJson(path.join(releaseDirectory, 'release-manifest.json'), manifest);

console.log(
  JSON.stringify(
    {
      ok: true,
      dataDirectory: path.relative(root, dataDirectory).replaceAll('\\', '/'),
      releaseDirectory,
      artifacts: manifest.artifacts,
    },
    null,
    2,
  ),
);
