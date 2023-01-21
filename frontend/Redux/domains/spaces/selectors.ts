import { isEqualsId, spaceHelpers } from '@chpokify/helpers';
import { SPACE_PARTICIPANT_ROLE, TEntityID, TSpace } from '@chpokify/models-types';
import { createSelector } from '@reduxjs/toolkit';

import { TAppState } from '@Redux/types';

/**
 * root
 */

const getSpaces = ({ spaces }: TAppState) => spaces;

/**
 * simple
 */

const getCurrSpaceId = createSelector(
  getSpaces,
  (spaces) => spaces.spaceId
);

const getIsOpenUpgradePricingPlan = createSelector(
  getSpaces,
  (spaces) => spaces.showUpgradePlanOpen
);

const getEntities = createSelector(
  getSpaces,
  (spaces) => spaces.entities
);

const getInvite = createSelector(
  getSpaces,
  (spaces) => spaces.invite
);

const getMySpaces = createSelector(
  getEntities,
  (spacesMap) => {
    const spaces = Object.values(spacesMap)
      .filter((space) => !!space) as TSpace[];

    return spaces.sort((a, b) => {
      const aCreatedAt = a?.createdAt || '';
      const bCreatedAt = b?.createdAt || '';

      return aCreatedAt > bCreatedAt ? 1 : -1;
    });
  }
);

const getStat = createSelector(
  getSpaces,
  (spaces) => spaces.stat
);

/**
 * complex
 */

// stat

const getSpaceStat = createSelector(
  getStat,
  (stat) => (spaceId: TEntityID) => stat[spaceId.toString()]
);

// invite
const getInviteTokenPayload = createSelector(
  getInvite,
  (invite) => invite?.payload
);

const getInviteToken = createSelector(
  getInvite,
  (invite) => invite?.token
);

// spaces
const getById = createSelector(
  getEntities,
  (entities) => (spaceId: TEntityID | null | undefined) => {
    if (!spaceId) {
      return undefined;
    }

    return entities[spaceId.toString()];
  }
);

const getCurrSpace = createSelector(
  [
    getEntities,
    getCurrSpaceId,
  ],
  (entities, spaceId) => entities[spaceId.toString()]
);

const getCurrSpaceParticipantsCount = createSelector(
  getCurrSpace,
  (space) => space?.participants?.length || 0
);

const getSpaceParticipants = createSelector(
  getById,
  (getByIdSelector) => (spaceId: TEntityID) => {
    const space = getByIdSelector(spaceId);
    return space?.participants || [];
  }
);

const getSpaceParticipantsCount = createSelector(
  getSpaceParticipants,
  (getSpaceParticipantsSelectors) => (spaceId: TEntityID) =>
    getSpaceParticipantsSelectors(spaceId)?.length || 0
);

const getCountAdminsParticipantsFromCurrSpace = createSelector(
  getCurrSpace,
  (space) => {
    if (!space?.participants) {
      return 0;
    }

    return space.participants.reduce((previousValue, participant) => {
      if (participant.role >= SPACE_PARTICIPANT_ROLE.ADMIN) {
        return previousValue + 1;
      }

      return previousValue;
    }, 0);
  }
);

const getLastUsed = createSelector(
  getMySpaces,
  (spaces) => (lastSpaceIdFromStorage: string | undefined) => {
    if (lastSpaceIdFromStorage) {
      const lastUsedSpace = spaces.find((item) => isEqualsId(item._id, lastSpaceIdFromStorage));

      if (lastUsedSpace) {
        return lastUsedSpace;
      }
    }

    return spaces[0];
  }
);

// teams
const getSpaceTeams = createSelector(
  getById,
  (getSpaceByIdSelector) => (spaceId: TEntityID | null | undefined) => {
    const space = getSpaceByIdSelector(spaceId);

    if (!space) {
      return [];
    }

    return space.teams;
  }
);

const getSpaceTeamsOptions = createSelector(
  [getById],
  (getSpaceByIdSelector) => (spaceId: TEntityID) => {
    const space = getSpaceByIdSelector(spaceId);
    if (!space || !space.teams.length) return [];
    return space.teams.map((item) => ({
      label: item.name,
      value: item._id.toString(),
    }));
  }
);

const getTeamById = createSelector(
  getSpaceTeams,
  (getSpaceTeamsSelector) => (spaceId: TEntityID | undefined, teamId: TEntityID | undefined) => {
    const teams = getSpaceTeamsSelector(spaceId);
    return teams.find((team) => isEqualsId(team._id, teamId));
  }
);

const getTeamsByIds = createSelector(
  getSpaceTeams,
  (getSpaceTeamsSelector) => (spaceId: TEntityID, teamsIds: TEntityID[]) => {
    const teams = getSpaceTeamsSelector(spaceId);

    return teams.filter((team) =>
      teamsIds.some((teamId) => isEqualsId(teamId, team._id)));
  }
);

