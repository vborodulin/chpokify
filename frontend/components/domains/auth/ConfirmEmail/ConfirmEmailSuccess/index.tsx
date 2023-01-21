import { routing } from '@chpokify/routing';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { spacesOperations } from '@Redux/domains/spaces/operations';
import { TAppDispatch } from '@Redux/types';

import { Layout } from './Layout';

const ConfirmEmailSuccess: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch<TAppDispatch>();
  const router = useRouter();

  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  const handleResume = async () => {
    if (isLoggedIn) {
      await dispatch(spacesOperations.redirectToCurrSpace());
    } else {
      await router.push(routing.getLogInUrl());
    }
  };

  return (
    <Layout
      onResume={handleResume}
    />
  );
};

export {
  ConfirmEmailSuccess,
};
