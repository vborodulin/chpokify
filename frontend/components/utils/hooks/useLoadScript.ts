import { useEffect, useState } from 'react';

const cache: Record<string, boolean> = {};

const useLoadScript = (src: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(undefined);

  const handleLoad = () => {
    setIsLoading(false);
    setError(undefined);
    cache[src] = true;
  };

  const handleError = (event: Event | string) => {
    setIsLoading(false);
    setError(event);
  };

  useEffect(() => {
    if (cache[src]) {
      handleLoad();
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;

    document.body.appendChild(script);

    script.onload = handleLoad;
    script.onerror = handleError;

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return {
    isLoading,
    error,
  };
};

export {
  useLoadScript,
};
