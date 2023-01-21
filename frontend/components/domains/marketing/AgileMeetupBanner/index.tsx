import React, { useEffect, useState } from 'react';

import { isomorphicLocalStorage } from '@lib/isomorphicStorage';

import { Layout } from './Layout';

const AGILE_MEETUP_BANNER_HIDE_STORAGE_KEY = 'agileMeetupBannerHide';

const AgileMeetupBanner = (): React.ReactElement | null => {
  const [needShow, setNeedShow] = useState<boolean>(false);

  const handleAcceptCookie = () => {
    isomorphicLocalStorage.setItem(AGILE_MEETUP_BANNER_HIDE_STORAGE_KEY, new Date().toString());
    setNeedShow(false);
  };

  useEffect(() => {
    const isHide = isomorphicLocalStorage.getItem(AGILE_MEETUP_BANNER_HIDE_STORAGE_KEY);
    setNeedShow(!isHide);
  }, []);

  return (
    <Layout
      needShow={needShow}
      onClick={handleAcceptCookie}
    />
  );
};

export {
  AgileMeetupBanner,
};
