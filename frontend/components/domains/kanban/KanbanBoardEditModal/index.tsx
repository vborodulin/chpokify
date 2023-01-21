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

type KanbanBoardEditModalProps = {
  onClose: () => void;
  boardId: TEntityID,
  spaceId:TEntityID
};

const KanbanBoardEditModal = (props: KanbanBoardEditModalProps): React.ReactElement | null => {
  const {
    onClose,
    boardId,
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
    [kanbanBoardActionsTypes.UPDATE_PENDING],
    FORM_FIELDS,
    setError
  );

  const boardTitle = useSelector(kanbanBoardsSelectors.getBoardTitle)(boardId);
  const isLoading = useSelector(asyncPendingSelectors.createPendingSelector)([
    kanbanBoardActionsTypes.UPDATE_PENDING,
  ]);

  const onSubmit = async (data: TFormData) => {
    const { payload } = await dispatch(
      kanbanBoardAsyncActions.update(spaceId, boardId, { title: data.title })
    );

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  return (
    <Modal
      forwardedAs="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <PaperHeader>
        {t('kanbanBoardEditModal.title')}
      </PaperHeader>

      <PaperContent>
        <fieldset>
          <FormControl
            errorMessage={errors.title?.message}
          >
            <Input
              inputRef={register}
              name="title"
              defaultValue={boardTitle}
              placeholder={t('kanbanBoardEditModal.namePlaceholder')}
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
            {t('kanbanBoardEditModal.cancelBtn')}
          </Button>

          <Button
            variant="primary"
            disabled={isLoading || !dirty}
            onClick={handleSubmit(onSubmit)}
          >
            {t('kanbanBoardEditModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  KanbanBoardEditModal,
};
