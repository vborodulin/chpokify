import { STORY_SORT, TStory } from '@chpokify/models-types';

import { storiesActionsTypes } from '@Redux/domains/stories/actionsTypes';

const setSort = (sort: STORY_SORT) => ({
  type: storiesActionsTypes.SET_SORT,
  payload: {
    sort,
  },
}) as const;

const upsert = (story: TStory) => ({
  type: storiesActionsTypes.UPSERT,
  payload: {
    story,
  },
}) as const;

const storiesActions = {
  upsert,
  setSort,
};

export {
  storiesActions,
};
