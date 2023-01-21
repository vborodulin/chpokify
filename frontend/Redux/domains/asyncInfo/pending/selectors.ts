import { createSelector } from '@reduxjs/toolkit';

import { asyncInfoSelectors } from '../selectors';

const createPendingSelector = createSelector(
  asyncInfoSelectors.getPending,
  (asyncPending) => (actionNames: string[]) =>
    actionNames
      .map((actionName) => actionName.replace(/\/(pending|fulfilled|rejected)/gi, ''))
      .some((actionName) => Boolean(asyncPending[actionName]))
);

export const asyncPendingSelectors = {
  createPendingSelector,
};
