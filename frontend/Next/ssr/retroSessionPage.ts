import { GetServerSidePropsContext } from 'next';

import { retroSessionsActions } from '@Redux/domains/retroSessions/actions';
import { retroSessionsAsyncActions } from '@Redux/domains/retroSessions/asyncActions';
import { retroSessionRelationsOperations } from '@Redux/domains/retroSessionsRelations/operations';
import { retroSessionsTemplatesOperations } from '@Redux/domains/retroTemplates/operations';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoOperations } from '@Redux/domains/spacesRepo/operations';
import { TAppStore } from '@Redux/types';

const getInitialPropsRetroSessionPage = async (
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

  const retroSessionId = query.retroSessionId?.toString();

  if (retroSessionId) {
    dispatch(retroSessionsActions.setCurrId(retroSessionId));

    await Promise.all([
      dispatch(spacesRepoOperations.getMetaData(currSpaceId)),
      dispatch(retroSessionsAsyncActions.get(retroSessionId)),
    ]);

    await Promise.all([
      dispatch(retroSessionsTemplatesOperations.get()),
      dispatch(retroSessionRelationsOperations.getList()),
    ]);
    await dispatch(retroSessionRelationsOperations.getCardsList());
  }

  return {};
};

export {
  getInitialPropsRetroSessionPage,
};
