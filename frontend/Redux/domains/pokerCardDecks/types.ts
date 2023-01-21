import { pokerCardDecksActions } from '@Redux/domains/pokerCardDecks/actions';
import { pokerCardDecksAsyncActions } from '@Redux/domains/pokerCardDecks/asyncActions';

export namespace pokerCardDecksTypes {
  export type TActionsUnion =
    | ReturnType<typeof pokerCardDecksActions.upsert>
    | ReturnType<typeof pokerCardDecksAsyncActions.getList.pending>
    | ReturnType<typeof pokerCardDecksAsyncActions.getList.fulfilled>
    | ReturnType<typeof pokerCardDecksAsyncActions.getList.rejected>
    | ReturnType<typeof pokerCardDecksAsyncActions.getListWithDeleted.pending>
    | ReturnType<typeof pokerCardDecksAsyncActions.getListWithDeleted.fulfilled>
    | ReturnType<typeof pokerCardDecksAsyncActions.getListWithDeleted.rejected>

    | ReturnType<typeof pokerCardDecksAsyncActions.update.pending>
    | ReturnType<typeof pokerCardDecksAsyncActions.update.fulfilled>
    | ReturnType<typeof pokerCardDecksAsyncActions.update.rejected>

    | ReturnType<typeof pokerCardDecksAsyncActions.create.pending>
    | ReturnType<typeof pokerCardDecksAsyncActions.create.fulfilled>
    | ReturnType<typeof pokerCardDecksAsyncActions.create.rejected>

    | ReturnType<typeof pokerCardDecksAsyncActions.remove.pending>
    | ReturnType<typeof pokerCardDecksAsyncActions.remove.fulfilled>
    | ReturnType<typeof pokerCardDecksAsyncActions.remove.rejected>
}
