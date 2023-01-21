import { createSelector } from '@reduxjs/toolkit';

import { TAppState } from '@Redux/types';

/**
 * root
 */
const getPersist = ({ persist }: TAppState) => persist;

const getIsSideBarUncollapsed = createSelector(
  getPersist,
  (persist) => {
    const isSideBarUncollapsed = Number(persist.isSideBarUncollapsed);

    if (Number.isNaN(isSideBarUncollapsed)) {
      return true;
    }

    return isSideBarUncollapsed;
  }
);

/**
 * direct
 */
const persistSelectors = {
  getIsSideBarUncollapsed,
};

export {
  persistSelectors,
};
