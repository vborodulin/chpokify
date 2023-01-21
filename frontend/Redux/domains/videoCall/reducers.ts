import update from 'immutability-helper';

import { videoCallActionTypes } from '@Redux/domains/videoCall/actionTypes';
import { TAppAction } from '@Redux/types';

type TState = {
  isJoined: boolean;
};

const initialState: TState = {
  isJoined: false,
};

const videoCallReducer = (state: TState = initialState, action: TAppAction): TState => {
  switch (action.type) {
    case videoCallActionTypes.JOIN:
      return update(state, {
        isJoined: {
          $set: true,
        },
      });
    case videoCallActionTypes.LEAVE:
      return update(state, {
        isJoined: {
          $set: false,
        },
      });
    default:
      return state;
  }
};

export {
  videoCallReducer,
};
