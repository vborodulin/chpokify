import { kanbanApi } from '@api';

import { createAsyncActionCreator } from '@Redux/lib/createAsyncAction';

import { kanbanBoardRelationActionsTypes } from './actionsTypes';

const getList = createAsyncActionCreator(
  kanbanBoardRelationActionsTypes.GET_LIST_PENDING,
  kanbanBoardRelationActionsTypes.GET_LIST_FULFILLED,
  kanbanBoardRelationActionsTypes.GET_LIST_REJECTED,
  kanbanApi.getListBoardRelations
);

const createTask = createAsyncActionCreator(
  kanbanBoardRelationActionsTypes.CREATE_TASK_PENDING,
  kanbanBoardRelationActionsTypes.CREATE_TASK_FULFILLED,
  kanbanBoardRelationActionsTypes.CREATE_TASK_REJECTED,
  kanbanApi.createTask
);

const moveTaskInColumn = createAsyncActionCreator(
  kanbanBoardRelationActionsTypes.MOVE_TASK_IN_COLUMN_PENDING,
  kanbanBoardRelationActionsTypes.MOVE_TASK_IN_COLUMN_FULFILLED,
  kanbanBoardRelationActionsTypes.MOVE_TASK_IN_COLUMN_REJECTED,
  kanbanApi.moveTaskInColumn
);

const moveTaskBetweenColumns = createAsyncActionCreator(
  kanbanBoardRelationActionsTypes.MOVE_TASK_BETWEEN_COLUMNS_PENDING,
  kanbanBoardRelationActionsTypes.MOVE_TASK_BETWEEN_COLUMNS_FULFILLED,
  kanbanBoardRelationActionsTypes.MOVE_TASK_BETWEEN_COLUMNS_REJECTED,
  kanbanApi.moveTaskBetweenColumns
);

const removeTask = createAsyncActionCreator(
  kanbanBoardRelationActionsTypes.REMOVE_TASK_PENDING,
  kanbanBoardRelationActionsTypes.REMOVE_TASK_FULFILLED,
  kanbanBoardRelationActionsTypes.REMOVE_TASK_REJECTED,
  kanbanApi.removeTask
);

export const kanbanBoardRelationsAsyncActions = {
  getList,
  createTask,
  moveTaskInColumn,
  moveTaskBetweenColumns,
  removeTask,
};
