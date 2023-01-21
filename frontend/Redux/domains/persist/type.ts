import { persistActions } from './actions';

export type TPersistActionsUnion =
  | ReturnType<typeof persistActions.update>
