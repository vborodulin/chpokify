import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { TAppState } from '@Redux/types';

import { REDIRECT_AFTER_LOGIN_GUEST } from '@components/domains/auth/types';

const defineRedirectAfterLoginGuest = (state: TAppState): REDIRECT_AFTER_LOGIN_GUEST | undefined => {
  const inviteTokenPayloadFromPoker = pokerSessionsSelectors.getInviteTokenPayload(state);
  const inviteTokenPayloadRetro = retroSessionsSelectors.getInviteTokenPayload(state);

  if (inviteTokenPayloadFromPoker) {
    return REDIRECT_AFTER_LOGIN_GUEST.POKER;
  }

  if (inviteTokenPayloadRetro) {
    return REDIRECT_AFTER_LOGIN_GUEST.RETRO;
  }
};

const authHelpers = {
  defineRedirectAfterLoginGuest,
};

export {
  authHelpers,
};
