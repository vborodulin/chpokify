import { isEqualsId } from '@chpokify/helpers';
import { TEntityID, TTeam, TUserWithParticipant } from '@chpokify/models-types';
import { createSelector } from '@reduxjs/toolkit';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { usersSelectors } from '@Redux/domains/users/selectors';

const getUsersInSpaceWithParticipants = createSelector(
  [
    usersSelectors.getList,
    spacesSelectors.getSpaceParticipants,
  ],
  (users, getSpaceParticipantsSelector) => (spaceId: TEntityID) => {
    const participants = getSpaceParticipantsSelector(spaceId);

    const usersParticipants: TUserWithParticipant[] = [];

    users.forEach((user) => {
      const participant = participants.find((p) => p.userId === user._id);

      if (!participant) {
        return;
      }

      usersParticipants.push({
        ...user,
        participant,
      });
    });

    return usersParticipants;
  }
);

const getTeamUsersWithParticipants = createSelector(
  getUsersInSpaceWithParticipants,
  (getUsersInSpaceWithParticipantsSelector) => (spaceId: TEntityID, team: TTeam | undefined) => {
    if (!team) {
      return [];
    }

    const usersInSpaceWithParticipants = getUsersInSpaceWithParticipantsSelector(spaceId);

    return usersInSpaceWithParticipants.filter(
      (userWithParticipant) => team.participantsIds.some((participantId) =>
        isEqualsId(userWithParticipant.participant._id, participantId))
    );
  }
);

export const usersRepoSelectors = {
  getUsersInSpaceWithParticipants,
  getTeamUsersWithParticipants,
};
