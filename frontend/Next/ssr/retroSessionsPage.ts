import { retroSessionsOperations } from '@Redux/domains/retroSessions/operations';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { TAppStore } from '@Redux/types';

const getInitialPropsRetroSessionsPage = async (reduxStore: TAppStore) => {
  const {
    dispatch,
    getState,
  } = reduxStore;

  const currSpaceId = spacesSelectors.getCurrSpaceId(getState());

  if (!currSpaceId) {
    return;
  }

  const limit = '30';

  await dispatch(retroSessionsOperations.getInitialData(currSpaceId, limit));

  return {};
};

export {
  getInitialPropsRetroSessionsPage,
};
