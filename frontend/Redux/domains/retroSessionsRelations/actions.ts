import { TEntityID, TRetroRelations } from '@chpokify/models-types';

import { retroSessionsRelationsActionsTypes } from '@Redux/domains/retroSessionsRelations/actionsTypes';

const upsert = (retroRelation: TRetroRelations) => ({
  type: retroSessionsRelationsActionsTypes.UPSERT,
  payload: {
    retroRelation,
  },
}) as const;

const remove = (retroRelationsId: TEntityID) => ({
  type: retroSessionsRelationsActionsTypes.REMOVE,
  payload: {
    retroRelationsId,
  },
}) as const;

const retroSessionsRelationsActions = {

  upsert,
  remove,
};

export {
  retroSessionsRelationsActions,
};
