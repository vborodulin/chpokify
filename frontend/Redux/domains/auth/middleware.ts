import { isServer } from '@chpokify/helpers';
import { routing } from '@chpokify/routing';
import Router from 'next/router';

import { authActionsTypes } from '@Redux/domains/auth/actionsTypes';
import { TAppMiddleware } from '@Redux/types';

import { LOCAL_STORAGE_KEYS } from '@components/domains/core/types';

import { isomorphicLocalStorage } from '@lib/isomorphicStorage';

const preAuth: TAppMiddleware = () => (next) => async (action) => {
  switch (action.type) {
    case authActionsTypes.SIGN_OUT_FULFILLED:
      if (!isServer()) {
        await Router.push(routing.getLogInUrl());
      }

      isomorphicLocalStorage.setItem(LOCAL_STORAGE_KEYS.LOGOUT, Date.now().toString());
      break;
    default:
      break;
  }

  return next(action);
};

export const authMiddlewares = [preAuth];
