import { retroTemplatesApi } from '@api';

import { retroTemplatesActionsTypes } from '@Redux/domains/retroTemplates/actionTypes';
import { createAsyncActionCreator } from '@Redux/lib/createAsyncAction';

const get = createAsyncActionCreator(
  retroTemplatesActionsTypes.GET_PENDING,
  retroTemplatesActionsTypes.GET_FULFILLED,
  retroTemplatesActionsTypes.GET_REJECTED,
  retroTemplatesApi.get
);

const createColumn = createAsyncActionCreator(
  retroTemplatesActionsTypes.CREATE_COLUMN_PENDING,
  retroTemplatesActionsTypes.CREATE_COLUMN_FULFILLED,
  retroTemplatesActionsTypes.CREATE_COLUMN_REJECTED,
  retroTemplatesApi.createColumn
);

const updateColumn = createAsyncActionCreator(
  retroTemplatesActionsTypes.UPDATE_COLUMN_PENDING,
  retroTemplatesActionsTypes.UPDATE_COLUMN_FULFILLED,
  retroTemplatesActionsTypes.UPDATE_COLUMN_REJECTED,
  retroTemplatesApi.updateColumn
);

const removeColumn = createAsyncActionCreator(
  retroTemplatesActionsTypes.REMOVE_COLUMN_PENDING,
  retroTemplatesActionsTypes.REMOVE_COLUMN_FULFILLED,
  retroTemplatesActionsTypes.REMOVE_COLUMN_REJECTED,
  retroTemplatesApi.removeColumn
);

const moveColumn = createAsyncActionCreator(
  retroTemplatesActionsTypes.MOVE_COLUMN_PENDING,
  retroTemplatesActionsTypes.MOVE_COLUMN_FULFILLED,
  retroTemplatesActionsTypes.MOVE_COLUMN_REJECTED,
  retroTemplatesApi.moveColumn
);

const getList = createAsyncActionCreator(
  retroTemplatesActionsTypes.GET_LIST_PENDING,
  retroTemplatesActionsTypes.GET_LIST_FULFILLED,
  retroTemplatesActionsTypes.GET_LIST_REJECTED,
  retroTemplatesApi.getList
);

export const retroTemplatesAsyncActions = {
  get,
  createColumn,
  updateColumn,
  removeColumn,
  moveColumn,
  getList,
};
