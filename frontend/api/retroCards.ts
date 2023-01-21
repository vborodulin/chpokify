import { TSuccessResponse, retroCardsSchemas } from '@chpokify/api-schemas';
import { TEntityID } from '@chpokify/models-types';

import { api } from '@lib/api';

const getList = async (
  spaceId: TEntityID,
  data: retroCardsSchemas.TGetListBodyReq
) => (
  api.post<TSuccessResponse<retroCardsSchemas.TGetListResResp>>(
    `/retro-sessions/spaces/${spaceId}/cards/list`,
    data
  ));

const update = async (
  spaceId: TEntityID,
  retroCardId: TEntityID,
  data: retroCardsSchemas.TUpdateBodyReq
) => (
  api.put<TSuccessResponse<retroCardsSchemas.TUpdateResResp>>(
    `/retro-sessions/spaces/${spaceId}/cards/${retroCardId}`,
    data
  ));

const addVote = async (
  spaceId: TEntityID,
  retroCardId: TEntityID,
  data: retroCardsSchemas.TAddVoteBodyReq
) => (
  api.post<TSuccessResponse<retroCardsSchemas.TAddVoteResResp>>(
    `/retro-sessions/spaces/${spaceId}/cards/${retroCardId}/votes`,
    data
  ));

const removeVote = async (
  spaceId: TEntityID,
  retroCardId: TEntityID,
  voteId: TEntityID
) => (
  api.delete<TSuccessResponse<retroCardsSchemas.TRemoveVoteResResp>>(
    `/retro-sessions/spaces/${spaceId}/cards/${retroCardId}/votes/${voteId}`
  )
);

const combinedCard = async (
  spaceId: TEntityID,
  retroCardId: TEntityID,
  data: retroCardsSchemas.TCombineCardBodyReq
) => (
  api.post<TSuccessResponse<retroCardsSchemas.TCombineCardResResp>>(
    `/retro-sessions/spaces/${spaceId}/cards/${retroCardId}/combined`,
    data
  ));

export const retroCardsApi = {
  getList,
  update,
  addVote,
  removeVote,
  combinedCard,
};
