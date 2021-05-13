import { defaultTo, initial, last, negate, reduce } from 'lodash/fp';
import appendWith from '../../functionalProgramming/appendWith/appendWith';
import pipeline from '../../functionalProgramming/pipeline/pipeline';

export default batchIsFull => items => {
  const currentBatchHasRoom = currentBatchHasRoomConsidering(batchIsFull);

  return pipeline(
    items,

    reduce(
      (batches, item) =>
        currentBatchHasRoom(batches, item)
          ? useCurrentBatch(batches, item)
          : useNewBatch(batches, item),

      [],
    ),
  );
};

const currentBatchHasRoomConsidering = batchIsFull => {
  const hasRoom = negate(batchIsFull);

  return (batches, newItem) => {
    const batchCandidate = getCurrentBatchWithNewItem(batches, newItem);

    return pipeline(batchCandidate, hasRoom);
  };
};

const useCurrentBatch = (allBatches, newItem) => {
  const updatedCurrentBatch = getCurrentBatchWithNewItem(allBatches, newItem);

  const olderBatches = initial(allBatches);

  return pipeline(olderBatches, appendWith(updatedCurrentBatch));
};

const useNewBatch = (oldBatches, item) => {
  const newBatch = [item];

  return pipeline(oldBatches, appendWith(newBatch));
};

const getCurrentBatchWithNewItem = (batches, newItem) =>
  pipeline(batches, last, orDefaultToNewEmptyBatch, appendWith(newItem));

const orDefaultToNewEmptyBatch = defaultTo([]);
