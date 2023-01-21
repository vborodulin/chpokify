import { pokerSessionsSchemas } from '@chpokify/api-schemas';
import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { pokerHelpers } from '@components/domains/poker/helpers';

import { Layout, TLayoutProps } from './Layout';

export type TPokerStoryRevealAllProps = Partial<TLayoutProps> & {
  storyId: TEntityID;
};

// remove space id from poker sessions api
const PokerStoryRevealAllBtn = (props: TPokerStoryRevealAllProps): React.ReactElement | null => {
  const {
    storyId,
    ...other
  } = props;

  const dispatch = useAppDispatch();
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const pokerSessionId = useSelector(pokerSessionsSelectors.getCurrId);

  const isVoting = useSelector(pokerSessionsSelectors.getIsStoryVoting)(
    pokerSessionId,
    storyId
  );

  const onRevealSubmit = async () => {
    if (!pokerSessionId) {
      return;
    }

    const result = await dispatch(pokerSessionsAsyncActions.revealCards(
      pokerSessionId,
      storyId
    ));
    const payload = result?.payload;

    if (payload) {
      const { pokerSession } = payload as pokerSessionsSchemas.TRevealResResp;
      pokerHelpers.checkRespFromReveal(pokerSession);
    }
  };

  return (
    <Layout
      canModerate={canModerate}
      isVoting={isVoting}
      onRevealCards={onRevealSubmit}
      {...other}
    />
  );
};

export {
  PokerStoryRevealAllBtn,
};
