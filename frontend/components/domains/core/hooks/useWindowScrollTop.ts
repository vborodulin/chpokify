import { isServer } from '@chpokify/helpers';
import { useEffect } from 'react';

const useWindowScrollTop = () => {
  useEffect(() => {
    if (isServer()) {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);
};

export {
  useWindowScrollTop,
};
