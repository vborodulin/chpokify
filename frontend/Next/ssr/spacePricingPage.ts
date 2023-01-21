import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoOperations } from '@Redux/domains/spacesRepo/operations';
import { TAppStore } from '@Redux/types';

const getInitialPropsSpacePricingPage = async (reduxStore: TAppStore) => {
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
  ]);
};

export {
  getInitialPropsSpacePricingPage,
};
