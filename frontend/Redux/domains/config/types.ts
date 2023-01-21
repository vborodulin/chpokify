import { configAsyncActions } from '@Redux/domains/config/asyncActions';

export type TConfigActionsUnion =
  | ReturnType<typeof configAsyncActions.getConfig.pending>
  | ReturnType<typeof configAsyncActions.getConfig.fulfilled>
  | ReturnType<typeof configAsyncActions.getConfig.rejected>
  | ReturnType<typeof configAsyncActions.getUserConfig.pending>
  | ReturnType<typeof configAsyncActions.getUserConfig.fulfilled>
  | ReturnType<typeof configAsyncActions.getUserConfig.rejected>;
