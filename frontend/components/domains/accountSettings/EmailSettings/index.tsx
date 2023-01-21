import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { usersActionsTypes } from '@Redux/domains/users/actionsTypes';
import { usersAsyncActions } from '@Redux/domains/users/asyncActions';
import { TAppDispatch } from '@Redux/types';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';
import { useDidmount } from '@components/utils/hooks/useDidmount';

import { ClientError } from '@lib/errors';
import { log } from '@lib/logger';

import {
  FORM_FIELDS, Layout, TEmailSettingsLayoutProps, TFormData,
} from './Layout';

export type TEmailSettingsProps = Partial<TEmailSettingsLayoutProps>;

const EmailSettings = (props: TEmailSettingsProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const dispatch = useDispatch<TAppDispatch>();

  const currUserId = useSelector(authSelectors.getCurrUserId);
  const currEmail = useSelector(authSelectors.getCurrUserEmail);

  const {
    register, handleSubmit, errors, setError, formState, reset,
  } = useForm<TFormData>();

  const { isFulfilled, errGlobalMsg } = useAsyncActionInfo(
    [usersActionsTypes.UPDATE_EMAIL_PENDING],
    FORM_FIELDS,
    setError
  );

  const handleCancel = () => {
    reset({
      email: currEmail,
    });
  };

  const onSubmit = async (data: TFormData) => {
    if (!currUserId) {
      log.error(new ClientError('currUserId is empty'));
      return;
    }

    await dispatch(usersAsyncActions.updateEmail(currUserId, data));
  };

  useDidmount(() => {
    if (isFulfilled) {
      reset({
        email: currEmail,
      });
    }
  }, [isFulfilled]);

  return (
    <Layout
      formRefs={{
        email: register,
      }}
      defaultValues={{
        email: currEmail,
      }}
      errors={errors}
      errGlobalMsg={errGlobalMsg}
      isLoading={formState.isSubmitting}
      hasChanges={formState.dirty}
      onCancel={handleCancel}
      onSubmit={handleSubmit(onSubmit)}
      {...other}
    />
  );
};

export {
  EmailSettings,
};
