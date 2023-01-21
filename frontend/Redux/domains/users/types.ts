import { usersActions } from '@Redux/domains/users/actions';
import { usersAsyncActions } from '@Redux/domains/users/asyncActions';

export namespace usersTypes {
  export type TActionsUnion =
    | ReturnType<typeof usersActions.upsert>
    | ReturnType<typeof usersAsyncActions.getList.pending>
    | ReturnType<typeof usersAsyncActions.getList.fulfilled>
    | ReturnType<typeof usersAsyncActions.getList.rejected>
    | ReturnType<typeof usersAsyncActions.update.pending>
    | ReturnType<typeof usersAsyncActions.update.fulfilled>
    | ReturnType<typeof usersAsyncActions.update.rejected>
    | ReturnType<typeof usersAsyncActions.updatePassword.pending>
    | ReturnType<typeof usersAsyncActions.updatePassword.fulfilled>
    | ReturnType<typeof usersAsyncActions.updatePassword.rejected>
    | ReturnType<typeof usersAsyncActions.updateEmail.pending>
    | ReturnType<typeof usersAsyncActions.updateEmail.fulfilled>
    | ReturnType<typeof usersAsyncActions.updateEmail.rejected>
    | ReturnType<typeof usersAsyncActions.updateSettings.pending>
    | ReturnType<typeof usersAsyncActions.updateSettings.fulfilled>
    | ReturnType<typeof usersAsyncActions.updateSettings.rejected>;
}
