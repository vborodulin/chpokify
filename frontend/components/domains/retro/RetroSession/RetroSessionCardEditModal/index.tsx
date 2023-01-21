import { TEntityID, TRetroCard } from '@chpokify/models-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { retroSessionsCardsActionsTypes } from '@Redux/domains/retroSessionsCards/actionsTypes';
import { retroSessionsCardsAsyncActions } from '@Redux/domains/retroSessionsCards/asyncActions';
import { retroSessionsCardsSelectors } from '@Redux/domains/retroSessionsCards/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Layout } from '@components/domains/retro/RetroSession/RetroSessionCardEditModal/Layout';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

export type TFormData = Pick<TRetroCard, 'title' | 'description'>

const FORM_FIELDS: (keyof TFormData)[] = [
  'title',
  'description',
];

type TRetroCardEditModalProps = {
  retroCardId: TEntityID,
  isColumnAction:boolean,
  onClose: () => void;
};

const FORM_ID = 'RetroSessionEditCard';

const RetroCardEditModal = (props: TRetroCardEditModalProps): React.ReactElement | null => {
  const {
    retroCardId,
    isColumnAction,
    onClose,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState: {
      dirty,
      isSubmitting,
    },
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [retroSessionsCardsActionsTypes.UPDATE_PENDING],
    FORM_FIELDS,
    setError
  );

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const retroCard = useSelector(retroSessionsCardsSelectors.getById)(retroCardId);

  const getDefaultValueTitle = () => retroCard?.title;

  const getDefaultValueDescription = () => retroCard?.description;

  const enhanceData = (data: TFormData) => data;

  const onSubmit = async (data: TFormData) => {
    if (!retroCard) {
      return;
    }

    const { payload } = await dispatch(
      retroSessionsCardsAsyncActions.update(currSpaceId, retroCard._id, enhanceData(data))
    );

    if (!getIsRejectedActionPayload(payload) && onClose) {
      dispatch(uiActions.modalPreventCloseSet(false));
      onClose();
    }
  };

  if (!retroCard) {
    return null;
  }

  return (
    <Layout
      formId={FORM_ID}
      isColumnAction={isColumnAction}
      isSubmitDisabled={isSubmitting || !dirty}
      formRefs={{
        title: register,
        description: register,
      }}
      errors={errors}
      defaultValueTitle={getDefaultValueTitle()}
      defaultValueDescription={getDefaultValueDescription()}
      errGlobalMsg={errGlobalMsg}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={onClose}
      {...other}
    />
  );
};

export {
  RetroCardEditModal,
};
