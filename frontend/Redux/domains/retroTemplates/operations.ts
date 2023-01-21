import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroTemplatesActions } from '@Redux/domains/retroTemplates/actions';
import { retroTemplatesAsyncActions } from '@Redux/domains/retroTemplates/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppOperation } from '@Redux/types';

const get = (): TAppOperation => async (dispatch, getState) => {
  const retroSession = retroSessionsSelectors.getCurr(getState());

  if (!retroSession) {
    return;
  }

  const { payload } = await dispatch(retroTemplatesAsyncActions.get(retroSession._id, retroSession.templateId));

  dispatch(retroTemplatesActions.setCurrId(retroSession.templateId.toString()));

  if (getIsRejectedActionPayload(payload)) {
    return {
      err: payload.error,
    };
  }
};

const getList = (): TAppOperation => async (dispatch, getState) => {
  const state = getState();
  const spaceId = spacesSelectors.getCurrSpaceId(state);

  if (!spaceId) {
    return;
  }

  const retroTemplatesIds = retroSessionsSelectors.getTemplatesIdsList(state);

  const sendData = {
    ids: retroTemplatesIds,
  };

  const { payload } = await dispatch(retroTemplatesAsyncActions.getList(
    spaceId,
    sendData
  ));

  if (getIsRejectedActionPayload(payload)) {
    return {
      err: payload.error,
    };
  }
};

export const retroSessionsTemplatesOperations = {
  get,
  getList,
};
