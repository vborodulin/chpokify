import { TPokerCardDeckScores } from '@chpokify/models-types';
import React from 'react';

import { pokerHelpers } from '@components/domains/poker/helpers';

import { Text, TTextProps } from '@components/uiKit/Text';

export type TPokerScoresProps = Partial<TTextProps> & {
  scores: TPokerCardDeckScores;
};

const PokerScores = (props: TPokerScoresProps): React.ReactElement | null => {
  const {
    scores,
    ...other
  } = props;

  return (
    <Text
      fontSize={6}
      fontWeight={1}
      color={pokerHelpers.getHasScores(scores) ? 'font.normal' : 'font.d_30'}
      textAlign="right"
      flexShrink={0}
      {...other}
    >
      {pokerHelpers.getScoresView(scores)}
    </Text>
  );
};

export {
  PokerScores,
};
