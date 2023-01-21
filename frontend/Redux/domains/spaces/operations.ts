import { spacesSchemas } from '@chpokify/api-schemas';
import { routing } from '@chpokify/routing';
import Router from 'next/router';

import { spacesAsyncActions } from '@Redux/domains/spaces/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppOperation } from '@Redux/types';

import { spaceHelpers } from '@components/domains/space/helpers';
import { lastSpaceMarker } from '@components/domains/space/helpers/lastSpaceMarker';

const spaceCreateAndRedirect = (data: spacesSchemas.TCreateBodyReq): TAppOperation => async (dispatch) => {
  const action = await dispatch(spacesAsyncActions.spaceCreate(data));
  const { payload } = action;

  if (getIsRejectedActionPayload(payload)) {
    return {
      err: payload.error,
    };
  }

  await spaceHelpers.redirectPageBySignUpMark(payload.space._id);
};

const redirectToCurrSpace = (): TAppOperation => async (dispatch, getState) => {
  const lastSpaceIdFromStorage = lastSpaceMarker.getMark();
  const lastUsedSpace = spacesSelectors.getLastUsed(getState())(lastSpaceIdFromStorage);

  if (lastUsedSpace) {
    await Router.push(
      routing.getSpaceUrlTemplate(),
      routing.getSpaceUrl(lastUsedSpace._id)
    );
    return;
  }

  await Router.push(routing.getSpacesChooseUrl());
};

const currSpaceLeaveAndClearLastMark = (): TAppOperation => async (dispatch, getState) => {
  lastSpaceMarker.setMark('');

  const currSpaceId = spacesSelectors.getCurrSpaceId(getState());
  const currParticipantId = spacesRepoSelectors.getCurrParticipantId(getState());

  if (!currParticipantId || !currSpaceId) {
    return;
  }

  const { payload } = await dispatch(spacesAsyncActions.spaceLeave(currSpaceId, currParticipantId));

  if (getIsRejectedActionPayload(payload)) {
    return {
      err: payload.error,
    };
  }

  await Router.push(
    routing.getSpacesChooseUrl()
  );
};

export const spacesOperations = {
  spaceCreateAndRedirect,
  redirectToCurrSpace,
  currSpaceLeaveAndClearLastMark,
};
