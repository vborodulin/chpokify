import {
  TLogInGuest,
  INVITE_USER_TO,
  TInviteRetroSessionTokenPayload,
  TInvitePokerSessionTokenPayload,
} from '@chpokify/models-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { asyncRejectedSelectors } from '@Redux/domains/asyncInfo/rejected/selectors';
import { authActionsTypes } from '@Redux/domains/auth/actionsTypes';
import { authAsyncActions } from '@Redux/domains/auth/asyncActions';
import { useAppDispatch } from '@Redux/hooks';

import { Layout, TFormData } from '@components/domains/auth/LogInGuest/Layout';

import { TFlexProps } from '@components/uiKit/Flex';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

type TLogInGuestProps = TFlexProps & {
  inviteTokenPayload: TInviteRetroSessionTokenPayload | TInvitePokerSessionTokenPayload | undefined;
  inviteToken: string | undefined,
  inviteUserTo: INVITE_USER_TO
};

const LogInGuest = (props: TLogInGuestProps): React.ReactElement | null => {
  const {
    inviteToken,
    inviteTokenPayload,
    inviteUserTo,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const teamsOptions = inviteTokenPayload?.teams.map((item) => ({
    label: item.name,
    value: item._id.toString(),
  })) as [];

  const {
    register,
    handleSubmit,
    errors,
    setError,
    watch,
    formState: {
      isSubmitting,
    },
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [authActionsTypes.LOG_IN_GUEST_PENDING],
    [
      'email',
      'teamId',
    ],
    setError
  );
  const loginApiErr = useSelector(asyncRejectedSelectors.createErrorSelector)([authActionsTypes.LOG_IN_GUEST_PENDING]);

  const watchEmail = watch('email');

  const enhanceData = (data: TFormData, token: string): TLogInGuest => ({
    ...data,
    inviteToken: token,
    inviteTo: inviteUserTo,
  });

  const onSubmit = async (data: TFormData) => {
    if (!watchEmail || !inviteToken) {
      return;
    }

    const sendData = enhanceData(data, inviteToken);
    await dispatch(authAsyncActions.logInGuest(sendData));
  };

  if (!inviteTokenPayload) {
    return null;
  }

  return (
    <Layout
      formRefs={{
        email: register,
        teamId: register,
      }}
      errors={errors}
      errGlobalMsg={errGlobalMsg}
      hasChanges={!!watchEmail}
      isLoading={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      teamsOptions={teamsOptions}
      loginApiErr={loginApiErr}
      {...other}
    />
  );
};

export {
  LogInGuest,
};
