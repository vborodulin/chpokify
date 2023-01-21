import { isServer } from '@chpokify/helpers';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { authOperations } from '@Redux/domains/auth/operations';
import { TAppDispatch } from '@Redux/types';

import { afterLoginRedirect } from '@lib/auth/afterLoginRedirect';

const AfterLoginRedirectProcessor = (): React.ReactElement | null => {
  const dispatch = useDispatch<TAppDispatch>();

  useEffect(() => {
    if (isServer()) {
      return;
    }

    const afterLoginRedirectDataStr = afterLoginRedirect.getCookie();

    if (afterLoginRedirectDataStr) {
      dispatch(authOperations.afterLoginRedirectDataSetFromCookie());
    }
  }, []);

  return null;
};

export {
  AfterLoginRedirectProcessor,
};
