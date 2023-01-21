import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { Layout, TFormData } from './Layout';

const CreateSession = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
  } = useForm<TFormData>();

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const onSubmit = (data: TFormData) => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_CREATE, {
      title: data.title,
    }));
  };

  return (
    <Layout
      formRefs={{
        title: register,
      }}
      canModerate={canModerate}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export {
  CreateSession,
};
