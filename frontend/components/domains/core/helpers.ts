import { DATA_TEST_ID } from '@components/domains/core/types';

const getDataTestIdSelector = (ids: DATA_TEST_ID | DATA_TEST_ID[]) => {
  if (typeof ids === 'string') {
    return `[data-test-id="${ids}"]`;
  }

  return ids
    .reduce((acc, id) => `${acc} [data-test-id="${id}"]`, '')
    .trim();
};

const coreHelpers = {
  getDataTestIdSelector,
};

export {
  coreHelpers,
};
