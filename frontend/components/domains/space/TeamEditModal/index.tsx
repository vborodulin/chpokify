import { compact, flatten } from 'lodash';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { spacesActionsTypes } from '@Redux/domains/spaces/actionsTypes';
import { spacesAsyncActions } from '@Redux/domains/spaces/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { usersRepoSelectors } from '@Redux/domains/usersRepo/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppDispatch } from '@Redux/types';

import { FORM_FIELDS, TFormData } from '@components/domains/space/TeamEditForm';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { ClientError } from '@lib/errors';
import { log } from '@lib/logger';

import { Layout } from './Layout';

export type TTeamEditModalProps = {
  teamId: string;
  onClose: () => void;
  onRemove: () => void;
};

const TeamEditModal = (props: TTeamEditModalProps): React.ReactElement | null => {
  const {
    teamId,
    onClose,
  } = props;

  const dispatch = useDispatch<TAppDispatch>();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const team = useSelector(spacesSelectors.getCurrSpaceTeamById)(teamId);
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const spaceUsersWithParticipants = useSelector(
    usersRepoSelectors.getUsersInSpaceWithParticipants
  )(currSpaceId);

  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
    setValue,
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [spacesActionsTypes.TEAMS_UPDATE_PENDING],
    FORM_FIELDS,
    setError
  );

  const handleRemove = async () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.TEAM_REMOVE, {
      teamId: team?._id,
    }));
  };

  const onSubmit = async (data: TFormData) => {
    const enhancedData: TFormData = {
      name: data.name,
      participantsIds: flatten(compact([...new Set(data.participantsIds)])),
    };

    const { payload } = await dispatch(
      spacesAsyncActions.teamsUpdate(currSpaceId, teamId, enhancedData)
    );

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  if (!team) {
    log.error(new ClientError('team not found'));
    return <h1>Team not found</h1>;
  }

  return (
    <Layout
      canModerate={canModerate}
      spaceUsersWithParticipants={spaceUsersWithParticipants}
      teamParticipantsIds={team.participantsIds}
      formRefs={{
        name: register,
        participantsIds: register,
      }}
      defaultValues={{
        name: team?.name,
        participantsIds: undefined,
      }}
      errors={errors}
      errGlobalMsg={errGlobalMsg}
      hasChanges={formState.dirty}
      isLoading={formState.isSubmitting}
      onCancel={onClose}
      onSetValue={setValue}
      onRemove={handleRemove}
      onUpdate={handleSubmit(onSubmit)}
    />
  );
};

export {
  TeamEditModal,
};
