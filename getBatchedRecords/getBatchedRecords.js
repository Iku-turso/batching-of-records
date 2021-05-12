import reject from 'lodash/fp/reject';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import get from 'lodash/fp/get';
import batchifyFor from 'lodash/fp/chunk';
import getAmountOfBytes from './getAmountOfBytes/getAmountOfBytes';

const megabyte = 1_048_576;

export default ({
  limitOfBytesForRecord = megabyte,
  limitOfRecordCountForBatch = 500,
} = {}) =>
  flow(
    map(toRecordWithByteCount),
    reject(tooManyBytesFor(limitOfBytesForRecord)),
    map('record'),
    batchifyFor(limitOfRecordCountForBatch),
  );

const isGreaterThan = a => b => b > a;

const tooManyBytesFor = limitOfBytes =>
  flow(get('amountOfBytes'), isGreaterThan(limitOfBytes));

const toRecordWithByteCount = record => ({
  record,
  amountOfBytes: getAmountOfBytes(record),
});
