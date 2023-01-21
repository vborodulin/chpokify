import { TEntityID } from '@chpokify/models-types';

import { pokerSessionsApi } from '@api';

import { pokerSessionsActions } from '@Redux/domains/pokerSessions/actions';
import { pokerSessionsActionsTypes } from '@Redux/domains/pokerSessions/actionTypes';
import { createAsyncActionCreator } from '@Redux/lib/createAsyncAction';
import { TAppDispatch } from '@Redux/types';

import { ErrorAdapter, TAppError } from '@lib/errors';

const get = createAsyncActionCreator(
  pokerSessionsActionsTypes.GET_PENDING,
  pokerSessionsActionsTypes.GET_FULFILLED,
  pokerSessionsActionsTypes.GET_REJECTED,
  pokerSessionsApi.get
);

const setRatingModal = createAsyncActionCreator(
  pokerSessionsActionsTypes.SET_RATING_PENDING,
  pokerSessionsActionsTypes.SET_RATING_FULFILLED,
  pokerSessionsActionsTypes.SET_RATING_REJECTED,
  pokerSessionsApi.setRatingModal
);

const openRatingModal = createAsyncActionCreator(
  pokerSessionsActionsTypes.OPEN_RATING_MODAL_PENDING,
  pokerSessionsActionsTypes.OPEN_RATING_MODAL_FULFILLED,
  pokerSessionsActionsTypes.OPEN_RATING_MODAL_REJECTED,
  pokerSessionsApi.openRatingModal
);

const getList = createAsyncActionCreator(
  pokerSessionsActionsTypes.LIST_GET_PENDING,
  pokerSessionsActionsTypes.LIST_GET_FULFILLED,
  pokerSessionsActionsTypes.LIST_GET_REJECTED,
  pokerSessionsApi.getList
);

const create = createAsyncActionCreator(
  pokerSessionsActionsTypes.CREATE_PENDING,
  pokerSessionsActionsTypes.CREATE_FULFILLED,
  pokerSessionsActionsTypes.CREATE_REJECTED,
  pokerSessionsApi.create
);

const update = createAsyncActionCreator(
  pokerSessionsActionsTypes.UPDATE_PENDING,
  pokerSessionsActionsTypes.UPDATE_FULFILLED,
  pokerSessionsActionsTypes.UPDATE_REJECTED,
  pokerSessionsApi.update
);

const remove = createAsyncActionCreator(
  pokerSessionsActionsTypes.REMOVE_PENDING,
  pokerSessionsActionsTypes.REMOVE_FULFILLED,
  pokerSessionsActionsTypes.REMOVE_REJECTED,
  pokerSessionsApi.remove
);

const exportCSV = (pokerSessionId: TEntityID) => async (
  dispatch: TAppDispatch
) => {
  try {
    dispatch(pokerSessionsActions.exportCSVPending());
    const res = await pokerSessionsApi.exportCSV(pokerSessionId);
    return dispatch(pokerSessionsActions.exportCSVFulfilled(res.data));
  } catch (err: any) {
    return dispatch(pokerSessionsActions.exportCSVRejected(
      new ErrorAdapter(err).parse()
        .toJSON() as TAppError
    ));
  }
};

const setInSession = createAsyncActionCreator(
  pokerSessionsActionsTypes.SET_IN_SESSION_PENDING,
  pokerSessionsActionsTypes.SET_IN_SESSION_FULFILLED,
  pokerSessionsActionsTypes.SET_IN_SESSION_REJECTED,
  pokerSessionsApi.setInSession
);

const storyAdd = createAsyncActionCreator(
  pokerSessionsActionsTypes.STORY_ADD_PENDING,
  pokerSessionsActionsTypes.STORY_ADD_FULFILLED,
  pokerSessionsActionsTypes.STORY_ADD_REJECTED,
  pokerSessionsApi.storyAdd
);

const storyAddMany = createAsyncActionCreator(
  pokerSessionsActionsTypes.STORY_ADD_MANY_PENDING,
  pokerSessionsActionsTypes.STORY_ADD_MANY_FULFILLED,
  pokerSessionsActionsTypes.STORY_ADD_MANY_REJECTED,
  pokerSessionsApi.storyAddMany
);

const storiesOrderSet = createAsyncActionCreator(
  pokerSessionsActionsTypes.STORIES_ORDER_SET_PENDING,
  pokerSessionsActionsTypes.STORIES_ORDER_SET_FULFILLED,
  pokerSessionsActionsTypes.STORIES_ORDER_SET_MANY_REJECTED,
  pokerSessionsApi.storySetMany
);

const storyRemove = createAsyncActionCreator(
  pokerSessionsActionsTypes.STORY_REMOVE_PENDING,
  pokerSessionsActionsTypes.STORY_REMOVE_FULFILLED,
  pokerSessionsActionsTypes.STORY_REMOVE_REJECTED,
  pokerSessionsApi.storyRemove
);

const storyStart = createAsyncActionCreator(
  pokerSessionsActionsTypes.STORY_START_PENDING,
  pokerSessionsActionsTypes.STORY_START_FULFILLED,
  pokerSessionsActionsTypes.STORY_START_REJECTED,
  pokerSessionsApi.storyStart
);

