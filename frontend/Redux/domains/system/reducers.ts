import update from 'immutability-helper';

import { systemActionTypes } from '@Redux/domains/system/actionsTypes';
import { TAppAction } from '@Redux/types';

import { SOCKET_STATUS } from '@components/utils/types';

type TState = {
  socketStatus: SOCKET_STATUS;
}

const initialState: TState = {
  socketStatus: SOCKET_STATUS.NONE,
};

const systemReducer = (state = initialState, action: TAppAction): TState => {
  switch (action.type) {
    case systemActionTypes.SOCKET_STATUS_SET:
      return update(state, { socketStatus: { $set: action.payload.status } });
    default:
      return state;
  }
};

export {
  systemReducer,
};
