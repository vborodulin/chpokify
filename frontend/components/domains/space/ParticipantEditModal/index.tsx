import { isEqualsId } from '@chpokify/helpers';
import { SPACE_PARTICIPANT_ROLE, TEntityID } from '@chpokify/models-types';
import { log } from 'lib/logger';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { spacesActionsTypes } from '@Redux/domains/spaces/actionsTypes';
import { spacesAsyncActions } from '@Redux/domains/spaces/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { usersSelectors } from '@Redux/domains/users/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppDispatch } from '@Redux/types';

import { TModalProps } from '@components/domains/shared/Modal';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { ClientError } from '@lib/errors';

import { Layout, TFormData } from './Layout';

export type TParticipantEditModalProps = Partial<TModalProps> & {
  userId: TEntityID;
  participantId: TEntityID;
  onClose: () => void;
  onSuccess?: () => void;
};

const UserEditModal = (props: TParticipantEditModalProps): React.ReactElement | null => {
  const {
    userId,
    participantId,
    onClose,
    onSuccess,
    ...other
  } = props;

  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [spacesActionsTypes.PARTICIPANT_UPDATE_TEAMS_PENDING],
    ['name', 'teamsIds'],
    setError
  );

  const dispatch = useDispatch<TAppDispatch>();

  const currUserId = useSelector(authSelectors.getCurrUserId);
  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const participant = useSelector(spacesSelectors.getParticipant)(
    currSpaceId,
    userId
  );
  const user = useSelector(usersSelectors.getById)(userId);
  const allTeams = useSelector(spacesSelectors.getCurrTeams);

  const [teams, setTeams] = useState(allTeams);

  const enhancedData = () => ({
    teamsIds: teams.filter((team) => team.participantsIds.includes(participantId)).map((team) => team._id),
  });

  const handleAddParticipant = (teamId: string) => {
    const newTeams = teams.map((team) => {
      if (isEqualsId(team._id, teamId)) {
        return {
          ...team,
          participantsIds: team.participantsIds.concat(participantId),
        };
      }

      return team;
    });
    setTeams(newTeams);
  };

  const handleDeleteParticipant = (teamId: string) => {
    const newTeams = teams.map((team) => {
      if (isEqualsId(team._id, teamId)) {
        return {
          ...team,
          participantsIds: team.participantsIds
            .filter((id) => !isEqualsId(id, participantId)),
        };
      }

      return team;
    });

    setTeams(newTeams);
  };

  const handleChangeTeams = (e: React.ChangeEvent<HTMLInputElement>, teamId: string) => {
    const { checked } = e.target;

    if (!checked) {
      handleDeleteParticipant(teamId);
      return;
    }

    handleAddParticipant(teamId);
  };

  const handleRemove = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.USER_REMOVE, {
      participantId,
    }));
  };

  const handleClose = () => {
    onClose();

    if (onSuccess) {
      onSuccess();
    }
  };

  const onSubmit = async () => {
    if (!participant) {
      return;
    }

    const sendData = enhancedData();

    const { payload } = await dispatch(
      spacesAsyncActions.participantTeamsUpdate(currSpaceId, participantId, sendData)
    );

    if (!getIsRejectedActionPayload(payload)) {
      handleClose();
    }
  };

  const handleToggleAdminRole = async () => {
    if (!participant || user.isGuest) {
      return;
    }

    const hasAdminRole = participant.role === SPACE_PARTICIPANT_ROLE.ADMIN;

    await dispatch(spacesAsyncActions.participantSetAdminRole(
      currSpaceId,
      participantId,
      {
        isAdmin: !hasAdminRole,
      }
    ));
  };

  if (!participant) {
    log.error(new ClientError(`participant not found, participantId: ${participantId}`));
    return null;
  }

  if (!user) {
    log.error(new ClientError(`user not found, userId: ${userId}`));
    return null;
  }

  return (
    <Layout
      errors={errors}
      hasChanges={formState.dirty}
      isLoading={formState.isSubmitting}
      errGlobalMsg={errGlobalMsg}
      teams={teams}
      participant={participant}
      isGuest={!!user.isGuest}
      isMe={isEqualsId(currUserId, userId)}
      defaultValues={{
        username: user.username,
        email: user.email,
        teamsIds: undefined,
      }}
      formRefs={{
        teamsIds: register,
        username: register,
        email: register,
      }}
      onChangeTeams={handleChangeTeams}
      onCancel={handleClose}
      onRemove={handleRemove}
      onToggleAdminRole={handleToggleAdminRole}
      onSubmit={handleSubmit(onSubmit)}
      {...other}
    />
  );
};

export {
  UserEditModal,
};
