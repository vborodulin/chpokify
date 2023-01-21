import { TEntityID } from '@chpokify/models-types';
import { compact } from 'lodash';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroSessionsCardsAsyncActions } from '@Redux/domains/retroSessionsCards/asyncActions';
import { retroSessionsRelationsAsyncActions } from '@Redux/domains/retroSessionsRelations/asyncActions';
import { retroSessionsRelationsSelectors } from '@Redux/domains/retroSessionsRelations/selectors';
import { retroTemplatesSelectors } from '@Redux/domains/retroTemplates/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppOperation } from '@Redux/types';

const getList = (): TAppOperation => async (dispatch, getState) => {
  const retroSession = retroSessionsSelectors.getCurr(getState());

  if (!retroSession) {
    return;
  }

  const { payload } = await dispatch(
    retroSessionsRelationsAsyncActions.getList(retroSession._id, retroSession.templateId)
  );

  if (getIsRejectedActionPayload(payload)) {
    return {
      err: payload.error,
    };
  }
};

const getCardsList = (): TAppOperation => async (dispatch, getState) => {
  const spaceId = spacesSelectors.getCurrSpaceId(getState());
  const retroSessionRelations = retroSessionsRelationsSelectors.getEntitiesList(getState());

  if (!retroSessionRelations.length) {
    return;
  }

  const cardsIds: TEntityID[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const retroSessionRelation of retroSessionRelations) {
    cardsIds.push(...retroSessionRelation.cardsIds);
  }

  if (!cardsIds.length) {
    return;
  }

  const { payload } = await dispatch(
    retroSessionsCardsAsyncActions.getList(
      spaceId,
      {
        ids: cardsIds,
      }
    )
  );

  if (getIsRejectedActionPayload(payload)) {
    return {
      err: payload.error,
    };
  }
};

const getListByTemplatesIds = (): TAppOperation => async (dispatch, getState) => {
  const state = getState();
  const spaceId = spacesSelectors.getCurrSpaceId(state);

  if (!spaceId) {
    return;
  }

  const retroTemplatesIds = retroSessionsSelectors.getTemplatesIdsList(state);

  const sendData = {
    ids: retroTemplatesIds,
  };

  const { payload } = await dispatch(retroSessionsRelationsAsyncActions.getListByTemplatesIds(
    spaceId,
    sendData
  ));

  if (getIsRejectedActionPayload(payload)) {
    return {
      err: payload.error,
    };
  }
};

const getCardsActionsList = (): TAppOperation => async (dispatch, getState) => {
  const state = getState();
  const spaceId = spacesSelectors.getCurrSpaceId(state);
  const retroSessionRelations = retroSessionsRelationsSelectors.getEntitiesList(state);
  const retroTemplatesIds = retroTemplatesSelectors.getIdsList(state);

  if (!retroSessionRelations.length) {
    return;
  }

  const cardsIds: TEntityID[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const templateId of retroTemplatesIds) {
    const columnActionId = retroTemplatesSelectors.getActionColumnId(state)(templateId);

    if (columnActionId) {
      const cardsIdsFromColumn = retroSessionsRelationsSelectors.getCardsByColumnId(state)(columnActionId);
      cardsIds.push(...cardsIdsFromColumn);
    }
  }

  const cardsEnhance = compact(cardsIds);

  if (!cardsEnhance.length) {
    return;
  }

  const { payload } = await dispatch(
    retroSessionsCardsAsyncActions.getList(
      spaceId,
      {
        ids: cardsEnhance,
      }
    )
  );

  if (getIsRejectedActionPayload(payload)) {
    return {
      err: payload.error,
    };
  }
};

export const retroSessionRelationsOperations = {
  getList,
  getCardsList,
  getListByTemplatesIds,
  getCardsActionsList,
};
