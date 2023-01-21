import { kanbanBoardRelationsAsyncActions } from './asyncActions';

export namespace kanbanBoardRelationsTypes {
  export type TActionsUnion =
    | ReturnType<typeof kanbanBoardRelationsAsyncActions.getList.pending>
    | ReturnType<typeof kanbanBoardRelationsAsyncActions.getList.fulfilled>
    | ReturnType<typeof kanbanBoardRelationsAsyncActions.getList.rejected>

    | ReturnType<typeof kanbanBoardRelationsAsyncActions.createTask.pending>
    | ReturnType<typeof kanbanBoardRelationsAsyncActions.createTask.fulfilled>
    | ReturnType<typeof kanbanBoardRelationsAsyncActions.createTask.rejected>

    | ReturnType<typeof kanbanBoardRelationsAsyncActions.moveTaskInColumn.pending>
    | ReturnType<typeof kanbanBoardRelationsAsyncActions.moveTaskInColumn.fulfilled>
    | ReturnType<typeof kanbanBoardRelationsAsyncActions.moveTaskInColumn.rejected>

    | ReturnType<typeof kanbanBoardRelationsAsyncActions.moveTaskBetweenColumns.pending>
    | ReturnType<typeof kanbanBoardRelationsAsyncActions.moveTaskBetweenColumns.fulfilled>
    | ReturnType<typeof kanbanBoardRelationsAsyncActions.moveTaskBetweenColumns.rejected>

    | ReturnType<typeof kanbanBoardRelationsAsyncActions.removeTask.pending>
    | ReturnType<typeof kanbanBoardRelationsAsyncActions.removeTask.fulfilled>
    | ReturnType<typeof kanbanBoardRelationsAsyncActions.removeTask.rejected>
}