const storyStop = createAsyncActionCreator(
  pokerSessionsActionsTypes.STORY_STOP_PENDING,
  pokerSessionsActionsTypes.STORY_STOP_FULFILLED,
  pokerSessionsActionsTypes.STORY_STOP_REJECTED,
  pokerSessionsApi.storyStop
);

// @Deprecated
const storyVoteAll = createAsyncActionCreator(
  pokerSessionsActionsTypes.STORY_VOTE_ALL_TEAMS_PENDING,
  pokerSessionsActionsTypes.STORY_VOTE_ALL_TEAMS_FULFILLED,
  pokerSessionsActionsTypes.STORY_VOTE_ALL_TEAMS_REJECTED,
  pokerSessionsApi.storyVoteAll
);

// @Deprecated
const storyVoteAllCancel = createAsyncActionCreator(
  pokerSessionsActionsTypes.STORY_VOTE_ALL_TEAMS_CANCEL_PENDING,
  pokerSessionsActionsTypes.STORY_VOTE_ALL_TEAMS_CANCEL_FULFILLED,
  pokerSessionsActionsTypes.STORY_VOTE_ALL_TEAMS_CANCEL_REJECTED,
  pokerSessionsApi.storyVoteAllCancel
);

const storyVoteTeam = createAsyncActionCreator(
  pokerSessionsActionsTypes.STORY_VOTE_TEAM_PENDING,
  pokerSessionsActionsTypes.STORY_VOTE_TEAM_FULFILLED,
  pokerSessionsActionsTypes.STORY_VOTE_TEAM_REJECTED,
  pokerSessionsApi.storyVoteTeam
);

const storyVoteCancelTeam = createAsyncActionCreator(
  pokerSessionsActionsTypes.STORY_VOTE_CANCEL_TEAM_PENDING,
  pokerSessionsActionsTypes.STORY_VOTE_CANCEL_TEAM_FULFILLED,
  pokerSessionsActionsTypes.STORY_VOTE_CANCEL_TEAM_REJECTED,
  pokerSessionsApi.storyVoteCancelTeam
);

// @Deprecated
const revealCards = createAsyncActionCreator(
  pokerSessionsActionsTypes.STORY_REVEAL_CARDS_PENDING,
  pokerSessionsActionsTypes.STORY_REVEAL_CARDS_FULFILLED,
  pokerSessionsActionsTypes.STORY_REVEAL_CARDS_REJECTED,
  pokerSessionsApi.storyRevealCards
);

const storyTeamRevealCards = createAsyncActionCreator(
  pokerSessionsActionsTypes.STORY_TEAM_REVEAL_CARDS_PENDING,
  pokerSessionsActionsTypes.STORY_TEAM_REVEAL_CARDS_FULFILLED,
  pokerSessionsActionsTypes.STORY_TEAM_REVEAL_CARDS_REJECTED,
  pokerSessionsApi.storyTeamRevealCards
);

const chooseCard = createAsyncActionCreator(
  pokerSessionsActionsTypes.STORY_CHOOSE_CARD_PENDING,
  pokerSessionsActionsTypes.STORY_CHOOSE_CARD_FULFILLED,
  pokerSessionsActionsTypes.STORY_CHOOSE_CARD_REJECTED,
  pokerSessionsApi.chooseCard
);

const storyTeamScoresSet = createAsyncActionCreator(
  pokerSessionsActionsTypes.STORY_TEAM_SCORES_SET_PENDING,
  pokerSessionsActionsTypes.STORY_TEAM_SCORES_SET_FULFILLED,
  pokerSessionsActionsTypes.STORY_TEAM_SCORES_SET_REJECTED,
  pokerSessionsApi.storyTeamScoresSet
);

const inviteGen = createAsyncActionCreator(
  pokerSessionsActionsTypes.INVITE_GENERATE_PENDING,
  pokerSessionsActionsTypes.INVITE_GENERATE_FULFILLED,
  pokerSessionsActionsTypes.INVITE_GENERATE_REJECTED,
  pokerSessionsApi.inviteGen
);

const inviteTokenValidate = createAsyncActionCreator(
  pokerSessionsActionsTypes.INVITE_TOKEN_VALIDATE_PENDING,
  pokerSessionsActionsTypes.INVITE_TOKEN_VALIDATE_FULFILLED,
  pokerSessionsActionsTypes.INVITE_TOKEN_VALIDATE_REJECTED,
  pokerSessionsApi.inviteTokenValidate
);

const storiesSetSort = createAsyncActionCreator(
  pokerSessionsActionsTypes.STORIES_SORT_SET_SORT_PENDING,
  pokerSessionsActionsTypes.STORIES_SORT_SET_SORT_FULFILLED,
  pokerSessionsActionsTypes.STORIES_SORT_SET_SORT_REJECTED,
  pokerSessionsApi.storiesSetSort
);

export const pokerSessionsAsyncActions = {
  get,
  setRatingModal,
  openRatingModal,
  getList,
  create,
  update,
  remove,
  exportCSV,
  setInSession,
  storyAdd,
  storyAddMany,
  storySetMany: storiesOrderSet,
  storyRemove,
  storyStart,
  storyStop,
  storyVoteAll,
  storyVoteAllCancel,
  storyVoteTeam,
  storyVoteCancelTeam,
  revealCards,
  storyTeamRevealCards,
  chooseCard,
  storyTeamScoresSet,
  inviteGen,
  inviteTokenValidate,
  storiesSetSort,
};
