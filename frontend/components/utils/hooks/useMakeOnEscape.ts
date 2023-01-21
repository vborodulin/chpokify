import { isServer } from '@chpokify/helpers';
import React from 'react';

import { useEventListener } from '@components/utils/hooks/useEventListener';

const useMakeOnEscape = (cb: Function) => {
  const handleCloseOnEsc = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Esc': // IE/Edge specific value
      case 'Escape':
        cb();
        break;
      default:
    }
  };

  useEventListener(
    isServer() ? null : window,
    'keydown',
    handleCloseOnEsc
  );
};

export {
  useMakeOnEscape,
};
