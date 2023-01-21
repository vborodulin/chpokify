import { emailHelpers } from '@chpokify/helpers/emails';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { authActionsTypes } from '@Redux/domains/auth/actionsTypes';
import { authAsyncActions } from '@Redux/domains/auth/asyncActions';
import { spacesOperations } from '@Redux/domains/spaces/operations';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppDispatch } from '@Redux/types';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { FORM_FIELDS, Layout, TFormData } from './Layout';

const SignUp = (): React.ReactElement | null => {
  const dispatch = useDispatch<TAppDispatch>();

  const invite = useSelector(spacesSelectors.getInvite);

  const {
    register, handleSubmit, errors, setError, formState,
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [authActionsTypes.SIGN_UP_PENDING],
    FORM_FIELDS,
    setError
  );

  const onSubmit = async (data: TFormData) => {
    if (!formState.dirty) {
      return;
    }

    const { payload } = await dispatch(authAsyncActions.signUp({
      ...data,
      inviteSpaceToken: invite?.token,
    }));

    if (!getIsRejectedActionPayload(payload)) {
      await dispatch(spacesOperations.redirectToCurrSpace());
    }
  };

  return (
    <Layout
      formRefs={{
        email: register,
        username: register,
        password: register,
      }}
      defaultValues={{
        email: invite?.payload.email,
        username: emailHelpers.getUsername(invite?.payload.email),
      }}
      invitePayload={invite?.payload}
      isEmailDisabled={!!invite?.payload.email}
      errors={errors}
      errGlobalMsg={errGlobalMsg}
      hasChanges={formState.dirty}
      isLoading={formState.isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export {
  SignUp,
};
