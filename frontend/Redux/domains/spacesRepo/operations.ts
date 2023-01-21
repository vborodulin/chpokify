import { TEntityID } from '@chpokify/models-types';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { usersAsyncActions } from '@Redux/domains/users/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppOperation } from '@Redux/types';

const getUsersList = (spaceId: TEntityID): TAppOperation => async (dispatch, getState) => {
  const space = spacesSelectors.getById(getState())(spaceId);

  if (!space) {
    return;
  }

  const usersIds = space.participants.map((participant) => participant.userId.toString());
  const { payload } = await dispatch(usersAsyncActions.getList({
    ids: usersIds,
  }));

  if (getIsRejectedActionPayload(payload)) {
    return {
      err: payload.error,
    };
  }
};

const getMetaData = (spaceId: TEntityID): TAppOperation => async (dispatch, getState) => {
  const space = spacesSelectors.getById(getState())(
    spaceId
  );

  if (!space) {
    return;
  }

  const promiseArr: Promise<any>[] = [
    dispatch(getUsersList(spaceId)),
  ];

  await Promise.all(promiseArr);
};

export const spacesRepoOperations = {
  getUsersList,
  getMetaData,
};
