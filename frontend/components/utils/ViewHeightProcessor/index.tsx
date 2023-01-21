import { isServer } from '@chpokify/helpers';
import React, { useEffect } from 'react';

import { useEventListener } from '@components/utils/hooks/useEventListener';

const ViewHeightProcessor = (): React.ReactElement | null => {
  const updateVh = () => {
    const rootEl: HTMLElement | null = document.querySelector(':root');

    if (rootEl) {
      rootEl.style.setProperty('--vh', `${window.innerHeight / 100}px`);
    }
  };

  useEffect(() => {
    updateVh();
  }, []);

  useEventListener(
    isServer() ? null : window,
    'resize',
    updateVh
  );

  return null;
};

export {
  ViewHeightProcessor,
};
