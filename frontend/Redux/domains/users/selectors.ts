import { isEqualsId } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';
import { createSelector } from '@reduxjs/toolkit';

import { TAppState } from '@Redux/types';

/**
 * root
 */

const getUsers = ({ users }: TAppState) => users;

/**
 * simple
 */

const getEntities = createSelector(
  getUsers,
  (users) => users.entities
);

/**
 * complex
 */

const getList = createSelector(
  getEntities,
  (entities) => Object.values(entities)
);

const getById = createSelector(
  getEntities,
  (entities) => (id: TEntityID) => entities[id.toString()]
);

const getMany = createSelector(
  getList,
  (entities) => (userIds: TEntityID[]) =>
    entities.filter((user) =>
      userIds.some((userId) =>
        isEqualsId(userId, user._id)))
);

export const usersSelectors = {
  getList,
  getById,
  getMany,
};
