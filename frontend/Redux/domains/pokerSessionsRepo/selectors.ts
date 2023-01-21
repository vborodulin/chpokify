import { isEqualsId } from '@chpokify/helpers';
import { TEntityID, TTeam } from '@chpokify/models-types';
import { TPokerSession } from '@chpokify/models-types/pokerSession';
import { createSelector } from '@reduxjs/toolkit';
import { get } from 'lodash';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

const getMyTeams = createSelector(
  [
    spacesRepoSelectors.getCurrParticipantId,
    pokerSessionsSelectors.getCurr,
    spacesSelectors.getById,
  ],
  (currParticipantId, pokerSession, getSpaceSelector) => {
    if (!pokerSession) {
      return null;
    }

    const space = getSpaceSelector(pokerSession.spaceId);

    if (!space) {
      return null;
    }

    const { teams } = space;
    const sessionTeamsIds = pokerSession.teamsIds;

    const votingTeams = teams.filter((team) =>
      sessionTeamsIds.some((sessionTeamId) => isEqualsId(sessionTeamId, team._id)));

    return votingTeams.filter((votingTeam) => votingTeam.participantsIds.some(
      (participantId) => isEqualsId(currParticipantId, participantId)
    ));
  }
);

const getMyTeamsIds = createSelector(
  getMyTeams,
  (teams) => {
    if (!teams) {
      return [];
    }

    return teams.map((team) => team._id);
  }
);

const getMyVotingCardId = createSelector(
  [
    authSelectors.getCurrUserId,
    pokerSessionsSelectors.getCurr,
  ],
  (currUserId, pokerSession) => (teamId: TEntityID | null | undefined) => {
    if (!teamId) {
      return null;
    }

    return get(pokerSession, `active.voting.${teamId}.userCards.${currUserId}`);
  }
);

const getNextIsTeamVoting = createSelector(
  pokerSessionsSelectors.getCurr,
  getMyVotingCardId,
  (pokerSession, getVotingCardId) => (
    teams: TTeam[] | null | undefined
  ) => {
    if (!pokerSession || !teams) {
      return undefined;
    }

    return teams.find((team) =>
      !!get(pokerSession, `active.voting.${team._id}`)
      && !getVotingCardId(team?._id));
  }
);

const getIsUserParticipant = createSelector(
  [
    spacesSelectors.getParticipant,
    spacesSelectors.getCanModerate,
    spacesSelectors.getById,
  ],
  (
    getParticipantSelector,
    getCanModerateSelector,
    getSpaceSelector
  ) => (pokerSession: TPokerSession | undefined, userId: TEntityID | undefined) => {
    if (!pokerSession || !userId) {
      return false;
    }

    const space = getSpaceSelector(pokerSession?.spaceId);
    const participant = getParticipantSelector(space?._id, userId);

    if (!space || !pokerSession || !participant) {
      return false;
    }

    const cantModerate = getCanModerateSelector(space._id, userId);

    if (cantModerate) {
      return true;
    }

    const { teams } = space;

    const pokerSessionTeams = teams.filter((team) =>
      pokerSession.teamsIds.some((teamId) =>
        isEqualsId(teamId, team._id)));

    return pokerSessionTeams.some((team) =>
      team.participantsIds.some((participantId) =>
        isEqualsId(participantId, participant._id)));
  }
);

const getTeams = createSelector(
  [
    pokerSessionsSelectors.getById,
    spacesSelectors.getTeamsByIds,
  ],
  (getPokerSessionByIdSelect, getTeamsByIdSelector) => (pokerSessionId: TEntityID) => {
    const pokerSession = getPokerSessionByIdSelect(pokerSessionId);

    if (!pokerSession) {
      return [];
    }

    return getTeamsByIdSelector(pokerSession.spaceId, pokerSession.teamsIds);
  }
);

const getCanModerate = createSelector(
  [
    pokerSessionsSelectors.getById,
    spacesSelectors.getCanModerate,
  ],
  (getPokerSessionById, getSpaceCanModerate) => (pokerSessionId: TEntityID, userId: TEntityID | undefined) =>
    getSpaceCanModerate(getPokerSessionById(pokerSessionId)?.spaceId, userId)
);

const getIsAllTeamVoted = createSelector(
  [
    pokerSessionsSelectors.getById,
    pokerSessionsSelectors.getTeamVoting,
    spacesSelectors.getTeamParticipants,
  ],
  (getPokerSessionByIdSelector, getTeamVotingSelector, getTeamParticipants) => (
    pokerSessionId: TEntityID | null,
    teamId: TEntityID
  ) => {
    const pokerSession = getPokerSessionByIdSelector(pokerSessionId);

    if (!pokerSession) {
      return false;
    }

    const teamParticipants = getTeamParticipants(
      pokerSession.spaceId,
      teamId
    );

    const voting = getTeamVotingSelector(pokerSessionId, teamId);

    if (!voting) {
      return false;
    }

    const { userCards } = voting;
    const { usersIds } = pokerSession;

    const hasUserWithoutSelectedCard = teamParticipants.find(
      ({ userId }) => {
        const isUserInSession = usersIds.some((sessionUserId) => isEqualsId(sessionUserId, userId));

        if (!isUserInSession) {
          return false;
        }

        return !userCards[userId.toString()];
      }
    );

    return !hasUserWithoutSelectedCard;
  }
);

const getTeamsWithSort = createSelector(
  [
    pokerSessionsSelectors.getCurr,
    getMyTeamsIds,
  ],
  (pokerSession, teamsIds) => {
    if (!pokerSession || !teamsIds) {
      return [];
    }

    pokerSession.teamsIds.sort((teamIdPrev, teamIdNext) => {
      const hasMyTeamPrev = teamsIds.includes(teamIdPrev);
      const hasMyTeamNext = teamsIds.includes(teamIdNext);

      if (hasMyTeamPrev) {
        if (!hasMyTeamNext) {
          return -1;
        }

        return 0;
      }

      return 1;
    });

    return pokerSession.teamsIds;
  }
);

const pokerSessionsRepoSelectors = {
  getMyTeams,
  getMyTeamsIds,
  getMyVotingCardId,
  getIsUserParticipant,
  getTeams,
  getCanModerate,
  getIsAllTeamVoted,
  getNextIsTeamVoting,
  getTeamsWithSort,
};

export {
  pokerSessionsRepoSelectors,
};
