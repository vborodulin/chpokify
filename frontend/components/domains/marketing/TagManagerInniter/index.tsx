import React, { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { useSelector } from 'react-redux';

import { configSelectors } from '@Redux/domains/config/selectors';

const TagManagerInniter = (): React.ReactElement | null => {
  const trackingId = useSelector(configSelectors.getTagManagerTrackingId);

  useEffect(() => {
    if (!trackingId) {
      return;
    }

    const tagManagerArgs = {
      gtmId: trackingId,
    };

    TagManager.initialize(tagManagerArgs);
  }, []);

  return null;
};

export {
  TagManagerInniter,
};
