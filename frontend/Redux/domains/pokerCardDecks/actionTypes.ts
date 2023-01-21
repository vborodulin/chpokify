const pokerCardDecksActionTypes = {
  UPSERT: 'pokerCardDecks/upsert',

  // get list
  GET_LIST_PENDING: 'pokerCardDecks/getList/pending',
  GET_LIST_FULFILLED: 'pokerCardDecks/getList/fulfilled',
  GET_LIST_REJECTED: 'pokerCardDecks/getList/rejected',

  // get list
  GET_LIST_WITH_DELETED_PENDING: 'pokerCardDecks/getListWithDeleted/pending',
  GET_LIST_WITH_DELETED_FULFILLED: 'pokerCardDecks/getListWithDeleted/fulfilled',
  GET_LIST_WITH_DELETED_REJECTED: 'pokerCardDecks/getListWithDeleted/rejected',

  // create
  CREATE_PENDING: 'pokerCardDecks/create/pending',
  CREATE_FULFILLED: 'pokerCardDecks/create/fulfilled',
  CREATE_REJECTED: 'pokerCardDecks/create/rejected',

  // update
  UPDATE_PENDING: 'pokerCardDecks/update/pending',
  UPDATE_FULFILLED: 'pokerCardDecks/update/fulfilled',
  UPDATE_REJECTED: 'pokerCardDecks/update/rejected',

  // remove
  REMOVE_PENDING: 'pokerCardDecks/remove/pending',
  REMOVE_FULFILLED: 'pokerCardDecks/remove/fulfilled',
  REMOVE_REJECTED: 'pokerCardDecks/remove/rejected',

} as const;

export {
  pokerCardDecksActionTypes,
};
