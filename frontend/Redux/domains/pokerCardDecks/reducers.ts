import { arrayHelpers, objectHelpers } from '@chpokify/helpers';
import { TPokerCardDeck } from '@chpokify/models-types';
import update from 'immutability-helper';
import { isEqual } from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

import { pokerCardDecksActionTypes } from '@Redux/domains/pokerCardDecks/actionTypes';
import { TAppAction } from '@Redux/types';

type TPokerCardDeckState = {
  cardDecks: Record<string, TPokerCardDeck>
}

const initialState: TPokerCardDeckState = {
  cardDecks: {},
};

const pokerCardDecksReducer = (state = initialState, action: TAppAction):TPokerCardDeckState => {
  switch (action.type) {
    case HYDRATE: {
      const { pokerCardDecks } = action.payload;

      if (isEqual(pokerCardDecks.cardDecks, state)
        || objectHelpers.isEmptyObject(pokerCardDecks.cardDecks)) {
        return state;
      }

      return update(state, {
        $set: {
          cardDecks: pokerCardDecks.cardDecks,
        },
      });
    }

    case pokerCardDecksActionTypes.GET_LIST_FULFILLED: {
      const { cardDecks } = action.payload;
      return update(state, {
        cardDecks: { $set: arrayHelpers.normalizeArr(cardDecks, '_id') },
      });
    }

    case pokerCardDecksActionTypes.GET_LIST_WITH_DELETED_FULFILLED: {
      const { cardDecks } = action.payload;
      return update(state, {
        cardDecks: { $set: arrayHelpers.normalizeArr(cardDecks, '_id') },
      });
    }

    case pokerCardDecksActionTypes.CREATE_FULFILLED: {
      const { cardDeck } = action.payload;
      return update(state, { cardDecks: { [cardDeck._id.toString()]: { $set: cardDeck } } });
    }

    case pokerCardDecksActionTypes.UPDATE_FULFILLED: {
      const { cardDeck } = action.payload;
      return update(state, { cardDecks: { [cardDeck._id.toString()]: { $set: cardDeck } } });
    }

    case pokerCardDecksActionTypes.REMOVE_FULFILLED: {
      const { cardDeckId } = action.payload;
      return update(state, { cardDecks: { $unset: [cardDeckId.toString()] } });
    }

    default:
      return state;
  }
};

export {
  pokerCardDecksReducer,
};
