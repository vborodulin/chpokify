import { retroCardsApi } from '@api';

import { createAsyncActionCreator } from '@Redux/lib/createAsyncAction';

import { retroSessionsCardsActionsTypes } from './actionsTypes';

const getList = createAsyncActionCreator(
  retroSessionsCardsActionsTypes.GET_LIST_PENDING,
  retroSessionsCardsActionsTypes.GET_LIST_FULFILLED,
  retroSessionsCardsActionsTypes.GET_LIST_REJECTED,
  retroCardsApi.getList
);

const update = createAsyncActionCreator(
  retroSessionsCardsActionsTypes.UPDATE_PENDING,
  retroSessionsCardsActionsTypes.UPDATE_FULFILLED,
  retroSessionsCardsActionsTypes.UPDATE_REJECTED,
  retroCardsApi.update
);

const addVote = createAsyncActionCreator(
  retroSessionsCardsActionsTypes.ADD_VOTE_PENDING,
  retroSessionsCardsActionsTypes.ADD_VOTE_FULFILLED,
  retroSessionsCardsActionsTypes.ADD_VOTE_REJECTED,
  retroCardsApi.addVote
);

const removeVote = createAsyncActionCreator(
  retroSessionsCardsActionsTypes.REMOVE_VOTE_PENDING,
  retroSessionsCardsActionsTypes.REMOVE_VOTE_FULFILLED,
  retroSessionsCardsActionsTypes.REMOVE_VOTE_REJECTED,
  retroCardsApi.removeVote
);

const combinedCard = createAsyncActionCreator(
  retroSessionsCardsActionsTypes.COMBINED_CARD_PENDING,
  retroSessionsCardsActionsTypes.COMBINED_CARD_FULFILLED,
  retroSessionsCardsActionsTypes.COMBINED_CARD_REJECTED,
  retroCardsApi.combinedCard
);

export const retroSessionsCardsAsyncActions = {
  getList,
  update,
  addVote,
  removeVote,
  combinedCard,
};
