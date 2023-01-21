import { retroSessionsSchemas, TSuccessResponse, TSuccessVoidResult } from '@chpokify/api-schemas';
import { TEntityID } from '@chpokify/models-types';

import { api } from '@lib/api';

const getList = async (spaceId: TEntityID, queryProps?: retroSessionsSchemas.TGetListQueryReq) => {
  let url = `/retro-sessions/spaces/${spaceId}`;

  if (queryProps?.limit) {
    const { limit } = queryProps;
    const urlWithParams = new URLSearchParams({ limit });
    url += `?${urlWithParams.toString()}`;
  }

  return api.get<TSuccessResponse<retroSessionsSchemas.TGetListResResp>>(
    url
  );
};

const get = async (retroSessionId: TEntityID) => (
  api.get<TSuccessResponse<retroSessionsSchemas.TGetResResp>>(
    `/retro-sessions/${retroSessionId}`
  ));

const createSession = async (data: retroSessionsSchemas.TCreateBodyReq) => (
  api.post<TSuccessResponse<retroSessionsSchemas.TCreateResResp>>(
    '/retro-sessions',
    data
  ));

const updateSession = async (retroSessionId: TEntityID, data: retroSessionsSchemas.TUpdateBodyReq) => (
  api.put<TSuccessResponse<retroSessionsSchemas.TUpdateResResp>>(
    `/retro-sessions/${retroSessionId}`,
    data
  ));

const removeSession = async (retroSessionId: TEntityID) => (
  api.delete<TSuccessResponse<retroSessionsSchemas.TRemoveResResp>>(
    `/retro-sessions/${retroSessionId}`
  ));

const inviteGen = async (retroSessionId: TEntityID, data: retroSessionsSchemas.TGenInviteBodyReq) =>
  api.post<TSuccessResponse<retroSessionsSchemas.TGenInviteResResp>>(
    `/retro-sessions/${retroSessionId}/invite`,
    data
  );

const inviteTokenValidate = async (data: retroSessionsSchemas.TValidateInviteBodyReq) =>
  api.post<TSuccessResponse<retroSessionsSchemas.TValidateInviteResResp>>(
    '/retro-sessions/invite/validate',
    data
  );

const resetVotesCards = async (retroSessionId: TEntityID) => (
  api.delete<TSuccessResponse<TSuccessVoidResult>>(
    `/retro-sessions/${retroSessionId}/votes/cards`
  ));

const exportCardsActionsCSV = async (retroSessionId: TEntityID) =>
  api.get(`/retro-sessions/${retroSessionId}/cardsActions/export/csv`, {
    responseType: 'blob',
  });

const getCountAll = async (spaceId: TEntityID) => (
  api.get<TSuccessResponse<retroSessionsSchemas.TGetCountResResp>>(
    `/retro-sessions/spaces/${spaceId}/count`
  ));

export const retroSessionsApi = {
  createSession,
  updateSession,
  getList,
  get,
  removeSession,
  inviteGen,
  inviteTokenValidate,
  resetVotesCards,
  exportCardsActionsCSV,
  getCountAll,
};
