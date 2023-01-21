import { TEntityID } from '@chpokify/models-types';
import { createSelector } from '@reduxjs/toolkit';
import { compact } from 'lodash';

import { TAppState } from '@Redux/types';

/**
 * root
 */
const getStories = ({ stories }: TAppState) => stories;

/**
 * direct
 */

const getEntities = createSelector(
  getStories,
  (stories) => stories.entities
);

const getSort = createSelector(
  getStories,
  (stories) => stories.sort
);

const getListIds = createSelector(
  getStories,
  (stories) => Object.keys(stories.entities)
);

const getList = createSelector(
  getStories,
  (stories) => Object.values(stories.entities)
);

const getCount = createSelector(
  getList,
  (storiesList) => storiesList.length
);

/**
 * complex
 */
const getByIds = createSelector(
  getEntities,
  (entities) => (ids: TEntityID[]) => compact(
    ids.map((id) => entities[id.toString()])
  )
);

const getById = createSelector(
  getEntities,
  (entities) => (taskId: TEntityID | undefined) => {
    if (!taskId) {
      return undefined;
    }

    return entities[taskId.toString()];
  }
);

const getTitle = createSelector(
  getById,
  (getByIdSelector) => (taskId: TEntityID) => {
    const task = getByIdSelector(taskId);

    if (!task) {
      return undefined;
    }

    return task.title;
  }
);

const getDescription = createSelector(
  getById,
  (getByIdSelector) => (taskId: TEntityID) => {
    const task = getByIdSelector(taskId);

    if (!task) {
      return undefined;
    }

    return task.description;
  }
);

const storiesSelectors = {
  getEntities,
  getList,
  getListIds,
  getCount,
  getByIds,
  getById,
  getSort,
  getTitle,
  getDescription,
};

export {
  storiesSelectors,
};
