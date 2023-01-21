import { retroRelationsSchemas } from '@chpokify/api-schemas';
import { arrayHelpers, isEqualsId } from '@chpokify/helpers';
import { TEntityID, TRetroRelations } from '@chpokify/models-types';
import { combineReducers } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { isEqual } from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

import { TAppAction } from '@Redux/types';

import { retroSessionsRelationsActionsTypes } from './actionsTypes';

type TEntitiesState = Record<string, TRetroRelations | undefined>;

const entitiesInitialState: TEntitiesState = {};

const entitiesReducer = (state: TEntitiesState = entitiesInitialState, action: TAppAction): TEntitiesState => {
  switch (action.type) {
    case HYDRATE: {
      if (isEqual(action.payload.retroSessionsRelations.entities, state)) {
        return state;
      }

      return update(state, {
        $set: action.payload.retroSessionsRelations.entities,
      });
    }

    case retroSessionsRelationsActionsTypes.GET_LIST_BY_TEMPLATES_IDS_FULFILLED:
    case retroSessionsRelationsActionsTypes.GET_LIST_FULFILLED:
      return update(state, { $set: arrayHelpers.normalizeArr(action.payload.retroRelations, '_id') });

    case retroSessionsRelationsActionsTypes.UPSERT:
      return update(state, {
        [action.payload.retroRelation._id.toString()]: { $set: action.payload.retroRelation },
      });

    case retroSessionsRelationsActionsTypes.MOVE_CARD_BETWEEN_COLUMNS_PENDING: {
      const [{
        columnStartId,
        columnFinishId,
        cardStartIdx,
        cardFinishIdx,
        cardId,
      }] = action.payload.args.slice(2) as
        [retroRelationsSchemas.TMoveCardBetweenColumnsBodyReq];

      const arrState = Object.values(state) as TRetroRelations[];

      const stateFromColumnStartId = arrState.find((el) => isEqualsId(el.columnId, columnStartId));
      const stateFromColumnFinishId = arrState.find((el) => isEqualsId(el.columnId, columnFinishId));

      if (!stateFromColumnStartId || !stateFromColumnFinishId) {
        return state;
      }

      const cardsIdsFromColumnStart = stateFromColumnStartId.cardsIds;
      const cardsIdsFromColumnFinish = stateFromColumnFinishId.cardsIds;

      if (!cardsIdsFromColumnStart || !cardsIdsFromColumnFinish) {
        return state;
      }

      const startCardsIds = Array.from(cardsIdsFromColumnStart);
      startCardsIds.splice(cardStartIdx, 1);

      const finishCardsIds = Array.from(cardsIdsFromColumnFinish);
      finishCardsIds.splice(cardFinishIdx, 0, cardId);

      return update(state, {
        [stateFromColumnStartId._id.toString()]: {
          cardsIds: { $set: startCardsIds },
        },
        [stateFromColumnFinishId._id.toString()]: {
          cardsIds: { $set: finishCardsIds },
        },
      });
    }

    case retroSessionsRelationsActionsTypes.MOVE_CARD_IN_COLUMN_PENDING: {
      const [
        columnId, {
          cardStartIdx,
          cardFinishIdx,
          cardId,
        }] = action.payload.args.slice(2) as
        [TEntityID, retroRelationsSchemas.TMoveCardInColumnBodyReq];

      if (!columnId) {
        return state;
      }

      const arrState = Object.values(state) as TRetroRelations[];

      const findRow = arrState.find((el) => isEqualsId(el.columnId, columnId));

      if (!findRow) {
        return state;
      }

      const _id = findRow._id.toString();
      const cardsIds = state[_id]?.cardsIds;

      if (!cardsIds) {
        return state;
      }

      const newCardIds = Array.from(cardsIds);
      newCardIds.splice(cardStartIdx, 1);
      newCardIds.splice(cardFinishIdx, 0, cardId);

      return update(state, {
        [_id]: {
          cardsIds: { $set: newCardIds },
        },
      });
    }

    default:
      return state;
  }
};

export const retroSessionsRelationsReducer = combineReducers({
  entities: entitiesReducer,
});
