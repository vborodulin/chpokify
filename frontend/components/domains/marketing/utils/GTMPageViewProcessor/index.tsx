import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { GTMPageView } from '@lib/gtm';

const GTNPageViewProcessor = (): React.ReactElement | null => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => GTMPageView(url);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return null;
};

export {
  GTNPageViewProcessor,
};
