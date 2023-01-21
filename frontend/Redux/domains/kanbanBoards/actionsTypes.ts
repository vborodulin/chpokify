export const kanbanBoardActionsTypes = {

  CURRENT_ID_SET: 'kanbanBoard/setCurrId',

  GET_PENDING: 'kanbanBoard/get/pending',
  GET_FULFILLED: 'kanbanBoard/get/fulfilled',
  GET_REJECTED: 'kanbanBoard/get/rejected',

  GET_LIST_PENDING: 'kanbanBoard/list/get/pending',
  GET_LIST_FULFILLED: 'kanbanBoard/list/get/fulfilled',
  GET_LIST_REJECTED: 'kanbanBoard/list/get/rejected',

  CREATE_PENDING: 'kanbanBoard/create/pending',
  CREATE_FULFILLED: 'kanbanBoard/create/fulfilled',
  CREATE_REJECTED: 'kanbanBoard/create/rejected',

  UPDATE_PENDING: 'kanbanBoard/update/pending',
  UPDATE_FULFILLED: 'kanbanBoard/update/fulfilled',
  UPDATE_REJECTED: 'kanbanBoard/update/rejected',

  MOVE_COLUMN_PENDING: 'kanbanBoard/move/column/update/pending',
  MOVE_COLUMN_FULFILLED: 'kanbanBoard/move/column/update/fulfilled',
  MOVE_COLUMN_REJECTED: 'kanbanBoard/move/column/update/rejected',

  REMOVE_PENDING: 'kanbanBoard/remove/pending',
  REMOVE_FULFILLED: 'kanbanBoard/remove/fulfilled',
  REMOVE_REJECTED: 'kanbanBoard/remove/rejected',

  CREATE_COLUMN_PENDING: 'kanbanBoard/createColumn/pending',
  CREATE_COLUMN_FULFILLED: 'kanbanBoard/createColumn/fulfilled',
  CREATE_COLUMN_REJECTED: 'kanbanBoard/createColumn/rejected',

  UPDATE_COLUMN_PENDING: 'kanbanBoard/updateColumn/pending',
  UPDATE_COLUMN_FULFILLED: 'kanbanBoard/updateColumn/fulfilled',
  UPDATE_COLUMN_REJECTED: 'kanbanBoard/updateColumn/rejected',

  REMOVE_COLUMN_PENDING: 'kanbanBoard/removeColumn/pending',
  REMOVE_COLUMN_FULFILLED: 'kanbanBoard/removeColumn/fulfilled',
  REMOVE_COLUMN_REJECTED: 'kanbanBoard/removeColumn/rejected',
} as const;
