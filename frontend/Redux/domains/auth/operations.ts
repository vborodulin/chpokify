import { AuthSchemas } from '@chpokify/api-schemas';
import { routing } from '@chpokify/routing';
import Router from 'next/router';

import { authActions } from '@Redux/domains/auth/actions';
import { authAsyncActions } from '@Redux/domains/auth/asyncActions';
import { authSelectors } from '@Redux/domains/auth/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppOperation } from '@Redux/types';

import { afterLoginRedirect } from '@lib/auth/afterLoginRedirect';

const afterLoginRedirectDataSetFromCookie = (): TAppOperation => async (dispatch) => {
  const dataStr = afterLoginRedirect.getCookie();

  if (dataStr) {
    dispatch(authActions.afterLoginRedirectDataSet(
      JSON.parse(dataStr)
    ));
  }

  afterLoginRedirect.removeCookie();
};

const afterLoginMakeRedirect = (): TAppOperation => async (dispatch, getState) => {
  const data = authSelectors.getAfterLoginRedirectData(getState());

  if (!data) {
    return;
  }

  await Router.push(data.url, data.asPath);
};

const resetPasswordAndRedirect = (data: AuthSchemas.TResetPasswordBodyReq): TAppOperation => async (dispatch) => {
  const { payload } = await dispatch(authAsyncActions.resetPassword(data));

  if (getIsRejectedActionPayload(payload)) {
    return {
      err: payload.error,
    };
  }

  await Router.push(routing.getLogInUrl());
};

export const authOperations = {
  afterLoginRedirectDataSetFromCookie,
  afterLoginMakeRedirect,
  resetPasswordAndRedirect,
};
