import { persisActionTypes } from './actionTypes';
import { TPersistState } from './reducers';

const update = (persist: Partial<TPersistState>, preventPersist: boolean = false) => ({
  type: persisActionTypes.PERSIST_UPDATE,
  payload: {
    persist,
    preventPersist,
  },
}) as const;

const persistActions = {
  update,
};

export {
  persistActions,
};
