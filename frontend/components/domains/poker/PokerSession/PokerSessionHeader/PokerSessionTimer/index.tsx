import { TEntityID } from '@chpokify/models-types';
import React from 'react';

import { useCurrUserPokerSessionInfo } from '@components/domains/poker/hooks/useCurrUserPokerSessionInfo';
import { Timer, TTimerProps } from '@components/domains/shared/Timer';

export type TPokerSessionTimerProps = Partial<TTimerProps> & {
  pokerSessionId: TEntityID;
};

const PokerSessionTimer = (props: TPokerSessionTimerProps): React.ReactElement | null => {
  const {
    pokerSessionId,
    ...other
  } = props;

  const { pokerSession, duration, activeStory } = useCurrUserPokerSessionInfo(
    pokerSessionId
  );

  if (!pokerSession) {
    return null;
  }

  return (
    <Timer
      timerId={pokerSessionId}
      isActive={!!activeStory}
      pastSeconds={duration}
      textAlign="right"
      {...other}
    />
  );
};

export {
  PokerSessionTimer,
};
