import { TEntityID } from '@chpokify/models-types';

import { pokerSessionsActions } from '@Redux/domains/pokerSessions/actions';
import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { storiesAsyncActions } from '@Redux/domains/stories/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppOperation } from '@Redux/types';

const setCurrIdAndGetData = (
  spaceId: TEntityID,
  pokerSessionId: TEntityID
): TAppOperation => async (dispatch) => {
  const { payload } = await dispatch(pokerSessionsAsyncActions.get(pokerSessionId));

  if (getIsRejectedActionPayload(payload)) {
    return {
      err: payload.error,
    };
  }

  const { pokerSession } = payload;
  await dispatch(
    storiesAsyncActions.getMany(
      spaceId, {
        ids: pokerSession.storiesIds,
      }
    )
  );

  dispatch(pokerSessionsActions.pokerSessionIdSet(pokerSessionId));
};

const pokerSessionsRepoOperations = {
  setCurrIdAndGetData,
};

export {
  pokerSessionsRepoOperations,
};
