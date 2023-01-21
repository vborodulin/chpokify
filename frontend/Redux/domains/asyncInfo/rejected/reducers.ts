import { TErrorDetails } from '@chpokify/helpers';
import update from 'immutability-helper';
import { pick } from 'lodash';

import { getIsRejectedActionPayload, matchActionType } from '@Redux/helpers/common';
import { TAppAction } from '@Redux/types';

export type TStateError =
  { name: string, code: number, message: string, details: TErrorDetails, stack?: string }
  | undefined;

export type TState = Record<string, TStateError>;

const initialState: TState = {};

export const asyncRejectedReducer = (state = initialState, action: TAppAction): TState => {
  const matches = matchActionType(action.type);

  if (!matches) {
    return state;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, actionName, actionState] = matches;

  if (getIsRejectedActionPayload(action.payload)) {
    const { error } = action.payload;
    const errorValue = pick(error, ['code', 'message', 'details', 'name']);
    return update(state, { [actionName]: { $set: errorValue } });
  }

  if (actionState === 'fulfilled') {
    return update(state, { $unset: [actionName] });
  }

  return state;
};
