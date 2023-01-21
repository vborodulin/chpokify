import { retroTemplateSchemas, TSuccessResponse, TSuccessVoidResult } from '@chpokify/api-schemas';
import { TEntityID } from '@chpokify/models-types';

import { api } from '@lib/api';

const get = async (retroSessionId: TEntityID, templateId: TEntityID) => (
  api.get<TSuccessResponse<retroTemplateSchemas.TGetResResp>>(
    `/retro-sessions/${retroSessionId}/template/${templateId}`
  ));

const createColumn = async (
  retroSessionId: TEntityID,
  templateId: TEntityID,
  data: retroTemplateSchemas.TCreateColumnBodyReq
) => (
  api.post<TSuccessResponse<retroTemplateSchemas.TCreateColumnResResp>>(
    `/retro-sessions/${retroSessionId}/template/${templateId}/columns`,
    data
  ));

const updateColumn = async (
  retroSessionId: TEntityID,
  templateId: TEntityID,
  columnId: TEntityID,
  data: retroTemplateSchemas.TUpdateColumnBodyReq
) => (
  api.put<TSuccessResponse<retroTemplateSchemas.TUpdateColumnResResp>>(
    `/retro-sessions/${retroSessionId}/template/${templateId}/columns/${columnId}`,
    data
  ));

const removeColumn = async (
  retroSessionId: TEntityID,
  templateId: TEntityID,
  columnId: TEntityID
) => (
  api.delete<TSuccessResponse<retroTemplateSchemas.TRemoveColumnResResp>>(
    `/retro-sessions/${retroSessionId}/template/${templateId}/columns/${columnId}`
  ));

const moveColumn = async (
  retroSessionId: TEntityID,
  templateId: TEntityID,
  data: retroTemplateSchemas.TMoveColumnBodyReq
) => (
  api.post <TSuccessResponse<TSuccessVoidResult>>(
    `/retro-sessions/${retroSessionId}/template/${templateId}/move/column`,
    data
  ));

const getList = async (
  spaceId: TEntityID,
  data: retroTemplateSchemas.TGetListBodyReq
) => (
  api.post <TSuccessResponse<retroTemplateSchemas.TGetListResResp>>(
    `/retro-sessions/spaces/${spaceId}/templates/list`,
    data
  ));

export const retroTemplatesApi = {
  get,
  createColumn,
  updateColumn,
  removeColumn,
  moveColumn,
  getList,
};
