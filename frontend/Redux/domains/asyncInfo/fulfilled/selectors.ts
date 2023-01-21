import { createSelector } from '@reduxjs/toolkit';

import { asyncInfoSelectors } from '../selectors';

const createFulfilledSelector = createSelector(
  asyncInfoSelectors.getFulfilled,
  (asyncFulfilled) => (actionNames: string[]) =>
    actionNames
      .map((actionName) => actionName.replace(/\/(pending|fulfilled|rejected)/gi, ''))
      .some((actionName) => Boolean(asyncFulfilled[actionName]))
);

export const asyncFulfilledSelectors = {
  createFulfilledSelector,
};
