import { TEntityID, TRetroCard } from '@chpokify/models-types';

import { retroSessionsCardsActionsTypes } from '@Redux/domains/retroSessionsCards/actionsTypes';

const upsert = (retroSessionCard: TRetroCard) => ({
  type: retroSessionsCardsActionsTypes.UPSERT,
  payload: {
    retroSessionCard,
  },
}) as const;

const remove = (retroSessionCardId: TEntityID) => ({
  type: retroSessionsCardsActionsTypes.REMOVE,
  payload: {
    retroSessionCardId,
  },
}) as const;

const retroSessionsCardsAction = {
  upsert,
  remove,
};

export {
  retroSessionsCardsAction,
};
