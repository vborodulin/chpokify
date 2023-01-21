import { retroSessionsCardsAction } from './actions';
import { retroSessionsCardsAsyncActions } from './asyncActions';

export namespace retroSessionsCardsTypes {
  export type TActionsUnion =
    | ReturnType<typeof retroSessionsCardsAsyncActions.getList.pending>
    | ReturnType<typeof retroSessionsCardsAsyncActions.getList.fulfilled>
    | ReturnType<typeof retroSessionsCardsAsyncActions.getList.rejected>

    | ReturnType<typeof retroSessionsCardsAsyncActions.update.pending>
    | ReturnType<typeof retroSessionsCardsAsyncActions.update.fulfilled>
    | ReturnType<typeof retroSessionsCardsAsyncActions.update.rejected>

    | ReturnType<typeof retroSessionsCardsAsyncActions.addVote.pending>
    | ReturnType<typeof retroSessionsCardsAsyncActions.addVote.fulfilled>
    | ReturnType<typeof retroSessionsCardsAsyncActions.addVote.rejected>

    | ReturnType<typeof retroSessionsCardsAsyncActions.removeVote.pending>
    | ReturnType<typeof retroSessionsCardsAsyncActions.removeVote.fulfilled>
    | ReturnType<typeof retroSessionsCardsAsyncActions.removeVote.rejected>

    | ReturnType<typeof retroSessionsCardsAsyncActions.combinedCard.pending>
    | ReturnType<typeof retroSessionsCardsAsyncActions.combinedCard.fulfilled>
    | ReturnType<typeof retroSessionsCardsAsyncActions.combinedCard.rejected>

    | ReturnType<typeof retroSessionsCardsAction.upsert>
    | ReturnType<typeof retroSessionsCardsAction.remove>

}
