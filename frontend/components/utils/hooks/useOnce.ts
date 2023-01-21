import { useEffect, useRef } from 'react';

const useOnce = (
  cond: () => boolean,
  cb: () => void,
  deps: any[]
) => {
  const didCallRef = useRef<boolean>(false);

  useEffect(() => {
    if (didCallRef.current || !cond()) {
      return;
    }

    didCallRef.current = true;
    cb();
  }, [deps]);
};

export {
  useOnce,
};
