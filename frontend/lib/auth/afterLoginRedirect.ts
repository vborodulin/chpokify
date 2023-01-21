import { isServer } from '@chpokify/helpers';
import addSeconds from 'date-fns/addSeconds';
import Cookies from 'js-cookie';

import { TPageContext } from '@Redux/types';

const AFTER_LOGIN_REDIRECT_COOKIE = 'afterLoginRedirect';

const EXPIRES_SEC = 300;

export type TAfterLoginRedirect = {
  url: string,
  asPath?: string
};

const getCookie = () => Cookies.get(AFTER_LOGIN_REDIRECT_COOKIE);

const removeCookie = () => {
  Cookies.remove(AFTER_LOGIN_REDIRECT_COOKIE);
};

const setCookieFromCtx = (ctx: TPageContext) => {
  const {
    pathname,
    asPath,
    res,
  } = ctx;

  const expiresDate = addSeconds(new Date(), EXPIRES_SEC);

  const redirectData: TAfterLoginRedirect = {
    url: pathname,
    asPath,
  };

  const redirectDataStr = JSON.stringify(redirectData);

  if (res) {
    res.setHeader(
      'Set-Cookie',
      `${AFTER_LOGIN_REDIRECT_COOKIE}=${redirectDataStr}; path=/; expires=${expiresDate.toUTCString()}`
    );
  }

  if (!isServer()) {
    Cookies.set(
      AFTER_LOGIN_REDIRECT_COOKIE,
      redirectDataStr,
      {
        expires: expiresDate,
      }
    );
  }
};

export const afterLoginRedirect = {
  setCookieFromCtx,
  getCookie,
  removeCookie,
};
