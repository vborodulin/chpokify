import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { asyncPendingSelectors } from '@Redux/domains/asyncInfo/pending/selectors';
import { storiesActionsTypes } from '@Redux/domains/stories/actionsTypes';
import { storiesAsyncActions } from '@Redux/domains/stories/asyncActions';
import { storiesSelectors } from '@Redux/domains/stories/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Modal, TModalProps } from '@components/domains/shared/Modal';

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
  description: string,
}

const FORM_FIELDS: (keyof TFormData)[] = [
  'title',
  'description',
];

type KanbanTaskEditModalProps = TModalProps & {
  onClose: () => void;
  kanbanTaskId: TEntityID,
  spaceId: TEntityID,
};

const KanbanTaskEditModal = (props: KanbanTaskEditModalProps): React.ReactElement | null => {
  const {
    onClose,
    kanbanTaskId,
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
    [storiesActionsTypes.UPDATE_FOR_KANBAN_PENDING],
    FORM_FIELDS,
    setError
  );

  const task = useSelector(storiesSelectors.getById)(kanbanTaskId);
  const isLoading = useSelector(asyncPendingSelectors.createPendingSelector)([
    storiesActionsTypes.UPDATE_FOR_KANBAN_PENDING,
  ]);

  const enhanceData = (data: TFormData) => ({
    title: data.title,
    description: data.description,
  });

  const onSubmit = async (data: TFormData) => {
    const sendData = enhanceData(data);
    const { payload } = await dispatch(
      storiesAsyncActions.update(spaceId, kanbanTaskId, sendData)
    );

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  if (!task) {
    return null;
  }

  return (
    <Modal
      forwardedAs="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <PaperHeader>
        {t('kanbanTaskEditModal.title')}
      </PaperHeader>

      <PaperContent>
        <fieldset>
          <FormControl
            errorMessage={errors.title?.message}
          >
            <Input
              inputRef={register}
              name="title"
              defaultValue={task.title}
              placeholder={t('kanbanTaskEditModal.titlePlaceholder')}
            />
          </FormControl>
          <FormControl
            errorMessage={errors.description?.message}
          >
            <Input
              inputRef={register}
              name="description"
              defaultValue={task.description}
              placeholder={t('kanbanTaskEditModal.descriptionPlaceholder')}
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
            {t('kanbanTaskEditModal.cancelBtn')}
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || !dirty}
            onClick={handleSubmit(onSubmit)}
          >
            {t('kanbanTaskEditModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  KanbanTaskEditModal,
};
