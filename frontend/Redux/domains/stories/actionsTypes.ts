const storiesActionsTypes = {

  // kanban
  GET_FOR_KANBAN_PENDING: 'stories/kanban/get/pending',
  GET_FOR_KANBAN_FULFILLED: 'stories/kanban/get/fulfilled',
  GET_FOR_KANBAN_REJECTED: 'stories/kanban/get/rejected',

  CREATE_FOR_KANBAN_PENDING: 'stories/kanban/create/pending',
  CREATE_FOR_KANBAN_FULFILLED: 'stories/kanban/create/fulfilled',
  CREATE_FOR_KANBAN_REJECTED: 'stories/kanban/create/rejected',

  UPDATE_FOR_KANBAN_PENDING: 'stories/kanban/update/pending',
  UPDATE_FOR_KANBAN_FULFILLED: 'stories/kanban/update/fulfilled',
  UPDATE_FOR_KANBAN_REJECTED: 'stories/kanban/update/rejected',

  GET_LIST_FOR_KANBAN_PENDING: 'stories/kanban/list/get/pending',
  GET_LIST_FOR_KANBAN_FULFILLED: 'stories/kanban/list/get/fulfilled',
  GET_LIST_FOR_KANBAN_REJECTED: 'stories/kanban/list/get/rejected',

  REMOVE_FOR_KANBAN_PENDING: 'stories/kanban/remove/pending',
  REMOVE_FOR_KANBAN_FULFILLED: 'stories/kanban/remove/fulfilled',
  REMOVE_FOR_KANBAN_REJECTED: 'stories/kanban/remove/rejected',

  // upsert
  UPSERT: 'stories/upsert',

  // setSort
  SET_SORT: 'stories/setSort',

  // get stories many from spaceId
  GET_MANY_BY_SPACE_ID_PENDING: 'stories/getManyBySpaceId/pending',
  GET_MANY_BY_SPACE_ID_FULFILLED: 'stories/getManyBySpaceId/fulfilled',
  GET_MANY_BY_SPACE_ID_REJECTED: 'stories/getManyBySpaceId/rejected',

  // get stories many
  GET_MANY_PENDING: 'stories/getMany/pending',
  GET_MANY_FULFILLED: 'stories/getMany/fulfilled',
  GET_MANY_REJECTED: 'stories/getMany/rejected',

  // create
  CREATE_PENDING: 'stories/create/pending',
  CREATE_FULFILLED: 'stories/create/fulfilled',
  CREATE_REJECTED: 'stories/create/rejected',

  // create many
  CREATE_MANY_PENDING: 'stories/create/many/pending',
  CREATE_MANY_FULFILLED: 'stories/create/many/fulfilled',
  CREATE_MANY_REJECTED: 'stories/create/many/rejected',

  // update
  UPDATE_PENDING: 'stories/update/pending',
  UPDATE_FULFILLED: 'stories/update/fulfilled',
  UPDATE_REJECTED: 'stories/update/rejected',
} as const;

export {
  storiesActionsTypes,
};
