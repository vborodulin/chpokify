import { timeHelpers } from '@chpokify/helpers';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { useCurrUserPokerSessionInfo } from '@components/domains/poker/hooks';

const DELAY_OPEN_CHOOSE_CARDS = 1000;

const PokerChooseCardsProcessor = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();

  const pokerSessionId = useSelector(pokerSessionsSelectors.getCurrId);

  const {
    team,
    teams,
    votingCardId,
  } = useCurrUserPokerSessionInfo(pokerSessionId);

  const indexTeam = teams?.findIndex((myTeam) => myTeam._id === team?._id);

  const handleOpenChooseCards = async (withDelay:boolean) => {
    if (withDelay) {
      await timeHelpers.delay(DELAY_OPEN_CHOOSE_CARDS);
    }

    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_CHOOSE_CARDS, {
      pokerSessionId,
      preventClose: true,
    }));
  };

  useEffect(() => {
    if (team && !votingCardId) {
      if (indexTeam) {
        handleOpenChooseCards(true);
        return;
      }

      handleOpenChooseCards(false);
    }
  }, [JSON.stringify(team), votingCardId, indexTeam]);

  return null;
};

export {
  PokerChooseCardsProcessor,
};
