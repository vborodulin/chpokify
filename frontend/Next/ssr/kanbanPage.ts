import { kanbanBoardOperations } from '@Redux/domains/kanbanBoards/operations';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoOperations } from '@Redux/domains/spacesRepo/operations';
import { TAppStore } from '@Redux/types';

const getInitialPropsKanbanPage = async (reduxStore: TAppStore) => {
  const {
    dispatch,
    getState,
  } = reduxStore;

  const currSpaceId = spacesSelectors.getCurrSpaceId(getState());

  await Promise.all([
    dispatch(spacesRepoOperations.getMetaData(currSpaceId)),
    dispatch(kanbanBoardOperations.getList()),
  ]);

  return {};
};

export {
  getInitialPropsKanbanPage,
};
