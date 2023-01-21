import { videoCallActions } from '@Redux/domains/videoCall/actions';

export type TVideoCallActionsUnion =
  | ReturnType<typeof videoCallActions.join>
  | ReturnType<typeof videoCallActions.leave>;
