import { persistActions } from '@Redux/domains/persist/actions';
import { persistSelectors } from '@Redux/domains/persist/selectors';
import { TAppOperation } from '@Redux/types';

const toggleSideBar = (preventPersist?: boolean): TAppOperation => async (
  dispatch,
  getState
) => {
  const isSideBarUncollapsed = persistSelectors.getIsSideBarUncollapsed(getState());

  dispatch(persistActions.update({
    isSideBarUncollapsed: isSideBarUncollapsed ? 0 : 1,
  }, preventPersist));
};

const persistOperations = {
  toggleSideBar,
};

export {
  persistOperations,
};
