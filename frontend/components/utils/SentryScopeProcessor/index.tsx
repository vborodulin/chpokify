import * as Sentry from '@sentry/nextjs';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';

const SentryScopeProcessor = (): React.ReactElement | null => {
  const currUser = useSelector(authSelectors.getCurrUser);

  useEffect(() => {
    if (!currUser) {
      return;
    }

    Sentry.setUser({
      id: currUser._id.toString(),
      email: currUser.email,
      username: currUser.username,
      ip_address: '{{auto}}',
    });
  }, [currUser?._id]);

  return null;
};

export {
  SentryScopeProcessor,
};
