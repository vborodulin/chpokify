import { routing } from '@chpokify/routing';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';

import { spacesActionsTypes } from '@Redux/domains/spaces/actionsTypes';
import { spacesOperations } from '@Redux/domains/spaces/operations';
import { getIsRejectedOperation } from '@Redux/helpers/common';
import { TAppDispatch } from '@Redux/types';

import { FORM_FIELDS } from '@components/domains/auth/SignUp/Layout';
import { TModalProps } from '@components/domains/shared/Modal';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { Layout } from './Layout';

export type TSpaceLeaveConfirmModalProps = Partial<TModalProps> & {
  onClose: () => void;
};

const SpaceLeaveConfirmModal = (props: TSpaceLeaveConfirmModalProps): React.ReactElement | null => {
  const {
    onClose,
    ...other
  } = props;

  const router = useRouter();

  const dispatch = useDispatch<TAppDispatch>();

  const { isLoading, errGlobalMsg } = useAsyncActionInfo(
    [spacesActionsTypes.LEAVE_PENDING],
    FORM_FIELDS
  );

  const handleLeave = async () => {
    await router.push(routing.getSpacesChooseUrl());
    const res = await dispatch(spacesOperations.currSpaceLeaveAndClearLastMark());

    if (!getIsRejectedOperation(res)) {
      onClose();
    }
  };

  return (
    <Layout
      isLoading={isLoading}
      errGlobalMsg={errGlobalMsg}
      onCancel={onClose}
      onLeave={handleLeave}
      {...other}
    />
  );
};

export {
  SpaceLeaveConfirmModal,
};
