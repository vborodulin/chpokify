import { isEqualsId } from '@chpokify/helpers';
import { TEntityID, TKanbanBoardIdColumnIdTasksIds } from '@chpokify/models-types';
import { createSelector } from '@reduxjs/toolkit';

import { TAppState } from '@Redux/types';

const getBoards = ({ kanbanBoardRelations }: TAppState) => kanbanBoardRelations;

const getEntities = createSelector(
  getBoards,
  (boards) => boards.entities
);

const getEntitiesList = createSelector(
  getBoards,
  (boards) =>
    Object.values(boards.entities) as TKanbanBoardIdColumnIdTasksIds[]
);

const getByColumnById = createSelector(
  [
    getEntitiesList,
  ],
  (entities) => (columnId: TEntityID) => {
    if (!entities.length) {
      return undefined;
    }

    return entities.find((entity) => isEqualsId(entity.columnId, columnId));
  }
);

export const kanbanBoardRelationsSelectors = {
  getBoards,
  getEntities,
  getEntitiesList,
  getByColumnById,
};
