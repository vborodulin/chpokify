import { SPACE_PARTICIPANT_ROLE, TEntityID, TSpace } from '@chpokify/models-types';

import { isEqualsId } from './common';

const getParticipant = (space: TSpace | null | undefined, userId: TEntityID | null | undefined) => {
  if (space && userId) {
    return space.participants.find((item) => isEqualsId(item.userId, userId));
  }

  return null;
};

const getParticipantRole = (space: TSpace | null | undefined, userId: TEntityID | null | undefined) => {
  if (!space || !userId) {
    return SPACE_PARTICIPANT_ROLE.GUEST;
  }

  const participant = getParticipant(space, userId);

  if (!participant) {
    return SPACE_PARTICIPANT_ROLE.GUEST;
  }

  return participant.role;
};

const getTeamUsersIds = (space: TSpace, teamId: TEntityID) => {
  const {
    participants,
    teams,
  } = space;

  const team = teams.find((t) => isEqualsId(t._id, teamId));

  if (!team) {
    return [];
  }

  const usersIds: TEntityID[] = [];

  participants.forEach((participant) => {
    const { _id, userId } = participant;

    const inTeam = team.participantsIds.some((participantId) => isEqualsId(participantId, _id));

    if (inTeam) {
      usersIds.push(userId);
    }
  });

  return usersIds;
};

const getTeamInSpace = (space: TSpace, teamId: TEntityID) =>
  space.teams.some((t) => isEqualsId(t._id, teamId));

const getIsLastAdmin = (space: TSpace, participantId: TEntityID) => {
  const isAdmin = getParticipantRole(space, participantId) === SPACE_PARTICIPANT_ROLE.ADMIN;

  if (!isAdmin) {
    return false;
  }

  return !space.participants.some((participant) => participant.role === SPACE_PARTICIPANT_ROLE.ADMIN
    && !isEqualsId(participantId, participant._id));
};

export const spaceHelpers = {
  getParticipant,
  getParticipantRole,
  getTeamUsersIds,
  getTeamInSpace,
  getIsLastAdmin,
};
