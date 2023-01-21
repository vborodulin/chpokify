import { videoCallActionTypes } from '@Redux/domains/videoCall/actionTypes';

const join = () => ({
  type: videoCallActionTypes.JOIN,
  payload: {},
}) as const;

const leave = () => ({
  type: videoCallActionTypes.LEAVE,
  payload: {},
}) as const;

const videoCallActions = {
  join,
  leave,
};

export {
  videoCallActions,
};
