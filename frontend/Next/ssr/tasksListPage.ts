import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoOperations } from '@Redux/domains/spacesRepo/operations';
import { storiesAsyncActions } from '@Redux/domains/stories/asyncActions';
import { TAppStore } from '@Redux/types';

const getInitialPropsTasksListPage = async (reduxStore: TAppStore) => {
  const {
    dispatch,
    getState,
  } = reduxStore;

  const currSpaceId = spacesSelectors.getCurrSpaceId(getState());

  if (!currSpaceId) {
    return;
  }

  await Promise.all([
    dispatch(spacesRepoOperations.getMetaData(currSpaceId)),
    dispatch(pokerSessionsAsyncActions.getList(currSpaceId)),
    dispatch(storiesAsyncActions.getManyBySpaceId(currSpaceId)),
  ]);
};

export {
  getInitialPropsTasksListPage,
};
