import { THEME_TYPES } from '@chpokify/models-types';
import { routing } from '@chpokify/routing';
import Router from 'next/router';

import { authAsyncActions } from '@Redux/domains/auth/asyncActions';
import { authOperations } from '@Redux/domains/auth/operations';
import { authSelectors } from '@Redux/domains/auth/selectors';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { retroSessionsActions } from '@Redux/domains/retroSessions/actions';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { spacesActions } from '@Redux/domains/spaces/actions';
import { spacesAsyncActions } from '@Redux/domains/spaces/asyncActions';
import { spacesOperations } from '@Redux/domains/spaces/operations';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { usersAsyncActions } from '@Redux/domains/users/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppOperation } from '@Redux/types';

import { REDIRECT_AFTER_LOGIN_GUEST } from '@components/domains/auth/types';

import { ClientError } from '@lib/errors';
import { log } from '@lib/logger';

import { pokerSessionsActions } from '../pokerSessions/actions';

const loadCurrUserMeta = (): TAppOperation => async (
  dispatch,
  getState
) => {
  const currUser = authSelectors.getCurrUser(getState());

  if (!currUser) {
    log.error(new ClientError('Not logged in'));
    return;
  }

  const promiseArr: Promise<any>[] = [
    dispatch(spacesAsyncActions.mySpacesGet()),
    dispatch(usersAsyncActions.getList({
      ids: [
        currUser._id,
      ],
    })),
  ];

  await Promise.all(promiseArr);
};

const redirectAfterLoginGuest = (defineRedirect: REDIRECT_AFTER_LOGIN_GUEST | undefined): TAppOperation =>
  async (dispatch, getState) => {
    const reduxStore = getState();

    const inviteTokenPayloadFromPoker = pokerSessionsSelectors.getInviteTokenPayload(reduxStore);
    const inviteTokenPayloadRetro = retroSessionsSelectors.getInviteTokenPayload(reduxStore);

    if (!inviteTokenPayloadFromPoker && !inviteTokenPayloadRetro) {
      return;
    }

    if (defineRedirect === REDIRECT_AFTER_LOGIN_GUEST.POKER && inviteTokenPayloadFromPoker) {
      await Router.push(
        routing.getPokerSessionUrlTemplate(),
        routing.getPokerUrl(inviteTokenPayloadFromPoker.spaceId, inviteTokenPayloadFromPoker.pokerSessionId)
      );
      return;
    }

    if (defineRedirect === REDIRECT_AFTER_LOGIN_GUEST.RETRO && inviteTokenPayloadRetro) {
      await Router.push(
        routing.getRetroSessionUrlTemplate(),
        routing.getRetroSessionUrl(inviteTokenPayloadRetro.spaceId, inviteTokenPayloadRetro.retroSessionId)
      );
    }
  };

const redirectAfterLogin = (): TAppOperation => async (dispatch, getState) => {
  const afterLoginRedirect = authSelectors.getAfterLoginRedirectData(getState());

  if (afterLoginRedirect) {
    return dispatch(authOperations.afterLoginMakeRedirect());
  }

  const inviteToken = spacesSelectors.getInviteToken(getState());

  if (inviteToken) {
    await Router.push(
      routing.getInviteToSpaceTemplate(),
      routing.getInviteToSpaceUrl(inviteToken)
    );

    return {
      result: null,
    };
  }

  return dispatch(spacesOperations.redirectToCurrSpace());
};

const toggleThemeType = (): TAppOperation => async (dispatch, getState) => {
  const currUserId = authSelectors.getCurrUserId(getState());
  const themeType = authSelectors.getCurrUserThemeType(getState());

  if (!currUserId) {
    return {
      err: new ClientError('user id is empty'),
    };
  }

  const { payload } = await dispatch(usersAsyncActions.updateSettings(currUserId, {
    themeType: themeType === THEME_TYPES.LIGHT ? THEME_TYPES.DARK : THEME_TYPES.LIGHT,
  }));

  if (getIsRejectedActionPayload(payload)) {
    return {
      err: payload.error,
    };
  }
};

const signOutAndClearSpace = (): TAppOperation => async (dispatch) => {
  await dispatch(authAsyncActions.signOut());
  dispatch(spacesActions.setCurrId(''));
};

const inviteTokenGuestClear = (clearTokenFromPage: REDIRECT_AFTER_LOGIN_GUEST | undefined): TAppOperation =>
  async (dispatch) => {
    if (clearTokenFromPage === REDIRECT_AFTER_LOGIN_GUEST.POKER) {
      dispatch(pokerSessionsActions.inviteTokenClear());
      return;
    }

    dispatch(retroSessionsActions.inviteTokenClear());
  };

export const authRepoOperations = {
  loadCurrUserMeta,
  redirectAfterLogin,
  redirectAfterLoginGuest,
  toggleThemeType,
  signOutAndClearSpace,
  inviteTokenGuestClear,
};
