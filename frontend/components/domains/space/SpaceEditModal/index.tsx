import { TSpace } from '@chpokify/models-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { spacesActionsTypes } from '@Redux/domains/spaces/actionsTypes';
import { spacesAsyncActions } from '@Redux/domains/spaces/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppDispatch } from '@Redux/types';

import { TModalProps } from '@components/domains/shared/Modal';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { FORM_FIELDS, Layout, TFormData } from './Layout';

export type TSpaceEditModalProps = Partial<TModalProps> & {
  space: TSpace;
  onClose: () => void;
};

const SpaceEditModal = (props: TSpaceEditModalProps): React.ReactElement | null => {
  const {
    space,
    onClose,
    ...other
  } = props;

  const dispatch = useDispatch<TAppDispatch>();

  const {
    register, handleSubmit, errors, setError, formState,
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [spacesActionsTypes.UPDATE_PENDING],
    FORM_FIELDS,
    setError
  );

  const onSubmit = async (data: TFormData) => {
    const { payload } = await dispatch(spacesAsyncActions.spaceUpdate(space._id, data));

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  return (
    <Layout
      formRefs={{
        name: register,
      }}
      defaultValues={{
        name: space.name,
      }}
      errors={errors}
      errGlobalMsg={errGlobalMsg}
      hasChanges={formState.dirty}
      isLoading={formState.isSubmitting}
      onCancel={onClose}
      onSave={handleSubmit(onSubmit)}
      {...other}
    />
  );
};

export {
  SpaceEditModal,
};
