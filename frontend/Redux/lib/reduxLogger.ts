import { createLogger } from 'redux-logger';

import { pokerSessionsActionsTypes } from '@Redux/domains/pokerSessions/actionTypes';
import { TAppAction, TAppMiddleware } from '@Redux/types';

const EXCLUDE_ACTION_TYPES: Record<string, true> = {
  [pokerSessionsActionsTypes.SET_IN_SESSION_PENDING]: true,
  [pokerSessionsActionsTypes.SET_IN_SESSION_FULFILLED]: true,
};

const predicate = (_: Function, action: TAppAction) => !EXCLUDE_ACTION_TYPES[action.type];

const reduxLogger = createLogger({
  duration: true,
  predicate,
}) as TAppMiddleware;

export {
  reduxLogger,
};
