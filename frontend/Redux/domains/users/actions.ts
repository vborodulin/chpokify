import { TUser } from '@chpokify/models-types';

import { usersActionsTypes } from '@Redux/domains/users/actionsTypes';

const upsert = (user: TUser) => ({
  type: usersActionsTypes.UPSERT,
  payload: {
    user,
  },
}) as const;

export const usersActions = {
  upsert,
};
