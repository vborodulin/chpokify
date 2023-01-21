import { INVITE_USER_TO } from '@chpokify/models-types';
import { routing } from '@chpokify/routing';
import Router from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsActionsTypes } from '@Redux/domains/pokerSessions/actionTypes';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';

import { LogInGuest } from '@components/domains/auth/LogInGuest';
import { FORM_FIELDS } from '@components/domains/auth/SignUp/Layout';
import { PokerSessionJoin } from '@components/domains/poker/PokerSessionInviteAccept/PokerSessionJoin';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { PokerSessionInviteAcceptFail } from './PokerSessionInviteAcceptFail';

const PokerSessionInviteAccept = (): React.ReactElement | null => {
  const [isLoginGuest, setIsLoginGuest] = useState(false);

  const inviteTokenPayload = useSelector(pokerSessionsSelectors.getInviteTokenPayload);
  const inviteToken = useSelector(pokerSessionsSelectors.getInviteToken);

  const { errGlobalMsg } = useAsyncActionInfo(
    [pokerSessionsActionsTypes.INVITE_TOKEN_VALIDATE_PENDING],
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
      <PokerSessionInviteAcceptFail
        errMsg={errGlobalMsg}
      />
    );
  }

  if (isLoginGuest) {
    return (
      <LogInGuest
        inviteToken={inviteToken}
        inviteTokenPayload={inviteTokenPayload}
        inviteUserTo={INVITE_USER_TO.POKER}
      />
    );
  }

  return (
    <PokerSessionJoin
      onClickLoginIn={handleClickLoginIn}
      onClickLoginInGuest={handleClickLoginInGuest}
    />
  );
};

export {
  PokerSessionInviteAccept,
};
