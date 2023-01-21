import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { usersActionsTypes } from '@Redux/domains/users/actionsTypes';
import { usersAsyncActions } from '@Redux/domains/users/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppDispatch } from '@Redux/types';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { ClientError } from '@lib/errors';
import { log } from '@lib/logger';

import {
  FORM_FIELDS, Layout, TFormData, TPasswordSettingsLayoutProps,
} from './Layout';

export type TPasswordSettingsProps = Partial<TPasswordSettingsLayoutProps>;

const PasswordSettings = (props: TPasswordSettingsProps) => {
  const { ...other } = props;

  const currUserId = useSelector(authSelectors.getCurrUserId);
  const dispatch = useDispatch<TAppDispatch>();

  const {
    register, handleSubmit, errors, setError, formState, reset,
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [usersActionsTypes.UPDATE_PASSWORD_PENDING],
    FORM_FIELDS,
    setError
  );

  const handleCancel = () => {
    reset();
  };

  const onSubmit = async (data: TFormData) => {
    if (!currUserId) {
      log.error(new ClientError('currUserId is empty'));
      return;
    }

    const { payload } = await dispatch(usersAsyncActions.updatePassword(currUserId, data));

    if (!getIsRejectedActionPayload(payload)) {
      reset();
    }
  };

  return (
    <Layout
      formRefs={{
        password: register,
        newPassword: register,
        repeatNewPassword: register,
      }}
      errors={errors}
      errGlobalMsg={errGlobalMsg}
      hasChanges={formState.dirty}
      isLoading={formState.isSubmitting}
      isFulfilled={formState.isSubmitted && !formState.dirty}
      onCancel={handleCancel}
      onSubmit={handleSubmit(onSubmit)}
      {...other}
    />
  );
};

export {
  PasswordSettings,
};
