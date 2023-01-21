export const retroTemplatesActionsTypes = {

  GET_PENDING: 'retroTemplates/get/pending',
  GET_FULFILLED: 'retroTemplates/get/fulfilled',
  GET_REJECTED: 'retroTemplates/get/rejected',

  CREATE_COLUMN_PENDING: 'retroTemplates/createColumn/pending',
  CREATE_COLUMN_FULFILLED: 'retroTemplates/createColumn/fulfilled',
  CREATE_COLUMN_REJECTED: 'retroTemplates/createColumn/rejected',

  UPDATE_COLUMN_PENDING: 'retroTemplates/updateColumn/pending',
  UPDATE_COLUMN_FULFILLED: 'retroTemplates/updateColumn/fulfilled',
  UPDATE_COLUMN_REJECTED: 'retroTemplates/updateColumn/rejected',

  REMOVE_COLUMN_PENDING: 'retroTemplates/removeColumn/pending',
  REMOVE_COLUMN_FULFILLED: 'retroTemplates/removeColumn/fulfilled',
  REMOVE_COLUMN_REJECTED: 'retroTemplates/removeColumn/rejected',

  CURRENT_ID_SET: 'retroTemplates/setCurrentId',
  UPSERT: 'retroTemplates/upsert',

  MOVE_COLUMN_PENDING: 'retroTemplates/move/column/pending',
  MOVE_COLUMN_FULFILLED: 'retroTemplates/move/column/fulfilled',
  MOVE_COLUMN_REJECTED: 'retroTemplates/move/column/rejected',

  GET_LIST_PENDING: 'retroTemplates/getList/pending',
  GET_LIST_FULFILLED: 'retroTemplates/getList/fulfilled',
  GET_LIST_REJECTED: 'retroTemplates/getList/rejected',

} as const;
