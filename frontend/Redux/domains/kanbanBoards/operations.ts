import { kanbanBoardAsyncActions } from '@Redux/domains/kanbanBoards/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppOperation } from '@Redux/types';

const getList = (): TAppOperation => async (dispatch, getState) => {
  const spaceId = spacesSelectors.getCurrSpaceId(getState());

  if (!spaceId) {
    return;
  }

  const { payload } = await dispatch(kanbanBoardAsyncActions.getList(spaceId));

  if (getIsRejectedActionPayload(payload)) {
    return {
      err: payload.error,
    };
  }
};

export const kanbanBoardOperations = {
  getList,
};
