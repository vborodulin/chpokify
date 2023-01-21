import addDays from 'date-fns/addDays';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';

import { COOKIES_KEYS } from '@components/domains/core/types';

const setMark = (res: GetServerSidePropsContext['res'], product: string) => {
  const nowDate = addDays(new Date(), 7);
  res.setHeader(
    'Set-Cookie',
    `${COOKIES_KEYS.SIGN_UP}=${product}; path=/; expires=${nowDate.toUTCString()}`
  );
};

const getMark = () => Cookies.get(COOKIES_KEYS.SIGN_UP);

const removeMark = () => Cookies.remove(COOKIES_KEYS.SIGN_UP);

export const signUpMarker = {
  setMark,
  getMark,
  removeMark,
};
