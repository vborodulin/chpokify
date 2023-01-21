import { TPokerCard } from '@chpokify/models-types';
import React from 'react';

import { CardBase, TCardBaseProps } from '@components/domains/poker/pokerCards/CardBase';
import { PokerCardValue } from '@components/domains/poker/PokerCardValue';

export type TCardVotedOpenProps = TCardBaseProps & {
  card?: TPokerCard;
};

const CardVotedOpen = (props: TCardVotedOpenProps): React.ReactElement | null => {
  const {
    card,
    ...other
  } = props;

  if (!card) {
    return (
      <CardBase
        {...other}
      />
    );
  }

  return (
    <CardBase
      {...other}
    >
      <PokerCardValue
        card={card}
        textProps={{
          fontSize: 9,
          fontWeight: 1,
          lineHeight: 1,
          color: 'font.primary',
        }}
        iconProps={{
          width: '52px',
          height: '52px',
          fill: 'font.primary',
        }}
      />
    </CardBase>
  );
};

export {
  CardVotedOpen,
};
