import { useState } from 'react';

const useLoading = (cb: () => Promise<void>, initialState = true): [boolean, () => Promise<void>] => {
  const [isLoading, setIsLoading] = useState<boolean>(initialState);

  const handleCb = async () => {
    setIsLoading(true);
    await cb();
    setIsLoading(false);
  };

  return [isLoading, handleCb];
};

export {
  useLoading,
};
