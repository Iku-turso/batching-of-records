import {
  either,
  isGreaterThan,
  pipeline,
  reject,
  size,
  sumBy,
} from '../functionalProgramming/functionalProgramming';

import byteCount from './getByteCount/getByteCount';
import getBatches from './getBatches/getBatches';

const megabyte = 1_048_576;

export default ({
  recordByteLimit = megabyte,
  batchByteLimit = 5 * megabyte,
  batchPopulationLimit = 500,
} = {}) => {
  const atRecordByteLimit = atRecordByteLimitFor(recordByteLimit);

  const atBatchByteLimit = atBatchByteLimitFor(batchByteLimit);

  const atBatchPopulationLimit =
    atBatchPopulationLimitFor(batchPopulationLimit);

  return records =>
    pipeline(
      records,
      reject(atRecordByteLimit),
      getBatches(either(atBatchByteLimit, atBatchPopulationLimit)),
    );
};

const atRecordByteLimitFor = limit => record =>
  pipeline(record, byteCount, isGreaterThan(limit));

const atBatchByteLimitFor = limit => batch =>
  pipeline(batch, sumBy(byteCount), isGreaterThan(limit));

const atBatchPopulationLimitFor = limit => batch =>
  pipeline(batch, size, isGreaterThan(limit));
