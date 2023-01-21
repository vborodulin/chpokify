import { TEntityID } from '@chpokify/models-types';

import { retroSessionsApi } from '@api';

import { retroSessionsActions } from '@Redux/domains/retroSessions/actions';
import { retroSessionsActionsTypes } from '@Redux/domains/retroSessions/actionsTypes';
import { createAsyncActionCreator } from '@Redux/lib/createAsyncAction';
import { TAppDispatch } from '@Redux/types';

import { ErrorAdapter, TAppError } from '@lib/errors';

const create = createAsyncActionCreator(
  retroSessionsActionsTypes.CREATE_PENDING,
  retroSessionsActionsTypes.CREATE_FULFILLED,
  retroSessionsActionsTypes.CREATE_REJECTED,
  retroSessionsApi.createSession
);

const getList = createAsyncActionCreator(
  retroSessionsActionsTypes.GET_LIST_PENDING,
  retroSessionsActionsTypes.GET_LIST_FULFILLED,
  retroSessionsActionsTypes.GET_LIST_REJECTED,
  retroSessionsApi.getList
);

const get = createAsyncActionCreator(
  retroSessionsActionsTypes.GET_PENDING,
  retroSessionsActionsTypes.GET_FULFILLED,
  retroSessionsActionsTypes.GET_REJECTED,
  retroSessionsApi.get
);

const update = createAsyncActionCreator(
  retroSessionsActionsTypes.UPDATE_PENDING,
  retroSessionsActionsTypes.UPDATE_FULFILLED,
  retroSessionsActionsTypes.UPDATE_REJECTED,
  retroSessionsApi.updateSession
);

const remove = createAsyncActionCreator(
  retroSessionsActionsTypes.REMOVE_PENDING,
  retroSessionsActionsTypes.REMOVE_FULFILLED,
  retroSessionsActionsTypes.REMOVE_REJECTED,
  retroSessionsApi.removeSession
);

const inviteGen = createAsyncActionCreator(
  retroSessionsActionsTypes.INVITE_GENERATE_PENDING,
  retroSessionsActionsTypes.INVITE_GENERATE_FULFILLED,
  retroSessionsActionsTypes.INVITE_GENERATE_REJECTED,
  retroSessionsApi.inviteGen
);

const inviteTokenValidate = createAsyncActionCreator(
  retroSessionsActionsTypes.INVITE_TOKEN_VALIDATE_PENDING,
  retroSessionsActionsTypes.INVITE_TOKEN_VALIDATE_FULFILLED,
  retroSessionsActionsTypes.INVITE_TOKEN_VALIDATE_REJECTED,
  retroSessionsApi.inviteTokenValidate
);

const resetVotesCards = createAsyncActionCreator(
  retroSessionsActionsTypes.RESET_VOTES_CARDS_PENDING,
  retroSessionsActionsTypes.RESET_VOTES_CARDS_FULFILLED,
  retroSessionsActionsTypes.RESET_VOTES_CARDS_REJECTED,
  retroSessionsApi.resetVotesCards
);

const exportsCardsActionCSV = (retroSessionId: TEntityID) => async (dispatch: TAppDispatch) => {
  try {
    dispatch(retroSessionsActions.exportCSVCardsActionPending());
    const res = await retroSessionsApi.exportCardsActionsCSV(retroSessionId);
    return dispatch(retroSessionsActions.exportCSVCardsActionFulfilled(res.data));
  } catch (err: any) {
    return dispatch(retroSessionsActions.exportCSVCardsActionRejected(
      new ErrorAdapter(err).parse()
        .toJSON() as TAppError
    ));
  }
};

const getCountAll = createAsyncActionCreator(
  retroSessionsActionsTypes.GET_COUNT_ALL_PENDING,
  retroSessionsActionsTypes.GET_COUNT_ALL_FULFILLED,
  retroSessionsActionsTypes.GET_COUNT_ALL_REJECTED,
  retroSessionsApi.getCountAll
);

export const retroSessionsAsyncActions = {
  create,
  update,
  getList,
  get,
  remove,
  inviteGen,
  inviteTokenValidate,
  resetVotesCards,
  exportsCardsActionCSV,
  getCountAll,
};
