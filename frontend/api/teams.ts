import { teamsSchemas, TSuccessResponse } from '@chpokify/api-schemas';
import { TEntityID } from '@chpokify/models-types';

import { api } from '@lib/api';

const create = async (spaceId: TEntityID, data: teamsSchemas.TCreateBodyReq) =>
  api.post<TSuccessResponse<teamsSchemas.TUpdateResResp>>(
    `/spaces/${spaceId}/teams`,
    data
  );

const update = async (
  spaceId: TEntityID,
  teamId: TEntityID,
  data: teamsSchemas.TUpdateBodyReq
) =>
  api.patch<TSuccessResponse<teamsSchemas.TUpdateResResp>>(
    `/spaces/${spaceId}/teams/${teamId}`,
    data
  );

const remove = async (spaceId: TEntityID, teamId: TEntityID) =>
  api.delete<TSuccessResponse<teamsSchemas.TDeleteResResp>>(
    `/spaces/${spaceId}/teams/${teamId}`
  );

export const teamsApi = {
  create,
  update,
  remove,
};
