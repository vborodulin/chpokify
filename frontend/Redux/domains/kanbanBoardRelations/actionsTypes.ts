export const kanbanBoardRelationActionsTypes = {

  GET_LIST_PENDING: 'kanbanBoardIdColumnIdTasksIds/list/get/pending',
  GET_LIST_FULFILLED: 'kanbanBoardIdColumnIdTasksIds/list/get/fulfilled',
  GET_LIST_REJECTED: 'kanbanBoardIdColumnIdTasksIds/list/get/rejected',

  CREATE_TASK_PENDING: 'kanbanBoardIdColumnIdTasksIds/createTask/pending',
  CREATE_TASK_FULFILLED: 'kanbanBoardIdColumnIdTasksIds/createTask/fulfilled',
  CREATE_TASK_REJECTED: 'kanbanBoardIdColumnIdTasksIds/createTask/rejected',

  MOVE_TASK_IN_COLUMN_PENDING: 'kanbanBoardIdColumnIdTasksIds/move/task/pending',
  MOVE_TASK_IN_COLUMN_FULFILLED: 'kanbanBoardIdColumnIdTasksIds/move/task/fulfilled',
  MOVE_TASK_IN_COLUMN_REJECTED: 'kanbanBoardIdColumnIdTasksIds/move/task/rejected',

  MOVE_TASK_BETWEEN_COLUMNS_PENDING: 'kanbanBoardIdColumnIdTasksIds/betweenColumns/move/task/pending',
  MOVE_TASK_BETWEEN_COLUMNS_FULFILLED: 'kanbanBoardIdColumnIdTasksIds/betweenColumns/move/task/fulfilled',
  MOVE_TASK_BETWEEN_COLUMNS_REJECTED: 'kanbanBoardIdColumnIdTasksIds/betweenColumns/move/task/rejected',

  REMOVE_TASK_PENDING: 'kanbanBoardIdColumnIdTasksIds/removeTask/pending',
  REMOVE_TASK_FULFILLED: 'kanbanBoardIdColumnIdTasksIds/removeTask/fulfilled',
  REMOVE_TASK_REJECTED: 'kanbanBoardIdColumnIdTasksIds/removeTask/rejected',

} as const;
