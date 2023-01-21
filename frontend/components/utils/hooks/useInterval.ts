import { useEffect, useRef } from 'react';

type INTERVAL_TYPE = 'interval' | 'timeout';

const useInterval = (
  type: INTERVAL_TYPE,
  callback: () => void, delay: number | null,
  immediate?: boolean
) => {
  const callbackRef = useRef<() => void>();

  const setMethod = type === 'interval' ? setInterval : setTimeout;
  const cleanMethod = type === 'interval' ? clearInterval : clearTimeout;

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = () => {
      if (callbackRef.current) {
        callbackRef.current();
      }
    };

    if (delay !== null) {
      if (immediate) {
        handler();
      }

      const id = setMethod(handler, delay);
      // @ts-ignore
      return () => cleanMethod(id);
    }
  }, [delay]);
};

export { useInterval };
