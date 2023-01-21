import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';

const GoogleAnaliticsUserProcessor = (): React.ReactElement | null => {
  const currUserId = useSelector(authSelectors.getCurrUserId);
  const currUsername = useSelector(authSelectors.getCurrUsername);

  useEffect(() => {
    if (window.ga) {
      window.ga('set', 'userId', currUserId);
      window.ga('set', 'username', currUsername);
    }
  }, [currUserId]);

  return null;
};

export {
  GoogleAnaliticsUserProcessor,
};
