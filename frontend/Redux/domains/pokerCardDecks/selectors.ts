import { arrayHelpers } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';
import { createSelector } from '@reduxjs/toolkit';

import { TAppState } from '@Redux/types';

const getCardDecks = ({ pokerCardDecks }: TAppState) => pokerCardDecks.cardDecks;

const getAllCardDecksList = createSelector(
  getCardDecks,
  (cardDecks) => Object.values(cardDecks)
);

const getCardDecksList = createSelector(
  getCardDecks,
  (cardDecks) => Object.values(cardDecks).filter((el) => !el.isDeleted)
);

const getListSortAskCreatedAt = createSelector(
  getCardDecksList,
  (list) =>
    list.sort((a, b) =>
      // @ts-ignore
      (a?.createdAt > b?.createdAt ? 1 : -1))
);

const getAllCardDecksListOptions = createSelector(
  getAllCardDecksList,
  (cardDecks) => {
    if (arrayHelpers.isEmptyArr(cardDecks)) return [];
    return cardDecks.map((item) => ({
      label: item.title.toString(),
      value: item._id.toString(),
    }));
  }
);

const getCardDecksListOptions = createSelector(
  getListSortAskCreatedAt,
  (cardDecks) => {
    if (arrayHelpers.isEmptyArr(cardDecks)) return [];
    return cardDecks.map((item) => ({
      label: item.title.toString(),
      value: item._id.toString(),
    }));
  }
);

const getCardDeckById = createSelector(
  getCardDecks,
  (cardDecks) => (cardDeckId: TEntityID | undefined) => {
    if (!cardDeckId) {
      return undefined;
    }

    return cardDecks[cardDeckId.toString()];
  }
);

const getTitleCardDeck = createSelector(
  getCardDeckById,
  (getByIdSelector) => (cardDeckId: TEntityID) => {
    const cardDeck = getByIdSelector(cardDeckId);
    if (!cardDeck) return '';
    return cardDeck.title;
  }
);

const pokerCardDecksSelectors = {
  getCardDecks,
  getCardDeckById,
  getTitleCardDeck,
  getAllCardDecksList,
  getCardDecksList,
  getAllCardDecksListOptions,
  getCardDecksListOptions,
};

export {
  pokerCardDecksSelectors,
};
