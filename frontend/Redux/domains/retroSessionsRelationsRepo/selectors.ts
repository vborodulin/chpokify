import { TEntityID } from '@chpokify/models-types';
import { createSelector } from '@reduxjs/toolkit';
import { sortBy } from 'lodash';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroSessionsCardsSelectors } from '@Redux/domains/retroSessionsCards/selectors';
import { retroSessionsRelationsSelectors } from '@Redux/domains/retroSessionsRelations/selectors';

const getCardsIdsBySortVotesCount = createSelector(
  [
    retroSessionsRelationsSelectors.getCardsByColumnId,
    retroSessionsCardsSelectors.getCountVotes,
    retroSessionsSelectors.getIsSortByVotesCount,
  ], (
    getCardsByColumnIdSelector,
    getCountVotesSelector,
    isSortByVotesCount
  ) => (columnId: TEntityID | undefined) => {
    const cardsIds = getCardsByColumnIdSelector(columnId);

    if (!cardsIds.length) {
      return [];
    }

    if (!isSortByVotesCount) {
      return cardsIds;
    }

    return sortBy(cardsIds, (cardId) => -getCountVotesSelector(cardId));
  }
);

const retroSessionsRelationsRepo = {
  getCardsIdsBySortVotesCount,
};

export {
  retroSessionsRelationsRepo,
};
