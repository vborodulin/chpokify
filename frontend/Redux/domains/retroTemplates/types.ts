import { retroTemplatesActions } from '@Redux/domains/retroTemplates/actions';
import { retroTemplatesAsyncActions } from '@Redux/domains/retroTemplates/asyncActions';

export namespace retroTemplatesTypes {
  export type TActionsUnion =

    | ReturnType<typeof retroTemplatesActions.setCurrId>
    | ReturnType<typeof retroTemplatesActions.upsert>

    | ReturnType<typeof retroTemplatesAsyncActions.get.pending>
    | ReturnType<typeof retroTemplatesAsyncActions.get.fulfilled>
    | ReturnType<typeof retroTemplatesAsyncActions.get.rejected>

    | ReturnType<typeof retroTemplatesAsyncActions.createColumn.pending>
    | ReturnType<typeof retroTemplatesAsyncActions.createColumn.fulfilled>
    | ReturnType<typeof retroTemplatesAsyncActions.createColumn.rejected>

    | ReturnType<typeof retroTemplatesAsyncActions.updateColumn.pending>
    | ReturnType<typeof retroTemplatesAsyncActions.updateColumn.fulfilled>
    | ReturnType<typeof retroTemplatesAsyncActions.updateColumn.rejected>

    | ReturnType<typeof retroTemplatesAsyncActions.removeColumn.pending>
    | ReturnType<typeof retroTemplatesAsyncActions.removeColumn.fulfilled>
    | ReturnType<typeof retroTemplatesAsyncActions.removeColumn.rejected>

    | ReturnType<typeof retroTemplatesAsyncActions.moveColumn.pending>
    | ReturnType<typeof retroTemplatesAsyncActions.moveColumn.fulfilled>
    | ReturnType<typeof retroTemplatesAsyncActions.moveColumn.rejected>

    | ReturnType<typeof retroTemplatesAsyncActions.getList.pending>
    | ReturnType<typeof retroTemplatesAsyncActions.getList.fulfilled>
    | ReturnType<typeof retroTemplatesAsyncActions.getList.rejected>
}
