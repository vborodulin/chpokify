export const retroSessionsRelationsActionsTypes = {

  GET_LIST_PENDING: 'retroSessionsRelations/list/get/pending',
  GET_LIST_FULFILLED: 'retroSessionsRelations/list/get/fulfilled',
  GET_LIST_REJECTED: 'retroSessionsRelations/list/get/rejected',

  CREATE_CARD_PENDING: 'retroSessionsRelations/createCard/pending',
  CREATE_CARD_FULFILLED: 'retroSessionsRelations/createCard/fulfilled',
  CREATE_CARD_REJECTED: 'retroSessionsRelations/createCard/rejected',

  MOVE_CARD_IN_COLUMN_PENDING: 'retroSessionsRelations/move/card/inColumn/pending',
  MOVE_CARD_IN_COLUMN_FULFILLED: 'retroSessionsRelations/move/card/inColumn/fulfilled',
  MOVE_CARD_IN_COLUMN_REJECTED: 'retroSessionsRelations/move/card/inColumn/rejected',

  MOVE_CARD_BETWEEN_COLUMNS_PENDING: 'retroSessionsRelations/betweenColumns/move/card/pending',
  MOVE_CARD_BETWEEN_COLUMNS_FULFILLED: 'retroSessionsRelations/betweenColumns/move/card/fulfilled',
  MOVE_CARD_BETWEEN_COLUMNS_REJECTED: 'retroSessionsRelations/betweenColumns/move/card/rejected',

  REMOVE_CARD_PENDING: 'retroSessionsRelations/removeCard/pending',
  REMOVE_CARD_FULFILLED: 'retroSessionsRelations/removeCard/fulfilled',
  REMOVE_CARD_REJECTED: 'retroSessionsRelations/removeCard/rejected',

  MOVE_CARD_IN_ACTION_COLUMN_PENDING: 'retroSessionsRelations/move/card/inActionColumn/pending',
  MOVE_CARD_IN_ACTION_COLUMN_FULFILLED: 'retroSessionsRelations/move/card/inActionColumn/fulfilled',
  MOVE_CARD_IN_ACTION_COLUMN_REJECTED: 'retroSessionsRelations/move/card/inActionColumn/rejected',

  GET_LIST_BY_TEMPLATES_IDS_PENDING: 'retroSessionsRelations/list/get/byTemplatesIds/pending',
  GET_LIST_BY_TEMPLATES_IDS_FULFILLED: 'retroSessionsRelations/list/get/byTemplatesIds/fulfilled',
  GET_LIST_BY_TEMPLATES_IDS_REJECTED: 'retroSessionsRelations/list/get/byTemplatesIds/rejected',

  UPSERT: 'retroSessionsRelations/upsert',
  REMOVE: 'retroSessionsRelations/remove',

} as const;
