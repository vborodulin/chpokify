import { isServer } from '@chpokify/helpers';
import { ENVIRONMENT } from '@chpokify/models-types';
import { configureStore as configureReduxStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';

import { rejectedMiddleware } from '@Redux/domains/asyncInfo/rejected/middleware';
import { authMiddlewares } from '@Redux/domains/auth/middleware';
import { authRepoMiddlewares } from '@Redux/domains/authRepo/middleware';
import { persistMiddlewares } from '@Redux/domains/persist/middleware';
import { reduxLogger } from '@Redux/lib/reduxLogger';
import { rootReducer } from '@Redux/rootReducer';
import {
  TAppAction,
  TAppMiddleware,
  TAppState,
  TAppStore,
} from '@Redux/types';

const configureStore = (preloadedState: Partial<TAppState>):TAppStore => {
  const middleware: TAppMiddleware[] = [
    // @ts-ignore
    thunk,
    ...authMiddlewares,
    ...authRepoMiddlewares,
    ...rejectedMiddleware,
    ...persistMiddlewares,
  ];

  const isProd = process.env.NODE_ENV === ENVIRONMENT.PRODUCTION;

  if (!isServer() && !isProd) {
    middleware.push(reduxLogger);
  }

  const store = configureReduxStore<TAppState, TAppAction, TAppMiddleware[]>({
    reducer: rootReducer,
    devTools: !isProd,
    preloadedState,
    middleware,
  });

  if (!isServer()) {
    window.getState = store.getState;
  }

  return store;
};

const makeStore = () => configureStore({});

// @ts-ignore
const reduxWrapper = createWrapper<TAppStore>(makeStore);

export {
  reduxWrapper,
};
