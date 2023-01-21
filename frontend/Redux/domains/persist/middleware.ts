import Cookies from 'js-cookie';

import { persisActionTypes } from '@Redux/domains/persist/actionTypes';
import { TAppMiddleware } from '@Redux/types';

const prePersist: TAppMiddleware = () => (next) => async (action) => {
  switch (action.type) {
    case persisActionTypes.PERSIST_UPDATE: {
      if (action.payload.preventPersist) {
        break;
      }

      Object.keys(action.payload.persist).forEach((key) => {
        Cookies.set(key, action.payload.persist[key]);
      });

      break;
    }

    default:
      break;
  }

  return next(action);
};

const persistMiddlewares = [prePersist];

export {
  persistMiddlewares,
};
