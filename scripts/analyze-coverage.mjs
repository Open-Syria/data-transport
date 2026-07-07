import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  locationRecordSchema,
  parseJsonArray,
  readJson,
  sourceRecordSchema,
} from './lib/data-schemas.mjs';

const root = process.cwd();
const dataDirectory = path.resolve(root, getCliOption('--data-dir') ?? 'data');
const outputDirectory = path.resolve(root, getCliOption('--out-dir') ?? 'dist/coverage');
const maxItems = Number.parseInt(getCliOption('--max-items') ?? '25', 10);

if (!Number.isInteger(maxItems) || maxItems < 1) {
  throw new Error('--max-items must be a positive integer');
}

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

async function loadData() {
  return {
    locations: parseJsonArray(
      locationRecordSchema,
      await readJson(path.join(dataDirectory, 'locations.json')),
      'locations',
    ),
    sources: parseJsonArray(
      sourceRecordSchema,
      await readJson(path.join(dataDirectory, 'sources.json')),
      'sources',
    ),
  };
}

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function fieldMetric(label, priority, records, hasValue) {
  const missingRecords = records.filter((record) => !hasValue(record));

  return {
    label,
    priority,
    expected: records.length,
    present: records.length - missingRecords.length,
    missing: missingRecords.length,
    knownMissing: 0,
    actionableMissing: missingRecords.length,
    percent: percent(records.length - missingRecords.length, records.length),
    actionableMissingRecordIds: ids(missingRecords),
  };
}

function buildLocationCoverage(data) {
  return {
    total: data.locations.length,
    fields: {
      englishName: fieldMetric('English canonical name', 'high', data.locations, (record) =>
        hasText(record.name.en),
      ),
      arabicName: fieldMetric('Arabic canonical name', 'low', data.locations, (record) =>
        hasText(record.name.ar),
      ),
      coordinates: fieldMetric('Coordinates', 'medium', data.locations, (record) =>
        Boolean(record.coordinates),
      ),
      administrativeLocation: fieldMetric(
        'Administrative location',
        'medium',
        data.locations,
        (record) => Boolean(record.administrativeLocation),
      ),
      externalId: fieldMetric(
        'Any external ID',
        'medium',
        data.locations,
        (record) => Object.keys(record.externalIds).length > 0,
      ),
      ourAirportsIdent: fieldMetric('OurAirports ident', 'low', data.locations, (record) =>
        Boolean(record.externalIds.ourairportsIdent),
      ),
      unLocode: fieldMetric('UN/LOCODE', 'low', data.locations, (record) =>
        Boolean(record.externalIds.unLocode),
      ),
    },
  };
}

function buildContributionFocus(report) {
  if (report.locations.total === 0) {
    return [];
  }

  return Object.entries(report.locations.fields)
    .flatMap(([fieldId, field]) => {
      if (field.actionableMissing === 0) {
        return [];
      }

      return [
        {
          priority: field.priority,
          area: `locations.${fieldId}`,
          title: `Improve ${field.label.toLowerCase()} coverage`,
          count: field.actionableMissing,
          recordIds: field.actionableMissingRecordIds,
          action: buildFieldAction(field.label),
        },
      ];
    })
    .sort((left, right) => priorityWeight(right.priority) - priorityWeight(left.priority));
}

function buildFieldAction(label) {
  const lowerLabel = label.toLowerCase();

  if (lowerLabel.includes('coordinates')) {
    return 'Add WGS84 coordinates only from approved source-backed location data.';
  }

  if (lowerLabel.includes('administrative')) {
    return 'Link records to OpenSyria geography IDs or public locality names after source review.';
  }

  if (lowerLabel.includes('un/locode')) {
    return 'Add UN/LOCODE only after checking the current code list and row identity.';
  }

  if (lowerLabel.includes('ourairports')) {
    return 'Add OurAirports identifiers only for public civil/reference records approved for publication.';
  }

  return `Add missing ${lowerLabel} values with approved public sources.`;
}

