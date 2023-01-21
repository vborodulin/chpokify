import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { spacesActionsTypes } from '@Redux/domains/spaces/actionsTypes';
import { spacesAsyncActions } from '@Redux/domains/spaces/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { TAppDispatch } from '@Redux/types';

import { TPaperProps } from '@components/uiKit/Paper';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { FORM_FIELDS, Layout, TFormData } from './Layout';

export type TSpaceEditModalProps = Partial<TPaperProps>;

const SettingsMeta = (props: TSpaceEditModalProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const dispatch = useDispatch<TAppDispatch>();

  const currSpace = useSelector(spacesSelectors.getCurrSpace);

  const {
    register, handleSubmit, errors, setError, formState, reset,
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [spacesActionsTypes.UPDATE_PENDING],
    FORM_FIELDS,
    setError
  );

  const onSubmit = async (data: TFormData) => {
    if (!currSpace) {
      return;
    }

    await dispatch(
      spacesAsyncActions.spaceUpdate(currSpace._id, data)
    );
  };

  const handleCancel = () => {
    reset();
  };

  if (!currSpace) {
    return null;
  }

  return (
    <Layout
      formRefs={{
        name: register,
      }}
      defaultValues={{
        name: currSpace.name,
      }}
      errors={errors}
      errGlobalMsg={errGlobalMsg}
      hasChanges={formState.dirty}
      isLoading={formState.isSubmitting}
      onCancel={handleCancel}
      onSave={handleSubmit(onSubmit)}
      {...other}
    />
  );
};

export {
  SettingsMeta,
};
