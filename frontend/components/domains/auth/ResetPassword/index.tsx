import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { authActionsTypes } from '@Redux/domains/auth/actionsTypes';
import { authOperations } from '@Redux/domains/auth/operations';
import { TAppDispatch } from '@Redux/types';

import { FORM_FIELDS } from '@components/domains/auth/SignUp/Layout';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { Layout, TFormData } from './Layout';

type TResetPasswordProps = {
  token: string;
};

const ResetPassword = (props: TResetPasswordProps): React.ReactElement | null => {
  const { token } = props;

  const dispatch = useDispatch<TAppDispatch>();

  const {
    register, handleSubmit, errors, setError, formState,
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [authActionsTypes.RESET_PASSWORD_PENDING],
    FORM_FIELDS,
    setError
  );

  const onSubmit = async (data: TFormData) => {
    if (!formState.dirty) {
      return;
    }

    await dispatch(authOperations.resetPasswordAndRedirect({
      ...data,
      token,
    }));
  };

  return (
    <Layout
      formRefs={{
        password: register,
      }}
      errors={errors}
      errGlobalMsg={errGlobalMsg}
      hasChanges={formState.dirty}
      isLoading={formState.isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export {
  ResetPassword,
};
