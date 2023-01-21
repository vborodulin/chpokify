import { TEntityID, TStory } from '@chpokify/models-types';
import { createSelector } from '@reduxjs/toolkit';
import { first, last } from 'lodash';

import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { storiesSelectors } from '@Redux/domains/stories/selectors';

const getListByPokerSessionId = createSelector(
  [
    pokerSessionsSelectors.getById,
    storiesSelectors.getByIds,
  ],
  (
    getPokerSessionByIdBindStore,
    getStoriesByIdsSelector
  ) => (pokerSessionId?: TEntityID | null) => {
    if (!pokerSessionId) {
      return [];
    }

    const pokerSession = getPokerSessionByIdBindStore(pokerSessionId);

    if (!pokerSession) {
      return [];
    }

    return getStoriesByIdsSelector(pokerSession.storiesIds);
  }
);

const getFirstInPokerSession = createSelector(
  getListByPokerSessionId,
  (getStoriesBindStore) => (pokerSessionId?: TEntityID | null): TStory | undefined =>
    first(getStoriesBindStore(pokerSessionId))
);

const getLastInPokerSession = createSelector(
  getListByPokerSessionId,
  (getStoriesBindStore) => (pokerSessionId?: TEntityID | null): TStory | undefined =>
    last(getStoriesBindStore(pokerSessionId))
);

const storiesRepoSelectors = {
  getListByPokerSessionId,
  getFirstInPokerSession,
  getLastInPokerSession,
};

export {
  storiesRepoSelectors,
};
