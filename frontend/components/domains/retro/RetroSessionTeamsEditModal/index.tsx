import { TEntityID } from '@chpokify/models-types';
import { routing } from '@chpokify/routing';
import { compact } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { retroSessionsActionsTypes } from '@Redux/domains/retroSessions/actionsTypes';
import { retroSessionsAsyncActions } from '@Redux/domains/retroSessions/asyncActions';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { DATA_TEST_ID } from '@components/domains/core/types';
import { FORM_FIELDS, RetroSessionTeamEditForm, TFormData } from '@components/domains/retro/RetroSessionTeamsEditForm';
import { Modal, TModalProps } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { Divider } from '@components/uiKit/Divider';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';
import { useOnce } from '@components/utils/hooks/useOnce';
import { TRANS } from '@components/utils/types';

export type TPokerSessionTeamsEditModalProps = Partial<TModalProps> & {
  onClose: () => void;
  retroSessionId: TEntityID;
  teamId?: TEntityID;
  lastRetroSessionId?: TEntityID;
  onSuccess?: () => void;
};

const RetroSessionTeamsEditModal = (props: TPokerSessionTeamsEditModalProps): React.ReactElement | null => {
  const {
    retroSessionId,
    lastRetroSessionId,
    teamId,
    onClose,
    onSuccess,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const retroSession = useSelector(retroSessionsSelectors.getById)(retroSessionId);
  const lastRetroSession = useSelector(retroSessionsSelectors.getById)(lastRetroSessionId);
  const spaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const teams = useSelector(spacesSelectors.getCurrTeams);

  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [retroSessionsActionsTypes.UPDATE_PENDING],
    FORM_FIELDS,
    setError
  );

  const getDefaultTeamsIds = (): string[] => {
    if (!retroSession) {
      return [];
    }

    const teamsIds = retroSession.teamsIds.map((id) => id.toString());

    if (lastRetroSession?.teamsIds.length) {
      const teamsIdsFromLastPoker = lastRetroSession.teamsIds.map((id) => id.toString());
      teamsIds.push(...teamsIdsFromLastPoker);
    }

    if (teamId) {
      teamsIds.push(teamId.toString());
    }

    return teamsIds;
  };

  const defaultTeamsIds = getDefaultTeamsIds();

  const isLoading = formState.isSubmitting;
  const hasChanges = formState.dirty || defaultTeamsIds.length > 0;

  const onSetTeamIdAndRedirect = async (newTeamId: TEntityID) => {
    // Now redirect to retroSession
    const teamsIds = [newTeamId];

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

  useOnce(
    () => !teams.length,
    () => {
      dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.TEAM_CREATE, {
        onSuccess: (newTeamId: TEntityID) => onSetTeamIdAndRedirect(newTeamId),
      }));
    },
    [teams.length]
  );

  const enhanceData = (data: TFormData): TFormData => {
    const {
      teamsIds,
    } = data;

    return {
      teamsIds: compact(teamsIds),
    };
  };

  const onSubmit = async (data: TFormData) => {
    const sendData = enhanceData(data);
    const { payload } = await dispatch(
      retroSessionsAsyncActions.update(retroSessionId, sendData)
    );

    if (!getIsRejectedActionPayload(payload)) {
      onClose();

      if (onSuccess) {
        onSuccess();
        return;
      }

      router.push(
        routing.getRetroSessionUrlTemplate(),
        routing.getRetroSessionUrl(spaceId, payload.retroSession._id)
      );
    }
  };

  return (
    <Modal
      data-test-id={DATA_TEST_ID.RETRO_SESSION_TEAMS_EDIT_MODAL}
      {...other}
    >
      <PaperHeader>
        {t('pages.retro.retroSessionEditTeamsModal.title')}
      </PaperHeader>

      <PaperContent>
        <RetroSessionTeamEditForm
          teams={teams}
          formRefs={{
            teamsIds: register,
          }}
          defaultValue={{
            teamsIds: defaultTeamsIds,
          }}
          errors={errors}
          errGlobalMsg={errGlobalMsg}
          isLoading={isLoading}
          hasChanges={hasChanges}
        />
      </PaperContent>

      <PaperFooter>
        <Divider
          mb={6}
        />
        <PaperActions>
          {
            !onSuccess
            && (
            <Button
              onClick={onClose}
            >
              {t('pages.retro.retroSessionEditTeamsModal.cancelBtn')}
            </Button>
            )
          }
          <Button
            data-test-id={DATA_TEST_ID.RETRO_SESSION_TEAMS_EDIT_MODAL_SUBMIT_BTN}
            type="submit"
            variant="primary"
            disabled={isLoading || !hasChanges}
            onClick={handleSubmit(onSubmit)}
          >
            {
              onSuccess ? t('pages.retro.retroSessionEditTeamsModal.saveBtn')
                : t('pages.retro.retroSessionEditTeamsModal.submitBtn')
            }

          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  RetroSessionTeamsEditModal,
};
