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
  FORM_FIELDS, Layout, TFormData, TUsernameSettingsLayoutProps,
} from './Layout';

export type TUsernameSettingsProps = Partial<TUsernameSettingsLayoutProps>;

const UsernameSettings = (props: TUsernameSettingsProps): React.ReactElement | null => {
  const { ...other } = props;

  const currUserId = useSelector(authSelectors.getCurrUserId);
  const dispatch = useDispatch<TAppDispatch>();

  const currUsername = useSelector(authSelectors.getCurrUsername);

  const {
    register, handleSubmit, errors, setError, formState, reset,
  } = useForm<TFormData>();

  const { isFulfilled, errGlobalMsg } = useAsyncActionInfo(
    [usersActionsTypes.UPDATE_PENDING],
    FORM_FIELDS,
    setError
  );

  const handleCancel = () => {
    reset();
  };

  const onSubmit = async (data: TFormData) => {
    if (!currUserId) {
      log.error(new ClientError('currUserId is not empty'));
      return;
    }

    await dispatch(usersAsyncActions.update(currUserId, data));
  };

  useDidmount(() => {
    if (isFulfilled) {
      reset({
        username: currUsername,
      });
    }
  }, [isFulfilled]);

  return (
    <Layout
      formRefs={{
        username: register,
      }}
      defaultValues={{
        username: currUsername,
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
  UsernameSettings,
};
