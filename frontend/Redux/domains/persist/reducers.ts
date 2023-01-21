import update from 'immutability-helper';

import { persisActionTypes } from '@Redux/domains/persist/actionTypes';
import { TAppAction } from '@Redux/types';

export type TPersistState = Record<string, any> & {
  isSideBarUncollapsed?: number;
};

const initialState: TPersistState = {
  isSideBarUncollapsed: 1,
};

const persistReducer = (state: TPersistState = initialState, action: TAppAction): TPersistState => {
  switch (action.type) {
    case persisActionTypes.PERSIST_UPDATE:
      return update(state, {
        $merge: action.payload.persist,
      });
    default:
      return state;
  }
};

export {
  persistReducer,
};
