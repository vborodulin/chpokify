import { RETRO_TEMPLATE_TYPE, TEntityID } from '@chpokify/models-types';
import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { retroSessionsActionsTypes } from '@Redux/domains/retroSessions/actionsTypes';
import { retroSessionsAsyncActions } from '@Redux/domains/retroSessions/asyncActions';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroTemplatesSelectors } from '@Redux/domains/retroTemplates/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { CLASS_TEST, DATA_TEST_ID } from '@components/domains/core/types';
import { FORM_FIELDS, RetroSessionEditForm, TFormData } from '@components/domains/retro/RetroSessionEditForm';
import { Modal, TModalProps } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { Divider } from '@components/uiKit/Divider';
import { IconRetro } from '@components/uiKit/Icons';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';
import { TRANS } from '@components/utils/types';

type TRetroSessionCreateModal = Partial<TModalProps> & {
  title?: string;
  onClose: () => void;
}

const RETRO_SESSION_CREATE_MODAL_WIDTH = '680px';

const FORM_ID = 'RetroSessionCreateModal';

const RetroSessionCreateModal = (props: TRetroSessionCreateModal): React.ReactElement | null => {
  const {
    title,
    onClose,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const lastRetroSessionId = useSelector(retroSessionsSelectors.getLastEntityId);
  const lastEntityTemplateId = useSelector(retroSessionsSelectors.getLastEntityTemplateId);
  const lastTemplate = useSelector(retroTemplatesSelectors.getById)(lastEntityTemplateId);
  const spaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const teams = useSelector(spacesSelectors.getCurrTeams);

  const {
    register,
    handleSubmit,
    errors,
    formState: {
      dirtyFields,
      isSubmitting,
    },
    setError,
  } = useForm<TFormData>();

  const [templateType, setTemplateType] = useState<RETRO_TEMPLATE_TYPE | undefined>(lastTemplate?.type);

  const isDisabled = ((!dirtyFields.has('title') && !title) || !templateType);
  const isLoading = isSubmitting;

  const { errGlobalMsg } = useAsyncActionInfo(
    [
      retroSessionsActionsTypes.CREATE_PENDING,
    ],
    FORM_FIELDS,
    setError
  );

  const handleChooseTemplate = (type: RETRO_TEMPLATE_TYPE) => {
    setTemplateType(type);
  };

  const enhanceData = (data: TFormData, typeTemplate: RETRO_TEMPLATE_TYPE) => ({
    ...data,
    templateType: typeTemplate,
    spaceId: currSpaceId,
  });

  const onSetTeamIdAndRedirect = async (retroSessionId: TEntityID) => {
    const teamsIds = teams.map((team) => team._id);

    const { payload } = await dispatch(
      retroSessionsAsyncActions.update(retroSessionId, { teamsIds })
    );

    if (!getIsRejectedActionPayload(payload)) {
      await router.push(
        routing.getRetroSessionUrlTemplate(),
        routing.getRetroSessionUrl(spaceId, payload.retroSession._id)
      );
      onClose();
    }
  };

  const onSubmit = async (data: TFormData) => {
    if (!templateType) {
      return;
    }

    const sendData = enhanceData(data, templateType);
    const { payload } = await dispatch(
      retroSessionsAsyncActions.create(sendData)
    );

    if (!getIsRejectedActionPayload(payload)) {
      const { retroSession } = payload;

      if (teams.length === 1) {
        return onSetTeamIdAndRedirect(retroSession._id);
      }

      dispatch(retroSessionsAsyncActions.getCountAll(currSpaceId));

      dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_SESSION_EDIT_TEAMS, {
        retroSessionId: payload.retroSession._id,
        lastRetroSessionId,
      }));
    }
  };

  return (
    <Modal
      data-test-id={DATA_TEST_ID.RETRO_SESSION_CREATE_MODAL}
      maxWidth={RETRO_SESSION_CREATE_MODAL_WIDTH}
      {...other}
    >
      <PaperHeader>
        {t('pages.retro.createNewSessionModal.title')}
      </PaperHeader>

      <PaperContent>
        <RetroSessionEditForm
          formRefs={{
            title: register,
            description: register,
          }}
          defaultValue={{
            title,
          }}
          errors={errors}
          errGlobalMsg={errGlobalMsg}
          isLoading={isLoading}
          onChooseTemplate={handleChooseTemplate}
          templateType={templateType}
          formId={FORM_ID}
          hasEdit
        />
      </PaperContent>

      <PaperFooter>
        <Divider
          mb={6}
        />
        <PaperActions>
          <Button
            data-test-id={DATA_TEST_ID.RETRO_SESSION_CREATE_MODAL_CANCEL_BTN}
            onClick={onClose}
          >
            {t('pages.retro.createNewSessionModal.cancelBtn')}
          </Button>

          <Button
            StartIcon={IconRetro}
            variant="primary"
            type="submit"
            className={CLASS_TEST.RETRO_SESSION_CREATE_MODAL_SUBMIT_BTN}
            onClick={handleSubmit(onSubmit)}
            disabled={isDisabled}
            isLoading={isLoading}
            form={FORM_ID}
          >
            {t('pages.retro.createNewSessionModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  RetroSessionCreateModal,
};
