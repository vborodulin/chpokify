import { TEntityID } from '@chpokify/models-types';
import { ObjectID } from 'bson';
import compact from 'lodash/compact';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { spacesActionsTypes } from '@Redux/domains/spaces/actionsTypes';
import { spacesAsyncActions } from '@Redux/domains/spaces/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { usersRepoSelectors } from '@Redux/domains/usersRepo/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { FORM_FIELDS, TFormData } from '@components/domains/space/TeamEditForm';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { Layout } from './Layout';

type TCreateTeamModalProps = {
  onClose: () => void;
  onSuccess?: (teamId: TEntityID) => Promise<void>;
  forwardedRef: React.Ref<any>;
};

const CreateTeamModal = (props: TCreateTeamModalProps): React.ReactElement | null => {
  const {
    onClose,
    onSuccess,
  } = props;

  const dispatch = useAppDispatch();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);

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
    [spacesActionsTypes.TEAMS_CREATE_PENDING],
    FORM_FIELDS,
    setError
  );

  const onSubmit = async (data: TFormData) => {
    const teamId = new ObjectID() as TEntityID;

    const { payload } = await dispatch(spacesAsyncActions.teamsCreate(currSpaceId, {
      ...data,
      _id: teamId,
      participantsIds: compact(data.participantsIds),
    }));

    if (!getIsRejectedActionPayload(payload)) {
      onClose();

      if (onSuccess) {
        await onSuccess(teamId);
      }
    }
  };

  return (
    <Layout
      spaceUsersWithParticipants={spaceUsersWithParticipants}
      formRefs={{
        name: register,
        participantsIds: register,
      }}

      errors={errors}
      errGlobalMsg={errGlobalMsg}
      hasChanges={formState.dirty}
      isLoading={formState.isSubmitting}
      onSetValue={setValue}
      onCancel={onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export {
  CreateTeamModal,
};
