import { systemActionTypes } from '@Redux/domains/system/actionsTypes';

import { SOCKET_STATUS } from '@components/utils/types';

const hydrate = () => ({
  type: systemActionTypes.HYDRATE,
  payload: {},
}) as const;

const socketStatusSet = (status: SOCKET_STATUS) => ({
  type: systemActionTypes.SOCKET_STATUS_SET,
  payload: {
    status,
  },
}) as const;

export const systemActions = {
  hydrate,
  socketStatusSet,
};
