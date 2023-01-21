import { isEqualsId } from '@chpokify/helpers';
import { TEntityID, TKanbanBoard } from '@chpokify/models-types';
import { createSelector } from '@reduxjs/toolkit';

import { TAppState } from '@Redux/types';

const getBoards = ({ kanbanBoards }: TAppState) => kanbanBoards;

const getCurrBoardId = createSelector(
  getBoards,
  (boards) => boards.boardId
);

const getEntities = createSelector(
  getBoards,
  (boards) => boards.entities
);

const getEntitiesList = createSelector(
  getBoards,
  (boards) =>
    Object.values(boards.entities) as TKanbanBoard[]
);

const getCount = createSelector(
  getEntitiesList,
  (boardsList) => boardsList.length
);

const getById = createSelector(
  getEntities,
  (entities) => (boardId: TEntityID | undefined) => {
    if (!boardId) {
      return undefined;
    }

    return entities[boardId.toString()];
  }
);

const getCurrBoard = createSelector(
  [
    getEntities,
    getCurrBoardId,
  ],
  (entities, boardId) => entities[boardId.toString()]
);

const getColumns = createSelector(
  [
    getCurrBoard,
  ],
  (board) => {
    if (!board) {
      return [];
    }

    return board.columns;
  }
);

const getColumnsIds = createSelector(
  [
    getColumns,
  ],
  (columns) => {
    if (!columns.length) {
      return [];
    }

    return columns.map((column) => column._id);
  }
);

const getColumnById = createSelector(
  [
    getCurrBoard,
  ],
  (board) => (columnId: TEntityID) => {
    if (!board || !board.columns) {
      return undefined;
    }

    return board.columns.find((column) => isEqualsId(column._id, columnId));
  }
);

const getBoardTitle = createSelector(
  [
    getById,
  ],
  (getByIdSelector) => (boardId: TEntityID) => {
    const board = getByIdSelector(boardId);
    if (!board) return '';
    return board.title;
  }
);

const getCurrBoardTitle = createSelector(
  [
    getEntities,
    getCurrBoardId,
  ],
  (entities, boardId) => {
    const board = entities[boardId.toString()];
    if (!board) return '';
    return board.title;
  }
);

export const kanbanBoardsSelectors = {
  getBoards,
  getCurrBoardId,
  getEntities,
  getEntitiesList,
  getById,
  getCurrBoard,
  getCurrBoardTitle,
  getBoardTitle,
  getColumns,
  getCount,
  getColumnById,
  getColumnsIds,
};
