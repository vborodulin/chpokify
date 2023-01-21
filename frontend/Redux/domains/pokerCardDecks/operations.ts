import { TEntityID } from '@chpokify/models-types';

import { pokerCardDecksAsyncActions } from '@Redux/domains/pokerCardDecks/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { TAppOperation } from '@Redux/types';

const getData = (spaceId: TEntityID): TAppOperation =>
  async (dispatch, getState) => {
    const space = spacesSelectors.getById(getState())(
      spaceId
    );

    if (!space) {
      return;
    }

    await dispatch(pokerCardDecksAsyncActions.getList(spaceId));
  };

const getDataWithDeleted = (spaceId: TEntityID): TAppOperation =>
  async (dispatch, getState) => {
    const space = spacesSelectors.getById(getState())(
      spaceId
    );

    if (!space) {
      return;
    }

    await dispatch(pokerCardDecksAsyncActions.getListWithDeleted(spaceId));
  };

export const pokerCardDecksOperations = {
  getData,
  getDataWithDeleted,
};
