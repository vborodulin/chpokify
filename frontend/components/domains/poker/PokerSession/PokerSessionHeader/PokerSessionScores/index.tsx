import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';

import { PokerScores } from '@components/domains/poker/PokerScores';

import { TTextProps } from '@components/uiKit/Text';

export type TPokerSessionScoresProps = Partial<TTextProps> & {
  pokerSessionId: TEntityID
};

const PokerSessionScores = (props: TPokerSessionScoresProps): React.ReactElement | null => {
  const {
    pokerSessionId,
    ...other
  } = props;

  const scores = useSelector(pokerSessionsSelectors.getScores)(
    pokerSessionId
  );

  return (
    <PokerScores
      scores={scores}
      {...other}
    />
  );
};

export {
  PokerSessionScores,
};
