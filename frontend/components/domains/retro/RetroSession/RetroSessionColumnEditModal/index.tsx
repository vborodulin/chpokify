import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroTemplatesActionsTypes } from '@Redux/domains/retroTemplates/actionTypes';
import { retroTemplatesAsyncActions } from '@Redux/domains/retroTemplates/asyncActions';
import { retroTemplatesSelectors } from '@Redux/domains/retroTemplates/selectors';
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
}

const FORM_FIELDS: (keyof TFormData)[] = [
  'title',
];

type TRetroColumnEditModalProps = Partial<TModalProps> & {
  retroColumnId: TEntityID,
};

const RetroColumnEditModal = (props: TRetroColumnEditModalProps): React.ReactElement | null => {
  const {
    onClose,
    retroColumnId,
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
      isSubmitting,
    },
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [retroTemplatesActionsTypes.UPDATE_COLUMN_PENDING],
    FORM_FIELDS,
    setError
  );

  const curRetroSessionId = useSelector(retroSessionsSelectors.getCurrId);
  const curRetroTemplateId = useSelector(retroTemplatesSelectors.getCurrId);
  const column = useSelector(retroTemplatesSelectors.getColumnById)(retroColumnId);

  const onSubmit = async (data: TFormData) => {
    const { payload } = await dispatch(
      retroTemplatesAsyncActions.updateColumn(curRetroSessionId, curRetroTemplateId, retroColumnId, data)
    );

    if (!getIsRejectedActionPayload(payload) && onClose) {
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
        {t('pages.retro.editColumnModal.title')}
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
              placeholder={t('pages.retro.editColumnModal.titlePlaceholder')}
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
            {t('pages.retro.editColumnModal.cancelBtn')}
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || !dirty}
          >
            {t('pages.retro.editColumnModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  RetroColumnEditModal,
};
