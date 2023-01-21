import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authActionsTypes } from '@Redux/domains/auth/actionsTypes';
import { authAsyncActions } from '@Redux/domains/auth/asyncActions';
import { authSelectors } from '@Redux/domains/auth/selectors';
import { authRepoOperations } from '@Redux/domains/authRepo/operations';
import { spacesOperations } from '@Redux/domains/spaces/operations';
import { TAppDispatch } from '@Redux/types';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';
import { useInterval } from '@components/utils/hooks/useInterval';

import { Layout } from './Layout';

const TIMER_SEC_AMOUNT = 59;

const NeedConfirmEmail = () => {
  const dispatch = useDispatch<TAppDispatch>();

  const isEmailConfirmed = useSelector(authSelectors.getIsEmailConfirmed);

  const {
    isFulfilled,
    isLoading,
    errGlobalMsg,
  } = useAsyncActionInfo([authActionsTypes.CONFIRM_EMAIL_RESEND_PENDING]);

  const [timerSec, setTimerSec] = useState<number>(0);

  const handleSignOut = async () => {
    await dispatch(authRepoOperations.signOutAndClearSpace());
  };

  const handleResend = async () => {
    await dispatch(authAsyncActions.resendConfirmEmail());
  };

  useEffect(() => {
    if (isFulfilled) {
      setTimerSec(TIMER_SEC_AMOUNT);
    }
  }, [isFulfilled]);

  useInterval(
    'interval',
    () => {
      setTimerSec((prevVal) => prevVal - 1);
    },
    timerSec ? 1000 : null
  );

  useEffect(() => {
    if (isEmailConfirmed) {
      dispatch(spacesOperations.redirectToCurrSpace());
    }
  }, [isEmailConfirmed]);

  return (
    <Layout
      resendTimerSec={timerSec}
      errGlobalMsg={errGlobalMsg}
      isLoading={isLoading}
      onResend={handleResend}
      onSignOut={handleSignOut}
    />
  );
};

export {
  NeedConfirmEmail,
};
