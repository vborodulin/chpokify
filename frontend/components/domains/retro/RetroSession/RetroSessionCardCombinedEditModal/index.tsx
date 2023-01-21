import { TEntityID, TRetroCard } from '@chpokify/models-types';
import { compact } from 'lodash';
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

import { Layout } from '@components/domains/retro/RetroSession/RetroSessionCardCombinedEditModal/Layout';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

export type TFormData = Pick<TRetroCard, 'title' | 'description'>

const FORM_FIELDS: (keyof TFormData)[] = [
  'title',
  'description',
];

type TRetroSessionCardCombinedEditModalProps = {
  retroCardId: TEntityID,
  onClose: () => void;
};

const SEPARATOR_MULTIPLE_TITLES = '\n-\n';

const FORM_ID = 'RetroSessionEditCardCombined';

const RetroSessionCardCombinedEditModal = (props: TRetroSessionCardCombinedEditModalProps):
  React.ReactElement | null => {
  const {
    onClose,
    retroCardId,
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
  const combinedCardsTitles = useSelector(retroSessionsCardsSelectors.getCombinedCardsTitles)(retroCardId);
  const combinedCardsDescriptions = useSelector(retroSessionsCardsSelectors.getCombinedCardsDescriptions)(retroCardId);

  const getDefaultValueTitle = () => {
    const cardsTitles = [retroCard?.title].concat(combinedCardsTitles);
    return cardsTitles.join(SEPARATOR_MULTIPLE_TITLES);
  };

  const getDefaultValueDescription = () => {
    const cardsDescriptions = [retroCard?.description].concat(combinedCardsDescriptions);
    return cardsDescriptions.join(SEPARATOR_MULTIPLE_TITLES);
  };

  const convertData = (titleOrDescription: string) =>
    titleOrDescription
      .split(SEPARATOR_MULTIPLE_TITLES)
      .map((item) => item.trim());

  const enhanceData = (data: TFormData) => {
    const splitTitleData = compact(convertData(data.title));
    const splitDescriptionData = convertData(data.description);

    const [title, ...otherTitles] = splitTitleData;
    const [description, ...otherDescriptions] = splitDescriptionData;

    return {
      title,
      description,
      combinedCardsTitles: otherTitles,
      combinedCardsDescriptions: otherDescriptions,
    };
  };

  const onSubmit = async (data: TFormData) => {
    if (!retroCard) {
      return;
    }

    const sendData = enhanceData(data);

    const { payload } = await dispatch(
      retroSessionsCardsAsyncActions.update(currSpaceId, retroCard._id, sendData)
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
  RetroSessionCardCombinedEditModal,
};
