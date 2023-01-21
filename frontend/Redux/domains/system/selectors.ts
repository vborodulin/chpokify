// root
import { createSelector } from '@reduxjs/toolkit';

import { TAppState } from '@Redux/types';

const getSystem = ({ system }: TAppState) => system;

// direct
const getSocketStatus = createSelector(
  getSystem,
  (system) => system.socketStatus
);

const systemSelectors = {
  getSocketStatus,
};

export {
  systemSelectors,
};