const getCurrTeams = createSelector(
  getCurrSpace,
  (space) => {
    if (space) {
      return space.teams;
    }

    return [];
  }
);

const getCurrCountTeams = createSelector(
  getCurrSpace,
  (space) => {
    if (space) {
      return space.teams.length;
    }

    return 0;
  }
);

const getCurrSpaceTeamById = createSelector(
  getCurrSpace,
  (space) => (teamId: TEntityID) => {
    if (!space) {
      return undefined;
    }

    return space.teams.find((team) => team._id === teamId);
  }
);

const getTeamParticipants = createSelector(
  [
    getById,
  ],
  (getSpaceBindStore) => (spaceId: TEntityID | undefined, teamId: TEntityID | undefined) => {
    const space = getSpaceBindStore(spaceId);

    if (!space) {
      return [];
    }

    const {
      teams,
      participants,
    } = space;

    const team = teams.find((item) => isEqualsId(item._id, teamId));

    if (!team) {
      return [];
    }

    const { participantsIds } = team;

    return participants.filter((participant) =>
      participantsIds.some((pId) => isEqualsId(pId, participant._id)));
  }
);

const getCanModerate = createSelector(
  getById,
  (getSpaceSelector) => (
    spaceId: TEntityID | undefined,
    userId: TEntityID | undefined
  ) => {
    if (!spaceId || !userId) {
      return false;
    }

    const space = getSpaceSelector(spaceId);

    if (!space) {
      return false;
    }

    const participantRole = spaceHelpers.getParticipantRole(space, userId);
    return participantRole >= SPACE_PARTICIPANT_ROLE.ADMIN;
  }
);

const getUsersIds = createSelector(
  getById,
  (getSpaceSelector) => (spaceId: TEntityID | undefined) => {
    if (!spaceId) {
      return [];
    }

    const space = getSpaceSelector(spaceId);

    if (!space) {
      return [];
    }

    return space.participants.map((item) => item.userId);
  }
);

const getIsUserParticipant = createSelector(
  getById,
  (getSpaceSelector) => (
    spaceId: TEntityID | undefined,
    userId: TEntityID | undefined
  ) => {
    if (!spaceId || !userId) {
      return false;
    }

    const space = getSpaceSelector(spaceId);

    if (!space) {
      return false;
    }

    return spaceHelpers.getParticipantRole(space, userId) >= SPACE_PARTICIPANT_ROLE.PLAYER;
  }
);

const getParticipant = createSelector(
  getById,
  (getSpaceByIdSelector) => (
    spaceId: TEntityID | null | undefined,
    userId: TEntityID | null | undefined
  ) => {
    const space = getSpaceByIdSelector(spaceId);

    if (!space || !userId) {
      return undefined;
    }

    return space.participants.find((p) => p.userId === userId);
  }
);

const getUserTeams = createSelector(
  [
    getSpaceTeams,
    getParticipant,
  ],
  (getSpaceTeamsSelector, getParticipantSelector) => (
    spaceId: TEntityID | null | undefined,
    userId: TEntityID | null | undefined
  ) => {
    const participant = getParticipantSelector(spaceId, userId);

    if (!participant) {
      return undefined;
    }

    const teams = getSpaceTeamsSelector(spaceId);

    return teams.filter((team) =>
      team.participantsIds.some((participantId) => isEqualsId(participantId, participant._id)));
  }
);

// subscription
const getCurrSpaceCustomerId = createSelector(
  getCurrSpace,
  (space) => space?.customerId
);

const getIsCurrSpaceFreeSubscription = createSelector(
  getCurrSpace,
  (space) => space?.isFreeSubscription
);

export const spacesSelectors = {
  getInvite,
  getMySpaces,
  getInviteToken,
  getStat,
  getSpaceStat,
  getInviteTokenPayload,
  getCurrSpaceId,
  getById,
  getCurrSpace,
  getSpaceParticipants,
  getSpaceParticipantsCount,
  getLastUsed,
  getTeamById,
  getTeamsByIds,
  getCurrTeams,
  getCurrSpaceTeamById,
  getTeamParticipants,
  getCanModerate,
  getUsersIds,
  getIsUserParticipant,
  getParticipant,
  getUserTeams,
  getCurrSpaceCustomerId,
  getIsCurrSpaceFreeSubscription,
  getSpaceTeams,
  getSpaceTeamsOptions,
  getCurrSpaceParticipantsCount,
  getIsOpenUpgradePricingPlan,
  getCurrCountTeams,
  getCountAdminsParticipantsFromCurrSpace,
};
