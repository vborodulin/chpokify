import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { kanbanBoardRelationsAsyncActions } from '@Redux/domains/kanbanBoardRelations/asyncActions';
import { kanbanBoardActionsTypes } from '@Redux/domains/kanbanBoards/actionsTypes';
import { kanbanBoardAsyncActions } from '@Redux/domains/kanbanBoards/asyncActions';
import { kanbanBoardsSelectors } from '@Redux/domains/kanbanBoards/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { Layout } from './Layout';

const FORM_ID = 'KanbanColumnAddModal';

export type TFormData = {
    title: string,
}

const FORM_FIELDS: (keyof TFormData)[] = [
  'title',
];
export type TKanbanColumnAddModalProps = {
    onClose: () => void
};

const KanbanColumnAddModal = (props: TKanbanColumnAddModalProps): React.ReactElement | null => {
  const {
    onClose,
    ...other
  } = props;
  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState: {
      dirty,
    },
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [kanbanBoardActionsTypes.CREATE_COLUMN_PENDING],
    FORM_FIELDS,
    setError
  );

  const dispatch = useAppDispatch();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const currKanbanBoardId = useSelector(kanbanBoardsSelectors.getCurrBoardId);

  const onSubmit = async (data: TFormData) => {
    const { payload } = await dispatch(
      kanbanBoardAsyncActions.createColumn(currSpaceId, currKanbanBoardId, data)
    );

    if (!getIsRejectedActionPayload(payload)) {
      dispatch(kanbanBoardRelationsAsyncActions.getList(currSpaceId, currKanbanBoardId));
      onClose();
    }
  };

  return (
    <Layout
      errors={errors}
      formId={FORM_ID}
      errGlobalMsg={errGlobalMsg}
      register={register}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={!dirty}
      {...other}
    />
  );
};

export {
  KanbanColumnAddModal,
};
