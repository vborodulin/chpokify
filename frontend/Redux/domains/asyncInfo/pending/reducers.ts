import { matchActionType } from '@Redux/helpers/common';
import { TAppAction } from '@Redux/types';

export type TState = Record<string, boolean>;

const initialState: TState = {};

export const asyncPendingReducer = (state = initialState, action: TAppAction): TState => {
  const matches = matchActionType(action.type);

  if (!matches) {
    return state;
  }

  const [, actionName, actionState] = matches;

  return {
    ...state,
    [actionName]: actionState === 'pending',
  };
};
