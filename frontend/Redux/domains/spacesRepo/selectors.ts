import { TEntityID } from '@chpokify/models-types';
import { createSelector } from '@reduxjs/toolkit';
import { compact } from 'lodash';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { usersSelectors } from '@Redux/domains/users/selectors';

const getCurrParticipant = createSelector(
  [
    authSelectors.getCurrUserId,
    spacesSelectors.getCurrSpace,
    spacesSelectors.getParticipant,
  ],
  (userId, space, getParticipantSelector) =>
    getParticipantSelector(space?._id, userId)
);

const getCurrParticipantId = createSelector(
  getCurrParticipant,
  (participant) => participant?._id
);

const getCurrTeamsByParticipantId = createSelector(
  [
    spacesSelectors.getCurrSpace,
  ],
  (space) => (participantId: string | undefined) => {
    if (!participantId || !space) {
      return [];
    }

    const { teams } = space;

    if (!teams) {
      return [];
    }

    return teams.filter((team) => team.participantsIds.includes(participantId));
  }
);

const getCurrTeams = createSelector(
  [
    spacesSelectors.getCurrSpaceId,
    authSelectors.getCurrUserId,
    spacesSelectors.getUserTeams,
  ],
  (spaceId, userId, getUserTeamsSelector) => getUserTeamsSelector(
    spaceId,
    userId
  )
);

const getCurrTeamsIds = createSelector(
  getCurrTeams,
  (teams) => {
    if (!teams) {
      return [];
    }

    return teams.map((team) => team._id);
  }
);

const getCanModerateMeCurr = createSelector(
  [
    spacesSelectors.getCanModerate,
    spacesSelectors.getCurrSpaceId,
    authSelectors.getCurrUserId,
  ],
  (
    getCanModerateSelector,
    spaceId,
    userId
  ) => getCanModerateSelector(spaceId, userId)
);

const getTeamUsers = createSelector(
  [
    spacesSelectors.getTeamParticipants,
    usersSelectors.getMany,
  ],
  (
    getTeamParticipantsSelector,
    getUsersSelector
  ) => (spaceId: TEntityID | undefined, teamId: TEntityID | undefined) => {
    const participants = getTeamParticipantsSelector(spaceId, teamId);
    const usersIds = participants.map((participant) => participant.userId);
    return getUsersSelector(usersIds);
  }
);

const getUsersByParticipantIds = createSelector(
  [
    spacesSelectors.getCurrSpace,
    usersSelectors.getById,
  ],
  (currSpace, getByIdSelector) => (participantIds: TEntityID[]) => {
    const space = currSpace;

    if (!space || !participantIds.length) {
      return [];
    }

    const currentParticipant = space.participants.filter(
      (p) => participantIds.includes(p._id.toString())
    );

    if (!currentParticipant.length) {
      return [];
    }

    return compact(
      currentParticipant.map((p) => getByIdSelector(p.userId))
    );
  }
);

export const spacesRepoSelectors = {
  getCurrParticipant,
  getCurrParticipantId,
  getCurrTeams,
  getCurrTeamsIds,
  getTeamUsers,
  getCanModerateMeCurr,
  getCurrTeamsByParticipantId,
  getUsersByParticipantIds,
};
