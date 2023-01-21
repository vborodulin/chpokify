import { isServer } from '@chpokify/helpers';
import React, { useEffect, useRef } from 'react';

import { useEventListener } from '@components/utils/hooks/useEventListener';

const WakeLockProcessor = (): React.ReactElement | null => {
  const wakeLockRef = useRef<FIXME | null>(null);

  const getWakeLock = async () => {
    try {
      // @ts-ignore
      wakeLockRef.current = await navigator.wakeLock.request('screen');
    } catch (err) {
      // do nothing
    }
  };

  useEffect(() => {
    getWakeLock();
  }, []);

  const releaseWakeLock = async () => {
    try {
      const wakeLock = wakeLockRef.current;

      if (!wakeLock) {
        return;
      }

      await wakeLock.release();
      wakeLockRef.current = null;
    } catch (err) {
      // do nothing
    }
  };

  useEffect(() => () => {
    releaseWakeLock();
  }, []);

  const handleVisibilitychange = async () => {
    try {
      const wakeLock = wakeLockRef.current;

      if (wakeLock !== null && document.visibilityState === 'visible') {
        // @ts-ignore
        wakeLockRef.current = await navigator.wakeLock.request('screen');
      }
    } catch (err) {
      // do nothing
    }
  };

  useEventListener(
    isServer() ? null : document,
    'visibilitychange',
    handleVisibilitychange
  );

  return null;
};

export {
  WakeLockProcessor,
};
