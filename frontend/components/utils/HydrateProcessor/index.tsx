import React, { useEffect } from 'react';

import { systemActions } from '@Redux/domains/system/actions';
import { useAppDispatch } from '@Redux/hooks';

const HydrateProcessor = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(systemActions.hydrate());
  }, []);

  return null;
};

export {
  HydrateProcessor,
};
