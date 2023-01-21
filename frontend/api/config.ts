import { TSuccessResponse } from '@chpokify/api-schemas';
import { configSchemas } from '@chpokify/api-schemas/configSchemas';

import { api } from '@lib/api';

const getConfig = () => api.get<TSuccessResponse<configSchemas.TConfigResResp>>('/config');

const getUserConfig = () => api.get<TSuccessResponse<configSchemas.TUserConfigResResp>>('/config/user');

const configApi = {
  getConfig,
  getUserConfig,
};

export {
  configApi,
};
