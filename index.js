import { readFileSync, writeFileSync } from 'fs';
import { pipeline } from './src/functionalProgramming/functionalProgramming';

import getBatchedRecords from './src/getBatchedRecords/getBatchedRecords';

const sourceFilePath = process.argv[2];
const targetFilePath = sourceFilePath.replace(/\.json/g, '.batched.json');

pipeline(
  sourceFilePath,
  filePath => readFileSync(filePath, { encoding: 'utf-8' }),
  JSON.parse,
  getBatchedRecords,
  batchedRecords => JSON.stringify(batchedRecords, null, 2),
  batchedRecordsString => writeFileSync(targetFilePath, batchedRecordsString),
);
