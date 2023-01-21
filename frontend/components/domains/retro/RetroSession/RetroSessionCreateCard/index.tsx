import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroSessionsRelationsActionsTypes } from '@Redux/domains/retroSessionsRelations/actionsTypes';
import { retroSessionsRelationsAsyncActions } from '@Redux/domains/retroSessionsRelations/asyncActions';
import { retroTemplatesSelectors } from '@Redux/domains/retroTemplates/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiSelectors } from '@Redux/domains/ui/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Layout } from '@components/domains/retro/RetroSession/RetroSessionCreateCard/Layout';

import { TBoxProps } from '@components/uiKit/Box';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

export type TFormData = {
  title: string,
  description: string,
}

const FORM_ID = 'RetroSessionCreateCard';

const FORM_FIELDS: (keyof TFormData)[] = [
  'title',
  'description',
];

export type TLayoutProps = Omit<TBoxProps, 'onSubmit'> & {
  columnId: TEntityID;
  popperId: string;
  isColumnAction?: boolean;
  isTopCreateCard?: boolean;
};

const RetroSessionCreateCard = (props: TLayoutProps): React.ReactElement | null => {
  const {
    columnId,
    popperId,
    isTopCreateCard,
    isColumnAction,
    ...other
  } = props;

  const popperIsOpen = useSelector(uiSelectors.getPopperIsOpen)(popperId);

  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState: {
      dirtyFields,
    },
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [retroSessionsRelationsActionsTypes.CREATE_CARD_PENDING],
    FORM_FIELDS,
    setError
  );

  const dispatch = useAppDispatch();

  const spaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const retroSessionId = useSelector(retroSessionsSelectors.getCurrId);
  const templateId = useSelector(retroTemplatesSelectors.getCurrId);
  const column = useSelector(retroTemplatesSelectors.getColumnById)(columnId);

  const handleClose = () => {
    dispatch(uiActions.popperHide(popperId));
  };

  const enhanceData = (data: TFormData) => ({
    ...data,
    columnId,
    spaceId: spaceId.toString(),
    isTopCreate: !!isTopCreateCard,
  });

  const onSubmit = async (data: TFormData) => {
    if (!retroSessionId || !templateId || !column) {
      return;
    }

    const sendData = enhanceData(data);

    const { payload } = await dispatch(
      retroSessionsRelationsAsyncActions.createCard(
        retroSessionId,
        templateId,
        sendData
      )
    );

    if (!getIsRejectedActionPayload(payload)) {
      handleClose();
    }
  };

  if (!popperIsOpen) {
    return null;
  }

  return (
    <Layout
      isDirty={dirtyFields.has('title')}
      formId={FORM_ID}
      isColumnAction={!!isColumnAction}
      errGlobalMsg={errGlobalMsg}
      errors={errors}
      formRefs={{
        title: register,
        description: register,
      }}
      onCancel={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      {...other}
    />
  );
};

export {
  RetroSessionCreateCard,
};
