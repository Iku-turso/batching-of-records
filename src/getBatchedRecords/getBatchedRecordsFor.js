import {
  either,
  pipeline,
  reject,
} from '../functionalProgramming/functionalProgramming';

import getBatchesFor from './getBatchesFor/getBatchesFor';
import overRecordByteLimitFor from './overRecordByteLimitFor/overRecordByteLimitFor';
import overBatchByteLimitFor from './overBatchByteLimitFor/overBatchByteLimitFor';
import overBatchPopulationLimitFor from './overBatchPopulationLimitFor/overBatchPopulationLimitFor';

const megabyte = 1_048_576;

export default ({
  recordByteLimit = megabyte,
  batchByteLimit = 5 * megabyte,
  batchPopulationLimit = 500,
} = {}) => {
  const overRecordByteLimit = overRecordByteLimitFor(recordByteLimit);

  const overBatchByteLimit = overBatchByteLimitFor(batchByteLimit);

  const overBatchPopulationLimit =
    overBatchPopulationLimitFor(batchPopulationLimit);

  return records =>
    pipeline(
      records,
      reject(overRecordByteLimit),
      getBatchesFor(either(overBatchByteLimit, overBatchPopulationLimit)),
    );
};
