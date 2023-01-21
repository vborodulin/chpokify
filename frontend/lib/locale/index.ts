import Cookies from 'js-cookie';
import nextCookies from 'next-cookies';

import { TPageContext } from '@Redux/types';

import { COOKIES_KEYS } from '@components/domains/core/types';

import { LOCALE } from '@components/utils/types';

const setLocale = (locale:LOCALE) => Cookies.set(COOKIES_KEYS.NEXT_LOCALE, locale, {});
const getLocale = () => Cookies.get(COOKIES_KEYS.NEXT_LOCALE);
const getLocaleSSR = (ctx: TPageContext) => nextCookies(ctx)[COOKIES_KEYS.NEXT_LOCALE];

const removeLocale = () => {
  Cookies.remove(COOKIES_KEYS.NEXT_LOCALE);
};

export {
  setLocale,
  removeLocale,
  getLocale,
  getLocaleSSR,
};
