import { TSuccessResponse } from '@chpokify/api-schemas';
import { storiesSchemas } from '@chpokify/api-schemas/storiesSchemas';
import { TEntityID } from '@chpokify/models-types';

import { api } from '@lib/api';

const getManyFromSpaceId = async (spaceId: TEntityID) =>
  api.get<TSuccessResponse<storiesSchemas.TGetManyResResp>>(
    `/spaces/${spaceId}/stories`
  );

const getMany = async (spaceId: TEntityID, data: storiesSchemas.TGetManyBodyReq) =>
  api.post<TSuccessResponse<storiesSchemas.TGetManyResResp>>(
    `/spaces/${spaceId}/stories/list`,
    data
  );

const create = async (spaceId: TEntityID, data: storiesSchemas.TCreateBodyReq) =>
  api.post<TSuccessResponse<storiesSchemas.TCreateResResp>>(
    `/spaces/${spaceId}/stories`,
    data
  );

const createMany = async (spaceId: TEntityID, data: storiesSchemas.TCreateManyBodyReq) =>
  api.post<TSuccessResponse<storiesSchemas.TCreateManyResResp>>(
    `/spaces/${spaceId}/stories/many`,
    data
  );

const update = async (spaceId: TEntityID, storyId: TEntityID, data: storiesSchemas.TUpdateBodyReq) =>
  api.patch<TSuccessResponse<storiesSchemas.TUpdateResResp>>(
    `/spaces/${spaceId}/stories/${storyId}`,
    data
  );

const storiesApi = {
  getManyFromSpaceId,
  getMany,
  create,
  createMany,
  update,
};

export {
  storiesApi,
};
