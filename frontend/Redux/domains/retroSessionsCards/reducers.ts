import { retroCardsSchemas } from '@chpokify/api-schemas';
import { arrayHelpers } from '@chpokify/helpers';
import { TRetroCard } from '@chpokify/models-types';
import { combineReducers } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { isEqual } from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

import { TAppAction } from '@Redux/types';

import { retroSessionsCardsActionsTypes } from './actionsTypes';

type TEntitiesState = Record<string, TRetroCard | undefined>;

const entitiesInitialState: TEntitiesState = {};

const entitiesReducer = (state: TEntitiesState = entitiesInitialState, action: TAppAction): TEntitiesState => {
  switch (action.type) {
    case HYDRATE: {
      if (isEqual(action.payload.retroSessionsCards.entities, state)) {
        return state;
      }

      return update(state, {
        $set: action.payload.retroSessionsCards.entities,
      });
    }

    case retroSessionsCardsActionsTypes.GET_LIST_FULFILLED:
      return update(state, { $set: arrayHelpers.normalizeArr(action.payload.retroCards, '_id') });

    case retroSessionsCardsActionsTypes.UPSERT: {
      const { retroSessionCard } = action.payload;
      return update(state, { [retroSessionCard._id.toString()]: { $set: retroSessionCard } });
    }

    case retroSessionsCardsActionsTypes.REMOVE: {
      const { retroSessionCardId } = action.payload;
      return update(state, { $unset: [retroSessionCardId.toString()] });
    }

    case retroSessionsCardsActionsTypes.COMBINED_CARD_PENDING: {
      const [{
        cardId,
      }] = action.payload.args.slice(2) as
        [retroCardsSchemas.TCombineCardBodyReq];

      return update(state, { $unset: [cardId.toString()] });
    }

    default:
      return state;
  }
};

export const retroSessionsCardsReducer = combineReducers({
  entities: entitiesReducer,
});
