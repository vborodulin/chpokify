import { kanbanBoardActions } from '@Redux/domains/kanbanBoards/actions';
import { kanbanBoardAsyncActions } from '@Redux/domains/kanbanBoards/asyncActions';

export namespace kanbanBoardTypes {
  export type TActionsUnion =
    | ReturnType<typeof kanbanBoardActions.setCurrId>

    | ReturnType<typeof kanbanBoardAsyncActions.get.pending>
    | ReturnType<typeof kanbanBoardAsyncActions.get.fulfilled>
    | ReturnType<typeof kanbanBoardAsyncActions.get.rejected>

    | ReturnType<typeof kanbanBoardAsyncActions.getList.pending>
    | ReturnType<typeof kanbanBoardAsyncActions.getList.fulfilled>
    | ReturnType<typeof kanbanBoardAsyncActions.getList.rejected>

    | ReturnType<typeof kanbanBoardAsyncActions.create.pending>
    | ReturnType<typeof kanbanBoardAsyncActions.create.fulfilled>
    | ReturnType<typeof kanbanBoardAsyncActions.create.rejected>

    | ReturnType<typeof kanbanBoardAsyncActions.update.pending>
    | ReturnType<typeof kanbanBoardAsyncActions.update.fulfilled>
    | ReturnType<typeof kanbanBoardAsyncActions.update.rejected>

    | ReturnType<typeof kanbanBoardAsyncActions.remove.pending>
    | ReturnType<typeof kanbanBoardAsyncActions.remove.fulfilled>
    | ReturnType<typeof kanbanBoardAsyncActions.remove.rejected>

    | ReturnType<typeof kanbanBoardAsyncActions.moveColumn.pending>
    | ReturnType<typeof kanbanBoardAsyncActions.moveColumn.fulfilled>
    | ReturnType<typeof kanbanBoardAsyncActions.moveColumn.rejected>

    | ReturnType<typeof kanbanBoardAsyncActions.createColumn.pending>
    | ReturnType<typeof kanbanBoardAsyncActions.createColumn.fulfilled>
    | ReturnType<typeof kanbanBoardAsyncActions.createColumn.rejected>

    | ReturnType<typeof kanbanBoardAsyncActions.updateColumn.pending>
    | ReturnType<typeof kanbanBoardAsyncActions.updateColumn.fulfilled>
    | ReturnType<typeof kanbanBoardAsyncActions.updateColumn.rejected>

    | ReturnType<typeof kanbanBoardAsyncActions.removeColumn.pending>
    | ReturnType<typeof kanbanBoardAsyncActions.removeColumn.fulfilled>
    | ReturnType<typeof kanbanBoardAsyncActions.removeColumn.rejected>
}
