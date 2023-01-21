import { domHelpers } from '@chpokify/helpers/dom';
import { useEffect } from 'react';

const usePreventBodyScroll = (isPrevent: boolean) => {
  useEffect(() => {
    if (isPrevent) {
      domHelpers.preventBodyScrollEnable();

      return () => {
        domHelpers.preventBodyScrollDisable();
      };
    }
  }, [isPrevent]);
};

export {
  usePreventBodyScroll,
};
