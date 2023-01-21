import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';

import { lastSpaceMarker } from '@components/domains/space/helpers/lastSpaceMarker';

const SpaceLastMarkerProcessor = (): React.ReactElement | null => {
  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);

  useEffect(() => {
    if (currSpaceId) {
      lastSpaceMarker.setMark(currSpaceId);
    }
  }, [currSpaceId]);

  return null;
};

export {
  SpaceLastMarkerProcessor,
};
