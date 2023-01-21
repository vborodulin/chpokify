import { TEntityID } from '@chpokify/models-types';

import { kanbanBoardRelationsSelectors } from '@Redux/domains/kanbanBoardRelations/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { storiesAsyncActions } from '@Redux/domains/stories/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppOperation } from '@Redux/types';

const getStoriesList = (): TAppOperation => async (dispatch, getState) => {
  const spaceId = spacesSelectors.getCurrSpaceId(getState());
  const kanbanBoardRelations = kanbanBoardRelationsSelectors.getEntitiesList(getState());

  if (!kanbanBoardRelations.length) {
    return;
  }

  let tasksIds: TEntityID[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const kanbanBoardRelation of kanbanBoardRelations) {
    tasksIds = tasksIds.concat(kanbanBoardRelation.tasksIds);
  }

  if (!tasksIds.length) {
    return;
  }

  const { payload } = await dispatch(
    storiesAsyncActions.getMany(
      spaceId,
      {
        ids: tasksIds,
      }
    )
  );

  if (getIsRejectedActionPayload(payload)) {
    return {
      err: payload.error,
    };
  }
};

export const kanbanBoardRelationsOperations = {
  getStoriesList,
};
