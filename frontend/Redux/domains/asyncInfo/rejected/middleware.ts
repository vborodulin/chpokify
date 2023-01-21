import { isServer } from '@chpokify/helpers';
import { routing } from '@chpokify/routing';
import Router from 'next/router';

import { authRepoOperations } from '@Redux/domains/authRepo/operations';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppMiddleware } from '@Redux/types';

import { log } from '@lib/logger';

const postRejected: TAppMiddleware = (store) => (next) => async (action) => {
  const result = next(action);

  if (getIsRejectedActionPayload(action.payload)) {
    const { error } = action.payload;

    if (error.code === 440) {
      if (!isServer()) {
        await Router.push(routing.getLogInUrl());
      }

      await store.dispatch(authRepoOperations.signOutAndClearSpace());
    }

    if (error.code >= 500) {
      log.error(error);
    }
  }

  return result;
};

const rejectedMiddleware = [
  postRejected,
];

export {
  rejectedMiddleware,
};
