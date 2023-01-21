import { isEqualsId } from '@chpokify/helpers';
import { TEntityID, TRetroRelations } from '@chpokify/models-types';
import { createSelector } from '@reduxjs/toolkit';

import { TAppState } from '@Redux/types';

const getRelations = ({ retroSessionsRelations }: TAppState) => retroSessionsRelations;

const getEntities = createSelector(
  getRelations,
  (retroSessionsRelations) => retroSessionsRelations.entities
);

const getEntitiesList = createSelector(
  getEntities,
  (entities) =>
    Object.values(entities) as TRetroRelations[]
);

const getColumnById = createSelector(
  getEntitiesList,
  (entities) => (columnId: TEntityID | undefined) => {
    if (!entities.length || !columnId) {
      return undefined;
    }

    return entities.find((entity) => isEqualsId(entity.columnId, columnId));
  }
);

const getCardsByColumnId = createSelector(
  getColumnById,
  (getByColumnByIdSelector) => (columnId: TEntityID | undefined) => {
    const retroRelation = getByColumnByIdSelector(columnId);

    if (!retroRelation) {
      return [];
    }

    return retroRelation.cardsIds;
  }
);

const getCountCardsByColumnById = createSelector(
  getCardsByColumnId,
  (getCardsByColumnIdSelectors) => (columnId: TEntityID) => {
    const cardsIds = getCardsByColumnIdSelectors(columnId);

    return cardsIds.length;
  }
);

export const retroSessionsRelationsSelectors = {
  getRelations,
  getEntities,
  getEntitiesList,
  getColumnById,
  getCardsByColumnId,
  getCountCardsByColumnById,
};
