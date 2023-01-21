import { GetServerSidePropsContext } from 'next';

import { kanbanBoardRelationsAsyncActions } from '@Redux/domains/kanbanBoardRelations/asyncActions';
import { kanbanBoardRelationsOperations } from '@Redux/domains/kanbanBoardRelations/operations';
import { kanbanBoardActions } from '@Redux/domains/kanbanBoards/actions';
import { kanbanBoardAsyncActions } from '@Redux/domains/kanbanBoards/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoOperations } from '@Redux/domains/spacesRepo/operations';
import { TAppStore } from '@Redux/types';

const getInitialPropsKanbanBoardPage = async (
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

  const kanbanBoardId = query.kanbanBoardId?.toString();

  if (kanbanBoardId) {
    const currSpaceId = spacesSelectors.getCurrSpaceId(getState());

    dispatch(kanbanBoardActions.setCurrId(kanbanBoardId));
    await Promise.all([
      dispatch(spacesRepoOperations.getMetaData(currSpaceId)),
      dispatch(kanbanBoardAsyncActions.get(currSpaceId, kanbanBoardId)),
      dispatch(kanbanBoardRelationsAsyncActions.getList(currSpaceId, kanbanBoardId)),
    ]);

    await dispatch(kanbanBoardRelationsOperations.getStoriesList());
  }

  return {};
};

export {
  getInitialPropsKanbanBoardPage,
};
