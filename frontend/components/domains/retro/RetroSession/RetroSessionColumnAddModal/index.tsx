import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroSessionsRelationsAsyncActions } from '@Redux/domains/retroSessionsRelations/asyncActions';
import { retroTemplatesActionsTypes } from '@Redux/domains/retroTemplates/actionTypes';
import { retroTemplatesAsyncActions } from '@Redux/domains/retroTemplates/asyncActions';
import { retroTemplatesSelectors } from '@Redux/domains/retroTemplates/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Modal, TModalProps } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { FormLabel } from '@components/uiKit/FormLabel';
import { Input } from '@components/uiKit/Input';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';
import { TRANS } from '@components/utils/types';

export type TFormData = {
  title: string,
}

const FORM_FIELDS: (keyof TFormData)[] = [
  'title',
];

export type TKanbanColumnAddModalProps = Partial<TModalProps> & {
  onClose: () => void;
};

const RetroSessionColumnAddModal = (props: TKanbanColumnAddModalProps): React.ReactElement | null => {
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
    [retroTemplatesActionsTypes.CREATE_COLUMN_PENDING],
    FORM_FIELDS,
    setError
  );

  const dispatch = useAppDispatch();

  const currRetroSessionId = useSelector(retroSessionsSelectors.getCurrId);
  const currTemplateId = useSelector(retroTemplatesSelectors.getCurrId);

  const onSubmit = async (data: TFormData) => {
    const { payload } = await dispatch(
      retroTemplatesAsyncActions.createColumn(currRetroSessionId, currTemplateId, data)
    );

    if (!getIsRejectedActionPayload(payload)) {
      dispatch(retroSessionsRelationsAsyncActions.getList(currRetroSessionId, currTemplateId));
      onClose();
    }
  };

  return (
    <Modal
      forwardedAs="form"
      onSubmit={handleSubmit(onSubmit)}
      {...other}
    >
      <PaperHeader>
        {t('pages.retro.createNewColumnModal.title')}
      </PaperHeader>

      <PaperContent>
        <fieldset>
          <FormControl
            errorMessage={errors.title?.message}
          >
            <FormLabel>
              {t('pages.retro.createNewColumnModal.nameLabel')}
            </FormLabel>

            <Input
              inputRef={register}
              name="title"
              placeholder={t('pages.retro.createNewColumnModal.titlePlaceholder')}
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
            {t('pages.retro.createNewColumnModal.cancelBtn')}
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={!dirty}
          >
            {t('pages.retro.createNewColumnModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  RetroSessionColumnAddModal,
};
