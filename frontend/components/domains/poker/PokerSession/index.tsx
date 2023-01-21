import React from 'react';
import { useSelector } from 'react-redux';

import { asyncRejectedSelectors } from '@Redux/domains/asyncInfo/rejected/selectors';
import { authSelectors } from '@Redux/domains/auth/selectors';
import { pokerSessionsActionsTypes } from '@Redux/domains/pokerSessions/actionTypes';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { pokerSessionsRepoSelectors } from '@Redux/domains/pokerSessionsRepo/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiSelectors } from '@Redux/domains/ui/selectors';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { NotFound } from '@components/domains/layouts/NotFound';
import { PokerSessionThumbForbidden } from '@components/domains/poker/PokerSession/PokerSessionThumbForbidden';

import { useOnce } from '@components/utils/hooks/useOnce';

import { Layout } from './Layout';

const PokerSession = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();

  const isModalOpen = useSelector(uiSelectors.getModal);
  const currUserId = useSelector(authSelectors.getCurrUserId);
  const pokerSession = useSelector(pokerSessionsSelectors.getCurr);
  const canModerate = useSelector(spacesSelectors.getCanModerate)(
    pokerSession?.spaceId,
    currUserId
  );
  const isParticipant = useSelector(pokerSessionsRepoSelectors.getIsUserParticipant)(
    pokerSession,
    currUserId
  );

  const pokerSessionGetError = useSelector(asyncRejectedSelectors.createErrorSelector)([
    pokerSessionsActionsTypes.GET_REJECTED,
  ]);

  useOnce(
    () => !!pokerSession && isParticipant && canModerate && !pokerSession.storiesIds.length && !isModalOpen,
    () => {
      dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_STORIES_ADD, {
        preventClose: true,
      }));
    },
    [JSON.stringify(pokerSession), isParticipant, canModerate, isModalOpen]
  );

  if (!pokerSession && pokerSessionGetError?.code === 403 || !isParticipant) {
    return (
      <PokerSessionThumbForbidden />
    );
  }

  if (!pokerSession) {
    return (
      <NotFound />
    );
  }

  return (
    <Layout
      pokerSession={pokerSession}
      canModerate={canModerate}
    />
  );
};

export {
  PokerSession,
};
