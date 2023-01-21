import { createSelector } from '@reduxjs/toolkit';

import { TAppState } from '@Redux/types';

/**
 * root
 */
const getVideoCall = ({ videoCall }: TAppState) => videoCall;

/**
 * direct
 */
const getIsJoined = createSelector(
  getVideoCall,
  (videoCall) => videoCall.isJoined
);

const videoCallSelectors = {
  getVideoCall,
  getIsJoined,
};

export {
  videoCallSelectors,
};
