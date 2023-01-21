import { configApi } from '@api/config';

import { configActionTypes } from '@Redux/domains/config/actionTypes';
import { createAsyncActionCreator } from '@Redux/lib/createAsyncAction';

const getConfig = createAsyncActionCreator(
  configActionTypes.GET_PENDING,
  configActionTypes.GET_FULFILLED,
  configActionTypes.GET_REJECTED,
  configApi.getConfig
);

const getUserConfig = createAsyncActionCreator(
  configActionTypes.CONFIG_USER_GET_PENDING,
  configActionTypes.CONFIG_USER_GET_FULFILLED,
  configActionTypes.CONFIG_USER_GET_REJECTED,
  configApi.getUserConfig
);

const configAsyncActions = {
  getConfig,
  getUserConfig,
};

export {
  configAsyncActions,
};
