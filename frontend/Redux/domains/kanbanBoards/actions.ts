import { TEntityID } from '@chpokify/models-types';

import { kanbanBoardActionsTypes } from '@Redux/domains/kanbanBoards/actionsTypes';

const setCurrId = (boardId: TEntityID) => ({
  type: kanbanBoardActionsTypes.CURRENT_ID_SET,
  payload: {
    boardId,
  },
}) as const;

export const kanbanBoardActions = {
  setCurrId,
};
