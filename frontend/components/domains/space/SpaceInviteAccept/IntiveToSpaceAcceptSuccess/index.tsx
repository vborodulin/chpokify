import { TInviteTokenPayload } from '@chpokify/models-types';
import { routing } from '@chpokify/routing';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';

import { spacesActionsTypes } from '@Redux/domains/spaces/actionsTypes';
import { spacesAsyncActions } from '@Redux/domains/spaces/asyncActions';
import { spacesOperations } from '@Redux/domains/spaces/operations';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppDispatch } from '@Redux/types';

import { FORM_FIELDS } from '@components/domains/auth/SignUp/Layout';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { Layout } from './Layout';

export type TInviteToSpaceAcceptSuccessProps = {
  invitePayload: TInviteTokenPayload
}

const InviteToSpaceAcceptSuccess = (props: TInviteToSpaceAcceptSuccessProps): React.ReactElement | null => {
  const {
    invitePayload,
  } = props;

  const { space, team } = invitePayload;

  const { query } = useRouter();
  const token = query.token as string;

  const dispatch = useDispatch<TAppDispatch>();

  const { isLoading, errGlobalMsg } = useAsyncActionInfo(
    [spacesActionsTypes.INVITE_ACCEPT_PENDING],
    FORM_FIELDS
  );

  const handleCancel = async () => {
    await dispatch(spacesOperations.redirectToCurrSpace());
  };

  const handleAccept = async () => {
    const { payload } = await dispatch(spacesAsyncActions.inviteAccept(
      space._id,
      { token }
    ));

    if (!getIsRejectedActionPayload(payload)) {
      await dispatch(spacesAsyncActions.mySpacesGet);

      await Router.push(
        routing.getSpaceUrlTemplate(),
        routing.getSpaceUrl(space._id)
      );
    }
  };

  return (
    <Layout
      space={space}
      team={team}
      errGlobalMsg={errGlobalMsg}
      isLoading={isLoading}
      onCancel={handleCancel}
      onAccept={handleAccept}
    />
  );
};

export {
  InviteToSpaceAcceptSuccess,
};
