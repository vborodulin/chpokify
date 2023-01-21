import { usersApi } from '@api';

import { usersActionsTypes } from '@Redux/domains/users/actionsTypes';
import { createAsyncActionCreator } from '@Redux/lib/createAsyncAction';

const getList = createAsyncActionCreator(
  usersActionsTypes.LIST_GET_PENDING,
  usersActionsTypes.LIST_GET_FULFILLED,
  usersActionsTypes.LIST_GET_REJECTED,
  usersApi.getList
);

const update = createAsyncActionCreator(
  usersActionsTypes.UPDATE_PENDING,
  usersActionsTypes.UPDATE_FULFILLED,
  usersActionsTypes.UPDATE_REJECTED,
  usersApi.update
);

const updatePassword = createAsyncActionCreator(
  usersActionsTypes.UPDATE_PASSWORD_PENDING,
  usersActionsTypes.UPDATE_PASSWORD_FULFILLED,
  usersActionsTypes.UPDATE_PASSWORD_REJECTED,
  usersApi.updatePassword
);

const updateEmail = createAsyncActionCreator(
  usersActionsTypes.UPDATE_EMAIL_PENDING,
  usersActionsTypes.UPDATE_EMAIL_FULFILLED,
  usersActionsTypes.UPDATE_EMAIL_REJECTED,
  usersApi.updateEmail
);

const updateSettings = createAsyncActionCreator(
  usersActionsTypes.UPDATE_SETTINGS_PENDING,
  usersActionsTypes.UPDATE_SETTINGS_FULFILLED,
  usersActionsTypes.UPDATE_SETTINGS_REJECTED,
  usersApi.updateSettings
);

const updateOnboarding = createAsyncActionCreator(
  usersActionsTypes.UPDATE_ONBOARDING_PENDING,
  usersActionsTypes.UPDATE_ONBOARDING_FULFILLED,
  usersActionsTypes.UPDATE_ONBOARDING_REJECTED,
  usersApi.updateOnboarding
);

export const usersAsyncActions = {
  getList,
  update,
  updatePassword,
  updateEmail,
  updateSettings,
  updateOnboarding,
};
