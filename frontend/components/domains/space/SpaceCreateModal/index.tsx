import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { spacesActionsTypes } from '@Redux/domains/spaces/actionsTypes';
import { spacesOperations } from '@Redux/domains/spaces/operations';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { getIsRejectedOperation } from '@Redux/helpers/common';
import { TAppDispatch } from '@Redux/types';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import {
  FORM_FIELDS, Layout, TCreateNewSpaceLayoutProps, TFormData,
} from './Layout';

export type TCreateSpaceModalProps = Partial<TCreateNewSpaceLayoutProps> & {
  onClose: () => void;
};

const SpaceCreateModal = (props: TCreateSpaceModalProps): React.ReactElement | null => {
  const {
    onClose,
    ...other
  } = props;

  const dispatch = useDispatch<TAppDispatch>();

  const showSpaceOnboarding = useSelector(authSelectors.getShowSpaceOnboarding);

  const {
    register, handleSubmit, errors, setError, formState,
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [spacesActionsTypes.CREATE_PENDING],
    FORM_FIELDS,
    setError
  );

  const handleOpenInviteModal = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.PARTICIPANT_INVITE));
  };

  const onSubmit = async (data: TFormData) => {
    const res = await dispatch(spacesOperations.spaceCreateAndRedirect(data));

    if (!getIsRejectedOperation(res)) {
      if (onClose) {
        onClose();
      }

      if (!showSpaceOnboarding) {
        handleOpenInviteModal();
      }
    }
  };

  return (
    <Layout
      formRefs={{
        name: register,
      }}
      errors={errors}
      errGlobalMsg={errGlobalMsg}
      hasChanges={formState.dirty}
      isLoading={formState.isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={onClose}
      {...other}
    />
  );
};

export {
  SpaceCreateModal,
};
