import { routing } from '@chpokify/routing';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { spacesActionsTypes } from '@Redux/domains/spaces/actionsTypes';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';

import { FORM_FIELDS } from '@components/domains/auth/SignUp/Layout';

import { CircularProgress } from '@components/uiKit/CircularProgress';
import { ContentCenter } from '@components/uiKit/ContentCenter';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { InviteToSpaceAcceptSuccess } from './IntiveToSpaceAcceptSuccess';
import { InviteToSpaceAcceptFail } from './InviteToSpaceAcceptFail';

const InviteToSpaceAccept = (): React.ReactElement | null => {
  const router = useRouter();

  const inviteTokenPayload = useSelector(spacesSelectors.getInviteTokenPayload);
  const currUserId = useSelector(authSelectors.getCurrUserId);

  const { errGlobalMsg } = useAsyncActionInfo(
    [spacesActionsTypes.INVITE_TOKEN_VALIDATE_PENDING],
    FORM_FIELDS
  );

  useEffect(() => {
    if (!currUserId && !errGlobalMsg && inviteTokenPayload) {
      router.push(routing.getSignUpUrl());
    }
  }, []);

  if (!inviteTokenPayload || errGlobalMsg) {
    return (
      <InviteToSpaceAcceptFail
        errMsg={errGlobalMsg}
      />
    );
  }

  if (!currUserId) {
    return (
      <ContentCenter>
        <CircularProgress />
      </ContentCenter>
    );
  }

  return (
    <InviteToSpaceAcceptSuccess
      invitePayload={inviteTokenPayload}
    />
  );
};

export {
  InviteToSpaceAccept,
};
