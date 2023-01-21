import { useEffect, useRef } from 'react';

export const useDidmount = (fn: () => void, deps: any[]) => {
  const didMountRef = useRef<boolean>(false);

  useEffect(() => {
    if (didMountRef.current) {
      fn();
    } else {
      didMountRef.current = true;
    }
  }, deps);
};
