import { TPokerCardDeck } from '@chpokify/models-types';

import { pokerCardDecksActionTypes } from '@Redux/domains/pokerCardDecks/actionTypes';

const upsert = (cardDeck: TPokerCardDeck) => ({
  type: pokerCardDecksActionTypes.UPSERT,
  payload: {
    cardDeck,
  },
}) as const;

const pokerCardDecksActions = {
  upsert,
};

export {
  pokerCardDecksActions,
};
