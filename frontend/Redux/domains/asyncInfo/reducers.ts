import { combineReducers } from '@reduxjs/toolkit';

import { asyncFulfilledReducer } from '@Redux/domains/asyncInfo/fulfilled/reducers';
import { asyncPendingReducer } from '@Redux/domains/asyncInfo/pending/reducers';
import { asyncRejectedReducer } from '@Redux/domains/asyncInfo/rejected/reducers';

export const asyncInfoReducer = combineReducers({
  pending: asyncPendingReducer,
  fulfilled: asyncFulfilledReducer,
  rejected: asyncRejectedReducer,
});