function buildDatasetCounts(data) {
  return {
    sources: data.sources.length,
    locations: data.locations.length,
  };
}

function buildMarkdown(report) {
  const lines = [
    '# Transport Coverage Report',
    '',
    `Generated at: ${report.generatedAt}`,
    '',
    `Data directory: \`${report.dataDirectory}\``,
    '',
    'This report identifies missing fields and source-backed enrichment gaps in the canonical data. It does not prove real-world completeness.',
    '',
    '## Dataset Summary',
    '',
    markdownTable(
      ['Dataset', 'Records'],
      Object.entries(report.counts).map(([datasetName, count]) => [datasetName, count]),
    ),
    '',
    '## Location Coverage',
    '',
    markdownTable(
      ['Field', 'Expected', 'Present', 'Missing', 'Actionable missing', 'Coverage', 'Examples'],
      Object.values(report.locations.fields).map((field) => [
        field.label,
        field.expected,
        field.present,
        field.missing,
        field.actionableMissing,
        coverageCell(field),
        sampleIds(field.actionableMissingRecordIds),
      ]),
    ),
    '',
    '## Contribution Focus',
    '',
  ];

  if (report.contributionFocus.length === 0) {
    lines.push('No actionable coverage gaps were detected for the configured checks.', '');
  } else {
    lines.push(
      markdownTable(
        ['Priority', 'Area', 'Missing', 'Action', 'Example records'],
        report.contributionFocus.map((item) => [
          item.priority,
          item.area,
          item.count,
          item.action,
          sampleIds(item.recordIds),
        ]),
      ),
      '',
    );
  }

  return `${lines.join('\n')}\n`;
}

function coverageCell(metric) {
  return metric.expected === 0 ? 'n/a' : `${metric.percent}%`;
}

function sampleIds(recordIds) {
  if (recordIds.length === 0) {
    return '-';
  }

  const sampledIds = recordIds.slice(0, maxItems);
  const suffix =
    recordIds.length > sampledIds.length ? `, +${recordIds.length - sampledIds.length}` : '';

  return `${sampledIds.map((id) => `\`${id}\``).join(', ')}${suffix}`;
}

function markdownTable(headers, rows) {
  return [
    `| ${headers.map(escapeMarkdownCell).join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map(
      (row) => `| ${row.map((value) => escapeMarkdownCell(String(value))).join(' | ')} |`,
    ),
  ].join('\n');
}

function escapeMarkdownCell(value) {
  return value.replaceAll('|', '\\|').replaceAll('\n', '<br>');
}

function ids(records) {
  return records.map((record) => record.id).sort((first, second) => first.localeCompare(second));
}

function percent(part, total) {
  if (total === 0) {
    return 0;
  }

  return Number(((part / total) * 100).toFixed(2));
}

function priorityWeight(priority) {
  return {
    high: 3,
    medium: 2,
    low: 1,
  }[priority];
}

const data = await loadData();
const report = {
  ok: true,
  generatedAt: new Date().toISOString(),
  dataDirectory: path.relative(root, dataDirectory).replaceAll('\\', '/'),
  counts: buildDatasetCounts(data),
  locations: buildLocationCoverage(data),
};

report.contributionFocus = buildContributionFocus(report);

await mkdir(outputDirectory, { recursive: true });
await writeFile(
  path.join(outputDirectory, 'coverage-report.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);
await writeFile(path.join(outputDirectory, 'COVERAGE.md'), buildMarkdown(report));

console.log(
  JSON.stringify(
    {
      ok: report.ok,
      dataDirectory: report.dataDirectory,
      outputDirectory: path.relative(root, outputDirectory).replaceAll('\\', '/'),
      counts: report.counts,
      contributionFocusItems: report.contributionFocus.length,
    },
    null,
    2,
  ),
);
