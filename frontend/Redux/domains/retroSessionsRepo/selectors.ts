import { isEqualsId } from '@chpokify/helpers';
import { TEntityID, TTeam, TUserProtected } from '@chpokify/models-types';
import { createSelector } from '@reduxjs/toolkit';
import { union } from 'lodash';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroSessionsRelationsSelectors } from '@Redux/domains/retroSessionsRelations/selectors';
import { retroTemplatesSelectors } from '@Redux/domains/retroTemplates/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

const getPeopleIdsByRetroSessionId = createSelector(
  [
    retroSessionsSelectors.getById,
    spacesSelectors.getCurrSpaceId,
    spacesSelectors.getTeamsByIds,
  ],
  (getByIdSelectors, currSpaceId, getTeamsByIdsSelectors) =>
    (retroSessionId: TEntityID | undefined) => {
      const retroSession = getByIdSelectors(retroSessionId);

      if (!retroSession || !retroSession.teamsIds.length) {
        return [];
      }

      const currTeams = getTeamsByIdsSelectors(currSpaceId, retroSession.teamsIds) as TTeam[];

      if (!currTeams.length) {
        return [];
      }

      return union(...currTeams.map((team) => team.participantsIds));
    }
);

const getPeopleByRetroSessionId = createSelector(
  [
    getPeopleIdsByRetroSessionId,
    spacesRepoSelectors.getUsersByParticipantIds,
  ], (
    getPeopleIdsByRetroSessionIdSelector,
    getUserByParticipantsIdsSelector
  ) => (retroSessionId: TEntityID | undefined): TUserProtected[] => {
    const participantsIds = getPeopleIdsByRetroSessionIdSelector(retroSessionId);

    if (!participantsIds.length) {
      return [];
    }

    return getUserByParticipantsIdsSelector(participantsIds);
  }
);

const getCountPeopleByRetroSessionId = createSelector(
  [
    getPeopleIdsByRetroSessionId,
  ], (getPeopleIdsByRetroSessionIdSelector) => (retroSessionId: TEntityID | undefined) => {
    const peopleIds = getPeopleIdsByRetroSessionIdSelector(retroSessionId);

    return peopleIds.length;
  }
);

const getCardsIdsFromActionColumnByRetroSessionId = createSelector(
  [
    retroSessionsSelectors.getById,
    retroTemplatesSelectors.getById,
    retroTemplatesSelectors.getActionColumnId,
    retroSessionsRelationsSelectors.getCardsByColumnId,
  ],
  (
    getByIdSelectors,
    getTemplateByIdSelectors,
    getColumnActionIdSelectors,
    getCardsByColumnByIdSelectors
  ) =>
    (retroSessionId: TEntityID | undefined) => {
      const retroSession = getByIdSelectors(retroSessionId);

      if (!retroSession) {
        return [];
      }

      const template = getTemplateByIdSelectors(retroSession.templateId);

      if (!template) {
        return [];
      }

      const columnActionId = getColumnActionIdSelectors(template._id);

      if (!columnActionId) {
        return [];
      }

      return getCardsByColumnByIdSelectors(columnActionId);
    }
);

const getCountCardsFromActionColumnByRetroSessionId = createSelector(
  getCardsIdsFromActionColumnByRetroSessionId,
  (getCardsFromActionColumnByRetroSessionIdSelector) =>
    (retroSessionId: TEntityID | undefined) => {
      const cards = getCardsFromActionColumnByRetroSessionIdSelector(retroSessionId);
      return cards.length;
    }
);

const getIsUserParticipant = createSelector(
  [
    spacesSelectors.getParticipant,
    spacesSelectors.getCanModerate,
    spacesSelectors.getById,
    retroSessionsSelectors.getCurr,
  ],
  (
    getParticipantSelector,
    getCanModerateSelector,
    getSpaceSelector,
    retroSession
  ) => (userId: TEntityID | undefined) => {
    if (!retroSession || !userId) {
      return false;
    }

    const space = getSpaceSelector(retroSession?.spaceId);
    const participant = getParticipantSelector(space?._id, userId);

    if (!space || !retroSession || !participant) {
      return false;
    }

    const cantModerate = getCanModerateSelector(space._id, userId);

    if (cantModerate) {
      return true;
    }

    const { teams } = space;

    const pokerSessionTeams = teams.filter((team) =>
      retroSession.teamsIds.some((teamId) =>
        isEqualsId(teamId, team._id)));

    return pokerSessionTeams.some((team) =>
      team.participantsIds.some((participantId) =>
        isEqualsId(participantId, participant._id)));
  }
);

const getCanEditCardsWithCanModerate = createSelector(
  [
    retroSessionsSelectors.getCanEditCards,
    spacesRepoSelectors.getCanModerateMeCurr,
  ], (canEditCards, canModerate) => {
    if (!canModerate) {
      return false;
    }

    return !canEditCards && canModerate;
  }
);

const getCountCardsByRetroSessionId = createSelector(
  [
    retroSessionsSelectors.getById,
    retroTemplatesSelectors.getColumnIdsById,
    retroSessionsRelationsSelectors.getCountCardsByColumnById,
  ],
  (
    getByIdSelector,
    getColumnIdsByIdSelector,
    getCountCardsByColumnByIdSelector
  ) => (retroSessionId: TEntityID | undefined) => {
    const retroSession = getByIdSelector(retroSessionId);

    if (!retroSession) {
      return 0;
    }

    const columnIds = getColumnIdsByIdSelector(retroSession.templateId);

    if (!columnIds.length) {
      return 0;
    }

    let countCards = 0;

    for (const columnId of columnIds) {
      countCards += getCountCardsByColumnByIdSelector(columnId);
    }

    return countCards;
  }
);

const retroSessionRepoSelectors = {
  getCountPeopleByRetroSessionId,
  getIsUserParticipant,
  getPeopleByRetroSessionId,
  getCanEditCardsWithCanModerate,
  getCountCardsByRetroSessionId,
  getCardsIdsFromActionColumnByRetroSessionId,
  getCountCardsFromActionColumnByRetroSessionId,
};

export {
  retroSessionRepoSelectors,
};
