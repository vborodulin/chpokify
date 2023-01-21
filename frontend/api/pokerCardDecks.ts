import { pokerCardDecksSchemas, TSuccessResponse } from '@chpokify/api-schemas';
import { TEntityID } from '@chpokify/models-types';

import { api } from '@lib/api';

const getList = async (spaceId: TEntityID) =>
  api.get<TSuccessResponse<pokerCardDecksSchemas.TGetListResResp>>(`/poker-sessions/spaces/${spaceId}/card-decks`);

const getListWithDeleted = async (spaceId: TEntityID) =>
  api.get<TSuccessResponse<pokerCardDecksSchemas.TGetListResResp>>(`/poker-sessions/spaces/${spaceId}/card-decks/with-deleted`);

const create = async (spaceId:TEntityID, data: pokerCardDecksSchemas.TCreateBodyReq) =>
  api.post<TSuccessResponse<pokerCardDecksSchemas.TCreateResResp>>(`/poker-sessions/spaces/${spaceId}/card-decks`, data);

const update = async (cardDeckId: TEntityID, spaceId: TEntityID, data: pokerCardDecksSchemas.TUpdateBodyReq) =>
  api.put<TSuccessResponse<pokerCardDecksSchemas.TUpdateResResp>>(
    `/poker-sessions/spaces/${spaceId}/card-decks/${cardDeckId}`,
    data
  );
const remove = async (cardDeckId: TEntityID, spaceId: TEntityID) =>
  api.delete<TSuccessResponse<pokerCardDecksSchemas.TRemoveResResp>>(
    `/poker-sessions/spaces/${spaceId}/card-decks/${cardDeckId}`
  );

export const pokerCardDecksApi = {
  getList,
  getListWithDeleted,
  create,
  update,
  remove,
};
