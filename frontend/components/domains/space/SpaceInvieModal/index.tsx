import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { spacesActionsTypes } from '@Redux/domains/spaces/actionsTypes';
import { spacesAsyncActions } from '@Redux/domains/spaces/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { TSelectOption } from '@components/uiKit/Select';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { FORM_FIELDS, Layout, TFormData } from './Layout';

const SpaceInviteModal = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();
  const spaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const teams = useSelector(spacesSelectors.getCurrTeams);

  const [isShowTeams, setIsShowTeams] = useState<boolean>(false);
  const [sentEmail, setSentEmail] = useState<string>('');

  const {
    register, handleSubmit, errors, setError, formState, reset,
  } = useForm<TFormData>();

  const { errGlobalMsg, isFulfilled } = useAsyncActionInfo(
    [
      spacesActionsTypes.INVITE_SEND_EMAIL_PENDING,
    ],
    FORM_FIELDS,
    setError
  );

  const getTeamsOptions = (): TSelectOption[] => teams.map((team) => ({
    label: team.name,
    value: team._id.toString(),
  }));

  const handleToggleShowTeams = () => {
    setIsShowTeams((prevVal) => !prevVal);
  };

  const handleSendInvite = async (data: TFormData) => {
    setSentEmail('');

    const res = await dispatch(spacesAsyncActions.inviteSendEmail(
      spaceId,
      data
    ));

    if (!getIsRejectedActionPayload(res.payload)) {
      setSentEmail(data.email);

      reset({
        email: '',
      }, {
        isSubmitted: true,
      });
    }
  };

  return (
    <Layout
      formRefs={{
        email: register,
        teamId: register,
      }}
      isLoading={formState.isSubmitting}
      hasChanges={formState.dirty}
      errGlobalMsg={errGlobalMsg}
      errors={errors}
      teamsOptions={getTeamsOptions()}
      isShowTeams={isShowTeams}
      isEmailSent={isFulfilled && !Object.keys(formState.touched).length}
      sentEmail={sentEmail}
      onToggleShowTeams={handleToggleShowTeams}
      onSendInvite={handleSubmit(handleSendInvite)}
    />
  );
};

export {
  SpaceInviteModal,
};
