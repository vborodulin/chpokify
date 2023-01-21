import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { retroSessionsActionsTypes } from '@Redux/domains/retroSessions/actionsTypes';
import { retroSessionsAsyncActions } from '@Redux/domains/retroSessions/asyncActions';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroTemplatesSelectors } from '@Redux/domains/retroTemplates/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { CLASS_TEST, DATA_TEST_ID } from '@components/domains/core/types';
import { FORM_FIELDS, RetroSessionEditForm, TFormData } from '@components/domains/retro/RetroSessionEditForm';
import { Modal, TModalProps } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';
import { TRANS } from '@components/utils/types';

type TRetroSessionEditModal = Partial<TModalProps> & {
  retroSessionId: string;
  onClose: () => void;
}

const RETRO_SESSION_EDIT_MODAL_WIDTH = '400px';

const FORM_ID = 'RetroSessionEditModal';

const RetroSessionEditModal = (props: TRetroSessionEditModal): React.ReactElement | null => {
  const {
    retroSessionId,
    onClose,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const retroSession = useSelector(retroSessionsSelectors.getById)(retroSessionId);
  const retroSessionTemplate = useSelector(retroTemplatesSelectors.getById)(retroSession?.templateId);

  const {
    register,
    handleSubmit,
    errors,
    formState: {
      dirty,
      isSubmitting,
    },
    setError,
  } = useForm<TFormData>();

  const isDisabled = !dirty;
  const isLoading = isSubmitting;

  const { errGlobalMsg } = useAsyncActionInfo(
    [
      retroSessionsActionsTypes.UPDATE_PENDING,
    ],
    FORM_FIELDS,
    setError
  );

  const onSubmit = async (data: TFormData) => {
    if (!retroSession) {
      return;
    }

    const { payload } = await dispatch(
      retroSessionsAsyncActions.update(retroSession._id, data)
    );

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  if (!retroSession || !retroSessionTemplate) {
    return null;
  }

  return (
    <Modal
      data-test-id={DATA_TEST_ID.RETRO_SESSION_EDIT_MODAL}
      maxWidth={RETRO_SESSION_EDIT_MODAL_WIDTH}
      {...other}
    >
      <PaperHeader>
        {t('pages.retro.editSessionModal.title')}
      </PaperHeader>

      <PaperContent>
        <RetroSessionEditForm
          formRefs={{
            title: register,
            description: register,
          }}
          defaultValue={{
            title: retroSession.title,
            description: retroSession.description,
          }}
          errors={errors}
          errGlobalMsg={errGlobalMsg}
          isLoading={isLoading}
          templateType={retroSessionTemplate.type}
          formId={FORM_ID}
        />
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            data-test-id={DATA_TEST_ID.RETRO_SESSION_CREATE_MODAL_CANCEL_BTN}
            onClick={onClose}
          >
            {t('pages.retro.editSessionModal.cancelBtn')}
          </Button>

          <Button
            variant="primary"
            type="submit"
            className={CLASS_TEST.RETRO_SESSION_EDIT_MODAL_SUBMIT_BTN}
            onClick={handleSubmit(onSubmit)}
            disabled={isDisabled}
            isLoading={isLoading}
            form={FORM_ID}
          >
            {t('pages.retro.editSessionModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  RetroSessionEditModal,
};
