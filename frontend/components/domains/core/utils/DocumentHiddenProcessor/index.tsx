import { isServer } from '@chpokify/helpers';
import React from 'react';

import { uiActions } from '@Redux/domains/ui/actions';
import { useAppDispatch } from '@Redux/hooks';

import { useEventListener } from '@components/utils/hooks/useEventListener';

const DocumentHiddenProcessor = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();

  const handleVisibilityChange = () => {
    dispatch(uiActions.isDocumentHiddenSet(document.hidden));
  };

  useEventListener(
    isServer() ? null : document,
    'visibilitychange',
    handleVisibilityChange
  );

  return null;
};

export {
  DocumentHiddenProcessor,
};
