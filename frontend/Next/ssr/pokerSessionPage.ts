import { GetServerSidePropsContext } from 'next';

import { pokerCardDecksOperations } from '@Redux/domains/pokerCardDecks/operations';
import { pokerSessionsRepoOperations } from '@Redux/domains/pokerSessionsRepo/operations';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoOperations } from '@Redux/domains/spacesRepo/operations';
import { TAppStore } from '@Redux/types';

const getInitialPropsPokerSessionPage = async (
  reduxStore: TAppStore,
  ctx: GetServerSidePropsContext
) => {
  const {
    query,
  } = ctx;

  const {
    dispatch,
    getState,
  } = reduxStore;

  const currSpaceId = spacesSelectors.getCurrSpaceId(getState());

  if (!currSpaceId) {
    return;
  }

  const pokerSessionId = Array.isArray(query.pokerSessionId) ? query.pokerSessionId[0] : query.pokerSessionId;

  if (pokerSessionId) {
    await Promise.all([
      dispatch(spacesRepoOperations.getMetaData(currSpaceId)),
      dispatch(pokerCardDecksOperations.getDataWithDeleted(currSpaceId)),
      dispatch(
        pokerSessionsRepoOperations.setCurrIdAndGetData(currSpaceId, pokerSessionId)
      ),
    ]);
  }
};

export {
  getInitialPropsPokerSessionPage,
};
