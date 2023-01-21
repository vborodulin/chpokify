import dynamic from 'next/dynamic';

import { TLogInProps } from './LogIn';

const LogIn = dynamic<TLogInProps>(
  () => import('./LogIn').then((mod) => mod.LogIn),
  {
    ssr: false,
  }
);

export {
  LogIn,
};
