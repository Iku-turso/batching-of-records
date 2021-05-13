import getBatchedRecordsFor from './getBatchedRecordsFor';

describe('getBatchedRecords', () => {
  it('when called with records containing ones over the limit of bytes for a record, rejects the over-sized records', () => {
    const getBatchedRecords = getBatchedRecordsFor({
      recordByteLimit: 8,
    });

    const batchedRecords = getBatchedRecords([
      '12345678',
      '123456789',
      'record-3',
    ]);

    expect(batchedRecords).toEqual([['12345678', 'record-3']]);
  });

  it('when called with records too numerous to fit in a batch, splits records in batches of small enough population', () => {
    const getBatchedRecords = getBatchedRecordsFor({
      batchPopulationLimit: 2,
    });

    const batchedRecords = getBatchedRecords([
      'record-1',
      'record-2',
      'record-3',
    ]);

    expect(batchedRecords).toEqual([['record-1', 'record-2'], ['record-3']]);
  });

  it('when called with records together too big to fit in a batch, splits records in batches of small enough size', () => {
    const getBatchedRecords = getBatchedRecordsFor({
      batchByteLimit: 8,
    });

    const batchedRecords = getBatchedRecords(['1234', '5678', 'record-3']);

    expect(batchedRecords).toEqual([['1234', '5678'], ['record-3']]);
  });

  it('when called with records both too big and numerous to fit in a batch, splits records in batches small enough', () => {
    const getBatchedRecords = getBatchedRecordsFor({
      batchPopulationLimit: 4,
      batchByteLimit: 8,
    });

    const batchedRecords = getBatchedRecords([
      '123456',
      '789',
      'a',
      'b',
      'c',
      'd',
      'e',
    ]);

    expect(batchedRecords).toEqual([
      ['123456'],
      ['789', 'a', 'b', 'c'],
      ['d', 'e'],
    ]);
  });

  it('when called with no records, returns no batches', () => {
    const getBatchedRecords = getBatchedRecordsFor();

    const batchedRecords = getBatchedRecords([]);

    expect(batchedRecords).toEqual([]);
  });
});
