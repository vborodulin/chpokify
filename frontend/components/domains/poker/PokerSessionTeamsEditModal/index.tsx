import { TEntityID } from '@chpokify/models-types';
import { compact } from 'lodash';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { pokerSessionsActionsTypes } from '@Redux/domains/pokerSessions/actionTypes';
import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiSelectors } from '@Redux/domains/ui/selectors';
import { uiTypes } from '@Redux/domains/ui/types';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { TModalProps } from '@components/domains/shared/Modal';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { FORM_FIELDS, Layout, TFormData } from './Layout';

export type TPokerSessionTeamsEditModalProps = Partial<TModalProps> & {
  onClose: () => void;
  pokerSessionId: TEntityID;
  teamId?: TEntityID;
  isCreateSession?: boolean;
  lastPokerSessionId?: TEntityID;
};

const PokerSessionTeamsEditModal = (props: TPokerSessionTeamsEditModalProps): React.ReactElement | null => {
  const {
    pokerSessionId,
    lastPokerSessionId,
    teamId,
    onClose,
    isCreateSession,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const pokerSession = useSelector(pokerSessionsSelectors.getById)(
    pokerSessionId
  );
  const lastPokerSession = useSelector(pokerSessionsSelectors.getById)(
    lastPokerSessionId
  );
  const teams = useSelector(spacesSelectors.getCurrTeams);
  const isSpaceOnboardingOpen = useSelector(uiSelectors.getIsSpaceOnboardingOpen);

  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [pokerSessionsActionsTypes.UPDATE_PENDING],
    FORM_FIELDS,
    setError
  );

  const openModalTeamsEdit = (newTeamId?: TEntityID) => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_TEAMS_EDIT, {
      pokerSessionId,
      teamId: newTeamId,
      isCreateSession: true,
    }));
  };

  useEffect(() => {
    if (!teams.length) {
      dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.TEAM_CREATE, {
        onSuccess: (newTeamId: TEntityID) => openModalTeamsEdit(newTeamId),
      }));
    }
  }, [teams.length]);

  const getDefaultTeamsIds = (): string[] => {
    if (!pokerSession) {
      return [];
    }

    const teamsIds = pokerSession.teamsIds.map((id) => id.toString());

    if (lastPokerSession?.teamsIds) {
      const teamsIdsFromLastPoker = lastPokerSession.teamsIds.map((id) => id.toString());
      teamsIds.push(...teamsIdsFromLastPoker);
    }

    if (teamId) {
      teamsIds.push(teamId.toString());
    }

    return teamsIds;
  };

  const defaultTeamsIds = getDefaultTeamsIds();

  const handleSuccess = (data: TFormData) => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_INVITE, {
      pokerSessionId,
      teamIds: data.teamsIds,
    }));
  };

  const enhanceData = (data: TFormData): TFormData => {
    const {
      teamsIds,
      ...otherData
    } = data;

    return {
      teamsIds: compact(teamsIds),
      ...otherData,
    };
  };

  const onSubmit = async (data: TFormData) => {
    const sendData = enhanceData(data);
    const { payload } = await dispatch(
      pokerSessionsAsyncActions.update(pokerSessionId, sendData)
    );

    if (!getIsRejectedActionPayload(payload)) {
      if (isCreateSession) {
        handleSuccess(sendData);
      } else {
        onClose();
      }
    }
  };

  return (
    <Layout
      teams={teams}
      formRefs={{
        teamsIds: register,
      }}
      defaultValue={{
        teamsIds: defaultTeamsIds,
      }}
      errors={errors}
      errGlobalMsg={errGlobalMsg}
      isLoading={formState.isSubmitting}
      hasChanges={formState.dirty || defaultTeamsIds.length > 0}
      isCreateSession={!!isCreateSession}
      onCancel={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isSpaceOnboardingOpen={isSpaceOnboardingOpen}
      onOpenModalTeamsEdit={openModalTeamsEdit}
      {...other}
    />
  );
};

export {
  PokerSessionTeamsEditModal,
};
