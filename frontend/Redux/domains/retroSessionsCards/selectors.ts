import { TEntityID, TRetroCard } from '@chpokify/models-types';
import { createSelector } from '@reduxjs/toolkit';
import { compact, uniq } from 'lodash';

import { TAppState } from '@Redux/types';

const getCards = ({ retroSessionsCards }: TAppState) => retroSessionsCards;

const getEntities = createSelector(
  getCards,
  (retroSessionsCards) => retroSessionsCards.entities
);

const getList = createSelector(
  getEntities,
  (entities) => compact(Object.values(entities)) as TRetroCard[]
);

const getCount = createSelector(
  getList,
  (list) => list.length
);

const getById = createSelector(
  getEntities,
  (entities) => (cardId: TEntityID | null | undefined) => {
    if (!cardId) {
      return undefined;
    }

    return entities[cardId.toString()];
  }
);

const getTitle = createSelector(
  getById,
  (getByIdSelector) => (cardId: TEntityID | null | undefined) => {
    const card = getByIdSelector(cardId);

    if (!card) {
      return undefined;
    }

    return card.title;
  }
);

const getDescription = createSelector(
  getById,
  (getByIdSelector) => (cardId: TEntityID | null | undefined) => {
    const card = getByIdSelector(cardId);

    if (!card) {
      return undefined;
    }

    return card.description;
  }
);

const getHasDescription = createSelector(
  getById,
  (getByIdSelector) => (cardId: TEntityID | null | undefined) => {
    const card = getByIdSelector(cardId);

    if (!card) {
      return false;
    }

    return !!card.description;
  }
);

const getUserId = createSelector(
  getById,
  (getByIdSelector) => (cardId: TEntityID | null | undefined) => {
    const card = getByIdSelector(cardId);

    if (!card) {
      return undefined;
    }

    return card.userId;
  }
);

const getIsCompleted = createSelector(
  getById,
  (getByIdSelector) => (cardId: TEntityID | null | undefined) => {
    const card = getByIdSelector(cardId);

    if (!card) {
      return undefined;
    }

    return !!card.isCompleted;
  }
);

const getVotes = createSelector(
  getById,
  (getByIdSelector) => (cardId: TEntityID | null | undefined) => {
    const card = getByIdSelector(cardId);

    if (!card) {
      return [];
    }

    return card.votes;
  }
);

const getCountVotes = createSelector(
  getVotes,
  (getVotesSelector) => (cardId: TEntityID | null | undefined) => {
    const votes = getVotesSelector(cardId);

    return votes.length;
  }
);

const getCombinedCards = createSelector(
  getById,
  (getByIdSelector) => (cardId: TEntityID | undefined) => {
    const card = getByIdSelector(cardId);

    if (!card || !card.combinedCards.length) {
      return [];
    }

    return card.combinedCards;
  }
);

const getHasCombinedCards = createSelector(
  getById,
  (getByIdSelector) => (cardId: TEntityID | undefined) => {
    const card = getByIdSelector(cardId);

    if (!card || !card.combinedCards.length) {
      return false;
    }

    return !!card.combinedCards.length;
  }
);

const getCombinedCardsTitles = createSelector(
  getCombinedCards,
  (getCombinedCardsSelector) => (cardId: TEntityID | undefined) => {
    const combinedCards = getCombinedCardsSelector(cardId);

    if (!combinedCards) {
      return [];
    }

    return compact(
      combinedCards.map((card) => card.title)
    );
  }
);

const getCombinedCardsDescriptions = createSelector(
  getCombinedCards,
  (getCombinedCardsSelector) => (cardId: TEntityID | undefined) => {
    const combinedCards = getCombinedCardsSelector(cardId);

    if (!combinedCards) {
      return [];
    }

    return compact(
      combinedCards.map((card) => card.description)
    );
  }
);

const getCombinedCardsAuthors = createSelector(
  [
    getUserId,
    getCombinedCards,
  ],
  (getUserIdFromCardSelector, getCombinedCardsSelector) => (cardId: TEntityID | undefined) => {
    const combinedCards = getCombinedCardsSelector(cardId);

    if (!combinedCards) {
      return [];
    }

    const userId = getUserIdFromCardSelector(cardId);

    if (!userId) {
      return [];
    }

    const userIds = [userId];

    const userIdsFromCombinedCards = combinedCards.map((card) => card.userId);

    userIds.push(...userIdsFromCombinedCards);

    return uniq(userIds);
  }
);

export const retroSessionsCardsSelectors = {
  getEntities,
  getById,
  getTitle,
  getIsCompleted,
  getUserId,
  getVotes,
  getCountVotes,
  getList,
  getCount,
  getCombinedCards,
  getCombinedCardsTitles,
  getCombinedCardsAuthors,
  getDescription,
  getHasDescription,
  getCombinedCardsDescriptions,
  getHasCombinedCards,
};
