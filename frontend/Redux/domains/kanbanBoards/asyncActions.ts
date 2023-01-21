import { kanbanApi } from '@api';

import { createAsyncActionCreator } from '@Redux/lib/createAsyncAction';

import { kanbanBoardActionsTypes } from './actionsTypes';

const getList = createAsyncActionCreator(
  kanbanBoardActionsTypes.GET_LIST_PENDING,
  kanbanBoardActionsTypes.GET_LIST_FULFILLED,
  kanbanBoardActionsTypes.GET_LIST_REJECTED,
  kanbanApi.getListBoards
);

const get = createAsyncActionCreator(
  kanbanBoardActionsTypes.GET_PENDING,
  kanbanBoardActionsTypes.GET_FULFILLED,
  kanbanBoardActionsTypes.GET_REJECTED,
  kanbanApi.getBoard
);

const create = createAsyncActionCreator(
  kanbanBoardActionsTypes.CREATE_PENDING,
  kanbanBoardActionsTypes.CREATE_FULFILLED,
  kanbanBoardActionsTypes.CREATE_REJECTED,
  kanbanApi.createBoard
);

const update = createAsyncActionCreator(
  kanbanBoardActionsTypes.UPDATE_PENDING,
  kanbanBoardActionsTypes.UPDATE_FULFILLED,
  kanbanBoardActionsTypes.UPDATE_REJECTED,
  kanbanApi.updateBoard
);

const moveColumn = createAsyncActionCreator(
  kanbanBoardActionsTypes.MOVE_COLUMN_PENDING,
  kanbanBoardActionsTypes.MOVE_COLUMN_FULFILLED,
  kanbanBoardActionsTypes.MOVE_COLUMN_REJECTED,
  kanbanApi.moveColumnInBoard
);

const remove = createAsyncActionCreator(
  kanbanBoardActionsTypes.REMOVE_PENDING,
  kanbanBoardActionsTypes.REMOVE_FULFILLED,
  kanbanBoardActionsTypes.REMOVE_REJECTED,
  kanbanApi.removeBoard
);

const createColumn = createAsyncActionCreator(
  kanbanBoardActionsTypes.CREATE_COLUMN_PENDING,
  kanbanBoardActionsTypes.CREATE_COLUMN_FULFILLED,
  kanbanBoardActionsTypes.CREATE_COLUMN_REJECTED,
  kanbanApi.createColumn
);

const updateColumn = createAsyncActionCreator(
  kanbanBoardActionsTypes.UPDATE_COLUMN_PENDING,
  kanbanBoardActionsTypes.UPDATE_COLUMN_FULFILLED,
  kanbanBoardActionsTypes.UPDATE_COLUMN_REJECTED,
  kanbanApi.updateColumn
);

const removeColumn = createAsyncActionCreator(
  kanbanBoardActionsTypes.REMOVE_COLUMN_PENDING,
  kanbanBoardActionsTypes.REMOVE_COLUMN_FULFILLED,
  kanbanBoardActionsTypes.REMOVE_COLUMN_REJECTED,
  kanbanApi.removeColumn
);

export const kanbanBoardAsyncActions = {
  getList,
  get,
  create,
  update,
  moveColumn,
  remove,

  createColumn,
  updateColumn,
  removeColumn,
};
