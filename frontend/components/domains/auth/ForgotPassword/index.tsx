import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import shortid from 'shortid';

import { authActionsTypes } from '@Redux/domains/auth/actionsTypes';
import { authAsyncActions } from '@Redux/domains/auth/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppDispatch } from '@Redux/types';

import { FORM_FIELDS } from '@components/domains/auth/SignUp/Layout';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { Layout, TFormData } from './Layout';

const ForgotPassword: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch<TAppDispatch>();

  const [sendId, setSendId] = useState<string>('');

  const {
    register, handleSubmit, errors, setError, formState, reset,
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [authActionsTypes.RESTORE_PASSWORD_PENDING],
    FORM_FIELDS,
    setError
  );

  const onSubmit = async (data: TFormData) => {
    if (!formState.dirty) {
      return;
    }

    const { payload } = await dispatch(authAsyncActions.restorePassword(data));

    if (!getIsRejectedActionPayload(payload)) {
      reset({
        email: '',
      });
      setSendId(shortid());
    }
  };

  return (
    <Layout
      formRefs={{
        email: register,
      }}
      errors={errors}
      errGlobalMsg={errGlobalMsg}
      sendId={sendId}
      isTouched={!!Object.keys(formState.touched).length}
      hasChanges={formState.dirty}
      isLoading={formState.isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export {
  ForgotPassword,
};
