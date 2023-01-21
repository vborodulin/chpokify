import { pokerCardDecksApi } from '@api';

import { pokerCardDecksActionTypes } from '@Redux/domains/pokerCardDecks/actionTypes';
import { createAsyncActionCreator } from '@Redux/lib/createAsyncAction';

const getList = createAsyncActionCreator(
  pokerCardDecksActionTypes.GET_LIST_PENDING,
  pokerCardDecksActionTypes.GET_LIST_FULFILLED,
  pokerCardDecksActionTypes.GET_LIST_REJECTED,
  pokerCardDecksApi.getList
);

const getListWithDeleted = createAsyncActionCreator(
  pokerCardDecksActionTypes.GET_LIST_WITH_DELETED_PENDING,
  pokerCardDecksActionTypes.GET_LIST_WITH_DELETED_FULFILLED,
  pokerCardDecksActionTypes.GET_LIST_WITH_DELETED_REJECTED,
  pokerCardDecksApi.getListWithDeleted
);

const create = createAsyncActionCreator(
  pokerCardDecksActionTypes.CREATE_PENDING,
  pokerCardDecksActionTypes.CREATE_FULFILLED,
  pokerCardDecksActionTypes.CREATE_REJECTED,
  pokerCardDecksApi.create
);

const update = createAsyncActionCreator(
  pokerCardDecksActionTypes.UPDATE_PENDING,
  pokerCardDecksActionTypes.UPDATE_FULFILLED,
  pokerCardDecksActionTypes.UPDATE_REJECTED,
  pokerCardDecksApi.update
);

const remove = createAsyncActionCreator(
  pokerCardDecksActionTypes.REMOVE_PENDING,
  pokerCardDecksActionTypes.REMOVE_FULFILLED,
  pokerCardDecksActionTypes.REMOVE_REJECTED,
  pokerCardDecksApi.remove
);

export const pokerCardDecksAsyncActions = {
  getList,
  getListWithDeleted,
  create,
  update,
  remove,
};
