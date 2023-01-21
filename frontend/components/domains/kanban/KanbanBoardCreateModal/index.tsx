import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { kanbanBoardActionsTypes } from '@Redux/domains/kanbanBoards/actionsTypes';
import { kanbanBoardAsyncActions } from '@Redux/domains/kanbanBoards/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
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

const FORM_ID = 'KanbanBoardCreateModal';

export type TFormData = {
  title: string,
}

const FORM_FIELDS: (keyof TFormData)[] = [
  'title',
];

export type TKanbanColumnAddModalProps = Partial<TModalProps> & {
  onClose: () => void
};

const KanbanBoardCreateModal = (props: TKanbanColumnAddModalProps): React.ReactElement | null => {
  const {
    onClose,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

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
    [kanbanBoardActionsTypes.CREATE_PENDING],
    FORM_FIELDS,
    setError
  );

  const dispatch = useAppDispatch();
  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const onSubmit = async (data: TFormData) => {
    const { payload } = await dispatch(
      kanbanBoardAsyncActions.create(currSpaceId, data)
    );

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  const renderHeader = () => (
    <PaperHeader>
      {t('kanbanBoardCreateModal.title')}
    </PaperHeader>
  );

  const renderContent = () => (
    <PaperContent>
      <fieldset>
        <FormControl
          errorMessage={errors.title?.message}
        >
          <Input
            inputRef={register}
            name="title"
            placeholder={t('kanbanBoardCreateModal.titlePlaceholder')}
          />
        </FormControl>
        <FormHelperText
          variant="negative"
        >
          {errGlobalMsg}
        </FormHelperText>
      </fieldset>
    </PaperContent>
  );

  const renderFooter = () => (
    <PaperFooter>
      <PaperActions>
        <Button
          onClick={onClose}
        >
          {t('kanbanBoardCreateModal.cancelBtn')}
        </Button>

        <Button
          variant="primary"
          type="submit"
          form={FORM_ID}
          onClick={handleSubmit(onSubmit)}
          disabled={!dirty}
        >
          {t('kanbanBoardCreateModal.submitBtn')}
        </Button>
      </PaperActions>
    </PaperFooter>
  );

  return (
    <Modal
      forwardedAs="form"
      onSubmit={handleSubmit(onSubmit)}
      {...other}
    >
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
    </Modal>
  );
};

export {
  KanbanBoardCreateModal,
};
