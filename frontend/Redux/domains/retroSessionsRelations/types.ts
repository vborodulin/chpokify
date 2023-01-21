import { retroSessionsRelationsActions } from './actions';
import { retroSessionsRelationsAsyncActions } from './asyncActions';

export namespace retroSessionsRelationsTypes {
  export type TActionsUnion =
    | ReturnType<typeof retroSessionsRelationsActions.upsert>
    | ReturnType<typeof retroSessionsRelationsActions.remove>

    | ReturnType<typeof retroSessionsRelationsAsyncActions.getList.pending>
    | ReturnType<typeof retroSessionsRelationsAsyncActions.getList.fulfilled>
    | ReturnType<typeof retroSessionsRelationsAsyncActions.getList.rejected>

    | ReturnType<typeof retroSessionsRelationsAsyncActions.createCard.pending>
    | ReturnType<typeof retroSessionsRelationsAsyncActions.createCard.fulfilled>
    | ReturnType<typeof retroSessionsRelationsAsyncActions.createCard.rejected>

    | ReturnType<typeof retroSessionsRelationsAsyncActions.moveCardInColumn.pending>
    | ReturnType<typeof retroSessionsRelationsAsyncActions.moveCardInColumn.fulfilled>
    | ReturnType<typeof retroSessionsRelationsAsyncActions.moveCardInColumn.rejected>

    | ReturnType<typeof retroSessionsRelationsAsyncActions.moveCardBetweenColumns.pending>
    | ReturnType<typeof retroSessionsRelationsAsyncActions.moveCardBetweenColumns.fulfilled>
    | ReturnType<typeof retroSessionsRelationsAsyncActions.moveCardBetweenColumns.rejected>

    | ReturnType<typeof retroSessionsRelationsAsyncActions.removeCard.pending>
    | ReturnType<typeof retroSessionsRelationsAsyncActions.removeCard.fulfilled>
    | ReturnType<typeof retroSessionsRelationsAsyncActions.removeCard.rejected>

    | ReturnType<typeof retroSessionsRelationsAsyncActions.getListByTemplatesIds.pending>
    | ReturnType<typeof retroSessionsRelationsAsyncActions.getListByTemplatesIds.fulfilled>
    | ReturnType<typeof retroSessionsRelationsAsyncActions.getListByTemplatesIds.rejected>
}
