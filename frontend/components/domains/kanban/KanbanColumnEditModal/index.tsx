import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { asyncPendingSelectors } from '@Redux/domains/asyncInfo/pending/selectors';
import { kanbanBoardActionsTypes } from '@Redux/domains/kanbanBoards/actionsTypes';
import { kanbanBoardAsyncActions } from '@Redux/domains/kanbanBoards/asyncActions';
import { kanbanBoardsSelectors } from '@Redux/domains/kanbanBoards/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { Input } from '@components/uiKit/Input';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';
import { TRANS } from '@components/utils/types';

type TFormData = {
  title: string,
}

const FORM_FIELDS: (keyof TFormData)[] = [
  'title',
];

type KanbanColumnEditModalProps = {
  onClose: () => void;
  kanbanBoardId: TEntityID,
  kanbanColumnId: TEntityID,
  spaceId: TEntityID,
};

const KanbanColumnEditModal = (props: KanbanColumnEditModalProps): React.ReactElement | null => {
  const {
    onClose,
    kanbanBoardId,
    kanbanColumnId,
    spaceId,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

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
    [kanbanBoardActionsTypes.UPDATE_COLUMN_PENDING],
    FORM_FIELDS,
    setError
  );

  const column = useSelector(kanbanBoardsSelectors.getColumnById)(kanbanColumnId);

  const isLoading = useSelector(asyncPendingSelectors.createPendingSelector)([
    kanbanBoardActionsTypes.UPDATE_COLUMN_PENDING,
  ]);

  const onSubmit = async (data: TFormData) => {
    const { payload } = await dispatch(
      kanbanBoardAsyncActions.updateColumn(spaceId, kanbanBoardId, kanbanColumnId, { title: data.title })
    );

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  if (!column) {
    return null;
  }

  return (
    <Modal
      forwardedAs="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <PaperHeader>
        {t('kanbanColumnEditModal.title')}
      </PaperHeader>

      <PaperContent>
        <fieldset>
          <FormControl
            errorMessage={errors.title?.message}
          >
            <Input
              inputRef={register}
              name="title"
              defaultValue={column.title}
              placeholder={t('kanbanColumnEditModal.namePlaceholder')}
            />
          </FormControl>
          <FormHelperText
            variant="negative"
          >
            {errGlobalMsg}
          </FormHelperText>
        </fieldset>
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onClose}
          >
            {t('kanbanColumnEditModal.cancelBtn')}
          </Button>

          <Button
            variant="primary"
            disabled={isLoading || !dirty}
            onClick={handleSubmit(onSubmit)}
          >
            {t('kanbanColumnEditModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  KanbanColumnEditModal,
};
