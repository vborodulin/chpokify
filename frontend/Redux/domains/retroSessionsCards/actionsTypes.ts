export const retroSessionsCardsActionsTypes = {

  GET_LIST_PENDING: 'retroSessionsCards/list/get/pending',
  GET_LIST_FULFILLED: 'retroSessionsCards/list/get/fulfilled',
  GET_LIST_REJECTED: 'retroSessionsCards/list/get/rejected',

  UPDATE_PENDING: 'retroSessionsCards/update/pending',
  UPDATE_FULFILLED: 'retroSessionsCards/update/fulfilled',
  UPDATE_REJECTED: 'retroSessionsCards/update/rejected',

  REMOVE_PENDING: 'retroSessionsCards/remove/pending',
  REMOVE_FULFILLED: 'retroSessionsCards/remove/fulfilled',
  REMOVE_REJECTED: 'retroSessionsCards/remove/rejected',

  ADD_VOTE_PENDING: 'retroSessionsCards/addVote/pending',
  ADD_VOTE_FULFILLED: 'retroSessionsCards/addVote/fulfilled',
  ADD_VOTE_REJECTED: 'retroSessionsCards/addVote/rejected',

  REMOVE_VOTE_PENDING: 'retroSessionsCards/removeVote/pending',
  REMOVE_VOTE_FULFILLED: 'retroSessionsCards/removeVote/fulfilled',
  REMOVE_VOTE_REJECTED: 'retroSessionsCards/removeVote/rejected',

  COMBINED_CARD_PENDING: 'retroSessionsCards/combinedCard/pending',
  COMBINED_CARD_FULFILLED: 'retroSessionsCards/combinedCard/fulfilled',
  COMBINED_CARD_REJECTED: 'retroSessionsCards/combinedCard/rejected',

  UPSERT: 'retroSessionsCards/upsert',

  REMOVE: 'retroSessionsCards/remove',

} as const;
