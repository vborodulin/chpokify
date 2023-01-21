import { TTeam } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerCardDecksSelectors } from '@Redux/domains/pokerCardDecks/selectors';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { useCurrUserPokerSessionInfo } from '@components/domains/poker/hooks';

import { Layout, TLayoutProps } from './Layout';

export type TPokerVotingScoresBannerProps = Partial<TLayoutProps>;

const PokerVotingScoresBanner = (props: TPokerVotingScoresBannerProps): React.ReactElement | null => {
  const dispatch = useAppDispatch();

  const pokerSessionId = useSelector(pokerSessionsSelectors.getCurrId);
  const {
    pokerSession,
    teams,
  } = useCurrUserPokerSessionInfo(pokerSessionId);

  const cardSetId = pokerSession?.cardSetId;
  const cardSet = useSelector(pokerCardDecksSelectors.getCardDeckById)(cardSetId);

  const handleChooseCard = (votingCardId:string, team:TTeam) => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_CHOOSE_CARDS, {
      pokerSessionId,
      preventClose: true,
      votingCardId,
      team,
    }));
  };

  if (!cardSetId) {
    return null;
  }

  return (
    <Layout
      cardSet={cardSet}
      onChooseCard={handleChooseCard}
      teams={teams}
      {...props}
    />
  );
};

export {
  PokerVotingScoresBanner,
};
