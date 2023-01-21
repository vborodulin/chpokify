import { routing } from '@chpokify/routing';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';

import { Layout } from './Layout';

export type TConfirmEmailFail = {

}

const ConfirmEmailFail: React.FunctionComponent<TConfirmEmailFail> = () => {
  const router = useRouter();

  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  const handleTryAgain = async () => {
    if (isLoggedIn) {
      await router.push(routing.getNeedConfirmEmailUrl());
    } else {
      await router.push(routing.getLogInUrl());
    }
  };

  return (
    <Layout
      onTryAgain={handleTryAgain}
    />
  );
};

export {
  ConfirmEmailFail,
};
