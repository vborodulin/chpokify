import {
  retroRelationsSchemas,
  TSuccessResponse,
  TSuccessVoidResult,
} from '@chpokify/api-schemas';
import { TEntityID } from '@chpokify/models-types';

import { api } from '@lib/api';

const getList = async (retroSessionId: TEntityID, templateId: TEntityID) => (
  api.get<TSuccessResponse<retroRelationsSchemas.TGetListResResp>>(
    `/retro-sessions/${retroSessionId}/template/${templateId}/relations`
  ));

const createCard = async (
  retroSessionId: TEntityID,
  templateId: TEntityID,
  data: retroRelationsSchemas.TCreateCardBodyReq
) => (
  api.post<TSuccessResponse<retroRelationsSchemas.TCreateCardResResp>>(
    `/retro-sessions/${retroSessionId}/template/${templateId}/relations/cards`,
    data
  ));

const moveCardInColumn = async (
  retroSessionId: TEntityID,
  templateId: TEntityID,
  columnId: TEntityID,
  data: retroRelationsSchemas.TMoveCardInColumnBodyReq
) => (
  api.post<TSuccessResponse<TSuccessVoidResult>>(
    `/retro-sessions/${retroSessionId}/template/${templateId}/relations/card/move/column/${columnId}`,
    data
  ));

const moveCardBetweenColumns = async (
  retroSessionId: TEntityID,
  templateId: TEntityID,
  data: retroRelationsSchemas.TMoveCardBetweenColumnsBodyReq
) => (
  api.post<TSuccessResponse<TSuccessVoidResult>>(
    `/retro-sessions/${retroSessionId}/template/${templateId}/relations/card/move/columns`,
    data
  ));

const removeCard = async (
  retroSessionId: TEntityID,
  templateId: TEntityID,
  columnId: TEntityID,
  retroCardId: TEntityID
) => (
  api.delete<TSuccessResponse<TSuccessVoidResult>>(
    `/retro-sessions/${retroSessionId}/template/${templateId}/relations/column/${columnId}/card/${retroCardId}`
  ));

const moveCardInActionColumn = async (
  retroSessionId: TEntityID,
  templateId: TEntityID,
  columnId: TEntityID,
  retroCardId: TEntityID
) => (
  api.put<TSuccessResponse<TSuccessVoidResult>>(
    `/retro-sessions/${retroSessionId}/template/${templateId}/relations/column/${columnId}/move/action/card/${retroCardId}`
  ));

const getListByTemplatesIds = async (
  spaceId: TEntityID,
  data: retroRelationsSchemas.TGetListByTemplatesIdsBodyReq
) => (
  api.post <TSuccessResponse<retroRelationsSchemas.TGetListByTemplatesIdsResResp>>(
    `/retro-sessions/spaces/${spaceId}/relations/list`,
    data
  ));

export const retroRelationsApi = {
  getList,
  createCard,
  moveCardInColumn,
  moveCardBetweenColumns,
  removeCard,
  moveCardInActionColumn,
  getListByTemplatesIds,
};
