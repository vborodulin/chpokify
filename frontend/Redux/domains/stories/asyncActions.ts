import { storiesApi } from '@api/stories';

import { storiesActionsTypes } from '@Redux/domains/stories/actionsTypes';
import { createAsyncActionCreator } from '@Redux/lib/createAsyncAction';

const getManyBySpaceId = createAsyncActionCreator(
  storiesActionsTypes.GET_MANY_BY_SPACE_ID_PENDING,
  storiesActionsTypes.GET_MANY_BY_SPACE_ID_FULFILLED,
  storiesActionsTypes.GET_MANY_BY_SPACE_ID_REJECTED,
  storiesApi.getManyFromSpaceId
);

const getMany = createAsyncActionCreator(
  storiesActionsTypes.GET_MANY_PENDING,
  storiesActionsTypes.GET_MANY_FULFILLED,
  storiesActionsTypes.GET_MANY_REJECTED,
  storiesApi.getMany
);

const create = createAsyncActionCreator(
  storiesActionsTypes.CREATE_PENDING,
  storiesActionsTypes.CREATE_FULFILLED,
  storiesActionsTypes.CREATE_REJECTED,
  storiesApi.create
);

const createMany = createAsyncActionCreator(
  storiesActionsTypes.CREATE_MANY_PENDING,
  storiesActionsTypes.CREATE_MANY_FULFILLED,
  storiesActionsTypes.CREATE_MANY_REJECTED,
  storiesApi.createMany
);

const update = createAsyncActionCreator(
  storiesActionsTypes.UPDATE_PENDING,
  storiesActionsTypes.UPDATE_FULFILLED,
  storiesActionsTypes.UPDATE_REJECTED,
  storiesApi.update
);

const storiesAsyncActions = {
  getManyBySpaceId,
  getMany,
  create,
  createMany,
  update,
};

export {
  storiesAsyncActions,
};
