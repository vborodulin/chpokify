import { pokerCardDecksOperations } from '@Redux/domains/pokerCardDecks/operations';
import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoOperations } from '@Redux/domains/spacesRepo/operations';
import { TAppStore } from '@Redux/types';

const getInitialPropsSpacePage = async (reduxStore: TAppStore) => {
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
    dispatch(pokerCardDecksOperations.getData(currSpaceId)),
  ]);
};

export {
  getInitialPropsSpacePage,
};
