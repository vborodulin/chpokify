import { participantsSchemas, TSuccessResponse } from '@chpokify/api-schemas';
import { TEntityID } from '@chpokify/models-types';

import { api } from '@lib/api';

const remove = async (spaceId: TEntityID, participantId: TEntityID) =>
  api.delete<TSuccessResponse<participantsSchemas.TRemoveResResp>>(
    `/spaces/${spaceId}/participants/${participantId}`
  );

const leave = async (spaceId: TEntityID, participantId: TEntityID) => (
  api.delete<TSuccessResponse<participantsSchemas.TLeaveResResp>>(
    `/spaces/${spaceId}/participants/${participantId}/leave`
  )
);

const update = async (participantId: TEntityID) =>
  api.patch(`/spaces/participants/${participantId}`);

const updateTeams = async (spaceId: TEntityID, participantId: TEntityID,
  data: participantsSchemas.TUpdateTeamsBodyReq) =>
  api.post<TSuccessResponse<participantsSchemas.TUpdateTeamsResResp>>(
    `/spaces/${spaceId}/participants/${participantId}/teams`,
    data
  );

const setAdminRole = async (spaceId: TEntityID, participantId: TEntityID, data: participantsSchemas.TSetAdminRoleReq) =>
  api.post<TSuccessResponse<participantsSchemas.TSetAdminRoleResp>>(
    `/spaces/${spaceId}/participants/${participantId}/role/admin`,
    data
  );

export const participantsApi = {
  remove,
  leave,
  update,
  setAdminRole,
  updateTeams,
};
