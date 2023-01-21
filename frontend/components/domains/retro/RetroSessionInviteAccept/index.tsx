import { INVITE_USER_TO } from '@chpokify/models-types';
import { routing } from '@chpokify/routing';
import Router from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsActionsTypes } from '@Redux/domains/retroSessions/actionsTypes';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { LogInGuest } from '@components/domains/auth/LogInGuest';
import { FORM_FIELDS } from '@components/domains/auth/SignUp/Layout';
import {
  RetroSessionInviteAcceptFail,
} from '@components/domains/retro/RetroSessionInviteAccept/RetroSessionInviteAcceptFail';
import { RetroSessionJoin } from '@components/domains/retro/RetroSessionInviteAccept/RetroSessionJoin';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

const RetroSessionInviteAccept = (): React.ReactElement | null => {
  const [isLoginGuest, setIsLoginGuest] = useState(false);

  const inviteTokenPayload = useSelector(retroSessionsSelectors.getInviteTokenPayload);
  const inviteToken = useSelector(retroSessionsSelectors.getInviteToken);

  const { errGlobalMsg } = useAsyncActionInfo(
    [retroSessionsActionsTypes.INVITE_TOKEN_VALIDATE_PENDING],
    FORM_FIELDS
  );

  const handleClickLoginInGuest = () => {
    setIsLoginGuest(true);
  };

  const handleClickLoginIn = () => {
    Router.push(routing.getLogInUrl());
  };

  if (!inviteTokenPayload || errGlobalMsg) {
    return (
      <RetroSessionInviteAcceptFail
        errMsg={errGlobalMsg}
      />
    );
  }

  if (isLoginGuest) {
    return (
      <LogInGuest
        inviteToken={inviteToken}
        inviteTokenPayload={inviteTokenPayload}
        inviteUserTo={INVITE_USER_TO.RETRO}
      />
    );
  }

  return (
    <RetroSessionJoin
      onClickLoginIn={handleClickLoginIn}
      onClickLoginInGuest={handleClickLoginInGuest}
    />
  );
};

export {
  RetroSessionInviteAccept,
};
