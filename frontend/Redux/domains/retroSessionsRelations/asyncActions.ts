import { retroRelationsApi } from '@api';

import { createAsyncActionCreator } from '@Redux/lib/createAsyncAction';

import { retroSessionsRelationsActionsTypes } from './actionsTypes';

const getList = createAsyncActionCreator(
  retroSessionsRelationsActionsTypes.GET_LIST_PENDING,
  retroSessionsRelationsActionsTypes.GET_LIST_FULFILLED,
  retroSessionsRelationsActionsTypes.GET_LIST_REJECTED,
  retroRelationsApi.getList
);

const createCard = createAsyncActionCreator(
  retroSessionsRelationsActionsTypes.CREATE_CARD_PENDING,
  retroSessionsRelationsActionsTypes.CREATE_CARD_FULFILLED,
  retroSessionsRelationsActionsTypes.CREATE_CARD_REJECTED,
  retroRelationsApi.createCard
);

const moveCardInColumn = createAsyncActionCreator(
  retroSessionsRelationsActionsTypes.MOVE_CARD_IN_COLUMN_PENDING,
  retroSessionsRelationsActionsTypes.MOVE_CARD_IN_COLUMN_FULFILLED,
  retroSessionsRelationsActionsTypes.MOVE_CARD_IN_COLUMN_REJECTED,
  retroRelationsApi.moveCardInColumn
);

const moveCardBetweenColumns = createAsyncActionCreator(
  retroSessionsRelationsActionsTypes.MOVE_CARD_BETWEEN_COLUMNS_PENDING,
  retroSessionsRelationsActionsTypes.MOVE_CARD_BETWEEN_COLUMNS_FULFILLED,
  retroSessionsRelationsActionsTypes.MOVE_CARD_BETWEEN_COLUMNS_REJECTED,
  retroRelationsApi.moveCardBetweenColumns
);

const removeCard = createAsyncActionCreator(
  retroSessionsRelationsActionsTypes.REMOVE_CARD_PENDING,
  retroSessionsRelationsActionsTypes.REMOVE_CARD_FULFILLED,
  retroSessionsRelationsActionsTypes.REMOVE_CARD_REJECTED,
  retroRelationsApi.removeCard
);

const moveCardInActionColumn = createAsyncActionCreator(
  retroSessionsRelationsActionsTypes.MOVE_CARD_IN_ACTION_COLUMN_PENDING,
  retroSessionsRelationsActionsTypes.MOVE_CARD_IN_ACTION_COLUMN_FULFILLED,
  retroSessionsRelationsActionsTypes.MOVE_CARD_IN_ACTION_COLUMN_REJECTED,
  retroRelationsApi.moveCardInActionColumn
);

const getListByTemplatesIds = createAsyncActionCreator(
  retroSessionsRelationsActionsTypes.GET_LIST_BY_TEMPLATES_IDS_PENDING,
  retroSessionsRelationsActionsTypes.GET_LIST_BY_TEMPLATES_IDS_FULFILLED,
  retroSessionsRelationsActionsTypes.GET_LIST_BY_TEMPLATES_IDS_REJECTED,
  retroRelationsApi.getListByTemplatesIds
);

export const retroSessionsRelationsAsyncActions = {
  getList,
  createCard,
  moveCardInColumn,
  moveCardBetweenColumns,
  removeCard,
  moveCardInActionColumn,
  getListByTemplatesIds,
};
