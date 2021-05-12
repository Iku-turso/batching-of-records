import getBatchedRecordsFor from './getBatchedRecords';

describe('getBatchedRecords', () => {
  it('when called with records containing ones over the limit of bytes for a record, rejects the over-sized records', () => {
    const getBatchedRecords = getBatchedRecordsFor({
      limitOfBytesForRecord: 8,
    });

    const batchedRecords = getBatchedRecords([
      '12345678',
      '123456789',
      'record-3',
    ]);

    expect(batchedRecords).toEqual([['12345678', 'record-3']]);
  });

  it('when called with more records than fit in a batch, splits records in batches', () => {
    const getBatchedRecords = getBatchedRecordsFor({
      limitOfRecordCountForBatch: 2,
    });

    const batchedRecords = getBatchedRecords([
      'record-1',
      'record-2',
      'record-3',
    ]);

    expect(batchedRecords).toEqual([['record-1', 'record-2'], ['record-3']]);
  });
});
