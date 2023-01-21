import { TStory } from '@chpokify/models-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { storiesActionsTypes } from '@Redux/domains/stories/actionsTypes';
import { storiesAsyncActions } from '@Redux/domains/stories/asyncActions';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppDispatch } from '@Redux/types';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { FORM_FIELDS, Layout, TFormData } from './Layout';

export type TPokerSessionStoryEdiModalProps = {
  story: TStory;
  onClose: () => void;
};

const PokerSessionStoryEdiModal = (props: TPokerSessionStoryEdiModalProps): React.ReactElement | null => {
  const {
    story,
    onClose,
  } = props;

  const dispatch = useDispatch<TAppDispatch>();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [storiesActionsTypes.UPDATE_PENDING],
    FORM_FIELDS,
    setError
  );

  const handleRemove = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_STORY_REMOVE, {
      story,
    }));
  };

  const onSubmit = async (data: TFormData) => {
    const { payload } = await dispatch(storiesAsyncActions.update(
      currSpaceId,
      story._id,
      data
    ));

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  return (
    <Layout
      formRefs={{
        title: register,
      }}
      defaultValues={{
        title: story.title,
      }}
      isLoading={formState.isSubmitting}
      errors={errors}
      errGlobalMsg={errGlobalMsg}
      onCancel={onClose}
      onSubmit={handleSubmit(onSubmit)}
      onRemove={handleRemove}
    />
  );
};

export {
  PokerSessionStoryEdiModal,
};
