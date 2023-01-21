import { RouterContext } from 'next/dist/shared/lib/router-context';
import Router from 'next/router';
import React, { useState } from 'react';

const RouterMock: React.FunctionComponent<{}> = (props) => {
  const { children } = props;

  const [pathname, setPathname] = useState<string>('');

  const mockRouter: FIXME = {
    pathname,
    push: async (newPathname: string) => {
      setPathname(newPathname);
    },
    prefetch: async () => {},
  };

  Router.router = mockRouter;

  return (
    <RouterContext.Provider
      value={mockRouter}
    >
      {children}
    </RouterContext.Provider>
  );
};

export {
  RouterMock,
};
