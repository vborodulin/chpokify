import React, { useEffect, useState } from 'react';

import { isomorphicLocalStorage } from '@lib/isomorphicStorage';

import { Layout } from './Layout';

export type TAcceptCookiesBannerProps = {};

export const COOKIE_BANNER_HIDE_STORAGE_KEY = 'cookieBannerHide';

const AcceptCookiesBanner = (props: TAcceptCookiesBannerProps): React.ReactElement | null => {
  const [needShow, setNeedShow] = useState<boolean>(false);

  const handleAcceptCookie = async () => {
    isomorphicLocalStorage.setItem(COOKIE_BANNER_HIDE_STORAGE_KEY, new Date().toString());
    setNeedShow(false);
  };

  useEffect(() => {
    const isHide = isomorphicLocalStorage.getItem(COOKIE_BANNER_HIDE_STORAGE_KEY);
    setNeedShow(!isHide);
  }, []);

  return (
    <Layout
      needShow={needShow}
      onSubmit={handleAcceptCookie}
      {...props}
    />
  );
};

export {
  AcceptCookiesBanner,
};
