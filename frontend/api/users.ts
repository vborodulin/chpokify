import { TSuccessResponse, usersSchemas } from '@chpokify/api-schemas';
import { TEntityID } from '@chpokify/models-types';

import { api } from '@lib/api';

const getList = async (data: usersSchemas.TGetListBodyReq) =>
  api.post<TSuccessResponse<usersSchemas.TGetListResResp>>('/users/list', data);

const update = async (userId: TEntityID, data: usersSchemas.TUpdateBodyReq) =>
  api.patch<TSuccessResponse<usersSchemas.TUpdateResResp>>(`/users/${userId}`, data);

const updatePassword = async (userId: TEntityID, data: usersSchemas.TUpdatePasswordBodyReq) =>
  api.patch<TSuccessResponse<usersSchemas.TUpdatePasswordResResp>>(`/users/${userId}/password`, data);

const updateEmail = async (userId: TEntityID, data: usersSchemas.TUpdateEmailBodyReq) =>
  api.patch<TSuccessResponse<usersSchemas.TUpdateEmailResResp>>(`/users/${userId}/email`, data);

const updateSettings = async (userId: TEntityID, data: usersSchemas.TUpdateSettingsBodyReq) =>
  api.patch<TSuccessResponse<usersSchemas.TUpdateSettingsResResp>>(`/users/${userId}/settings`, data);

const updateOnboarding = async (userId: TEntityID, data: usersSchemas.TUpdateOnboardingBodyReq) =>
  api.patch<TSuccessResponse<usersSchemas.TUpdateSettingsResResp>>(
    `/users/${userId}/onboarding`, data
  );

export const usersApi = {
  getList,
  update,
  updatePassword,
  updateEmail,
  updateSettings,
  updateOnboarding,
};
