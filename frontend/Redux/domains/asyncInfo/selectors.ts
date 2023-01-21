import { createSelector } from '@reduxjs/toolkit';

import { TAppState } from '@Redux/types';

/**
 * root
 */

const getAsyncInfo = ({ asyncInfo }: TAppState) => asyncInfo;

/**
 * simple
 */

const getPending = createSelector(
  getAsyncInfo,
  (root) => root.pending
);

const getFulfilled = createSelector(
  getAsyncInfo,
  (root) => root.fulfilled
);

const getRejected = createSelector(
  getAsyncInfo,
  (root) => root.rejected
);

export const asyncInfoSelectors = {
  getPending,
  getFulfilled,
  getRejected,
};
