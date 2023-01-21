import { isEqualsId } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';
import { createSelector } from '@reduxjs/toolkit';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroSessionsCardsSelectors } from '@Redux/domains/retroSessionsCards/selectors';
import { usersSelectors } from '@Redux/domains/users/selectors';

const getUserFromCard = createSelector(
  [
    retroSessionsCardsSelectors.getById,
    usersSelectors.getById,
  ],
  (getRetroCardByIdSelector, getUserByIdSelector) => (cardId: TEntityID | undefined) => {
    if (!cardId) {
      return;
    }

    const retroCard = getRetroCardByIdSelector(cardId);

    if (!retroCard) {
      return;
    }

    return getUserByIdSelector(retroCard.userId);
  }
);

const getIsMyCard = createSelector(
  [
    retroSessionsCardsSelectors.getById,
    authSelectors.getCurrUserId,
  ],
  (getByIdSelector, userId) => (cardId: TEntityID | null | undefined) => {
    const card = getByIdSelector(cardId);

    if (!card || !userId) {
      return false;
    }

    return isEqualsId(card.userId, userId);
  }
);

const getIsHiddenCard = createSelector(
  [
    retroSessionsSelectors.getIsHiddenCards,
    getIsMyCard,
  ],
  (isHiddenCards, getIsMyCardSelector) =>
    (cardId: TEntityID | null | undefined) => {
      if (!isHiddenCards) {
        return false;
      }

      return !getIsMyCardSelector(cardId);
    }
);

const getMyVotesByCardId = createSelector(
  [
    retroSessionsCardsSelectors.getById,
    authSelectors.getCurrUserId,
  ],
  (getByIdSelector, currUserId) => (cardId: TEntityID | undefined) => {
    const card = getByIdSelector(cardId);

    if (!card || !currUserId) {
      return [];
    }

    return card.votes.filter((voteId) => isEqualsId(voteId, currUserId));
  }
);

const getHasMyVotesByCardId = createSelector(
  getMyVotesByCardId,
  (getMyVotesSelector) => (cardId: TEntityID | undefined) => {
    const votes = getMyVotesSelector(cardId);

    return !!votes.length;
  }
);

const getCountMyVotesByCardId = createSelector(
  getMyVotesByCardId,
  (getMyVotesSelector) => (cardId: TEntityID | undefined) => {
    const votes = getMyVotesSelector(cardId);

    return votes.length;
  }
);

const getMyVotes = createSelector(
  [
    retroSessionsCardsSelectors.getList,
    authSelectors.getCurrUserId,
  ],
  (retroCards, currUserId) => {
    if (!retroCards.length) {
      return [];
    }

    return retroCards.reduce((card:TEntityID[], nextCard) => {
      const myVotes = nextCard.votes.filter((voteId) => isEqualsId(voteId, currUserId));
      card = card.concat(myVotes);

      return card;
    }, []);
  }
);

const getCountMyVotes = createSelector(
  getMyVotes,
  (myVotes) => myVotes.length
);

const getCanVotesByCardId = createSelector(
  [
    getCountMyVotesByCardId,
    getCountMyVotes,
    retroSessionsSelectors.getIsOneVoteCards,
    retroSessionsSelectors.getMaxVotesCard,
  ],
  (getCountMyVotesByCardIdSelector, countMyVotes, isOneVoteCards, maxVotesCard) => (cardId:TEntityID) => {
    if (!cardId) {
      return false;
    }

    const countMyVotesPerCard = getCountMyVotesByCardIdSelector(cardId);

    if (isOneVoteCards && countMyVotesPerCard) {
      return false;
    }

    return countMyVotes ? countMyVotes < maxVotesCard : true;
  }
);

export const retroSessionsCardsRepoSelectors = {
  getUserFromCard,
  getIsMyCard,
  getIsHiddenCard,
  getHasMyVotesByCardId,
  getMyVotesByCardId,
  getCountMyVotesByCardId,
  getMyVotes,
  getCountMyVotes,
  getCanVotesByCardId,
};
