import { storiesActions } from '@Redux/domains/stories/actions';
import { storiesAsyncActions } from '@Redux/domains/stories/asyncActions';

export namespace storiesTypes {
  export type TActionsUnion =
    | ReturnType<typeof storiesActions.upsert>
    | ReturnType<typeof storiesActions.setSort>
    | ReturnType<typeof storiesAsyncActions.getManyBySpaceId.pending>
    | ReturnType<typeof storiesAsyncActions.getManyBySpaceId.fulfilled>
    | ReturnType<typeof storiesAsyncActions.getManyBySpaceId.rejected>
    | ReturnType<typeof storiesAsyncActions.getMany.pending>
    | ReturnType<typeof storiesAsyncActions.getMany.fulfilled>
    | ReturnType<typeof storiesAsyncActions.getMany.rejected>
    | ReturnType<typeof storiesAsyncActions.create.pending>
    | ReturnType<typeof storiesAsyncActions.create.fulfilled>
    | ReturnType<typeof storiesAsyncActions.create.rejected>
    | ReturnType<typeof storiesAsyncActions.createMany.pending>
    | ReturnType<typeof storiesAsyncActions.createMany.fulfilled>
    | ReturnType<typeof storiesAsyncActions.createMany.rejected>
}
