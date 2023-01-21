import { TEntityID } from '@chpokify/models-types';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { DATA_TEST_ID } from '@components/domains/core/types';
import { CopyBtn, TCopyBtnProps } from '@components/domains/shared/CopyBtn';

export type TPokerSessionInviteBtnProps = Partial<TCopyBtnProps> & {
  pokerSessionId: TEntityID,
  teamIds?: TEntityID[],
};

const PokerSessionInviteBtn = (props: TPokerSessionInviteBtnProps): React.ReactElement | null => {
  const {
    teamIds,
    pokerSessionId,
    ...other
  } = props;

  const { locale } = useRouter();
  const dispatch = useAppDispatch();
  const currUserId = useSelector(authSelectors.getCurrUserId);
  const pokerSession = useSelector(pokerSessionsSelectors.getById)(
    pokerSessionId
  );
  const cantModerate = useSelector(spacesSelectors.getCanModerate)(
    pokerSession?.spaceId,
    currUserId
  );

  if (!cantModerate || !pokerSession) {
    return null;
  }

  const checkPlan = () => true;

  const handleGetInviteLink = async () => {
    const teamsIds = !teamIds ? pokerSession.teamsIds : teamIds;
    const { payload } = await dispatch(pokerSessionsAsyncActions.inviteGen(pokerSession._id.toString(), {
      teamsIds,
      locale: locale as string,
    }));

    if (!getIsRejectedActionPayload(payload)) {
      return payload.url;
    }

    return '';
  };

  return (
    <CopyBtn
      data-test-id={DATA_TEST_ID.POKER_SESSION_SHARE_BTN}
      variant="primary"
      getCopyText={handleGetInviteLink}
      handleCopyBefore={checkPlan}
      hideTimeout={1500}
      isMobileReady
      {...other}
    />
  );
};

export {
  PokerSessionInviteBtn,
};
