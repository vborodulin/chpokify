import { POKER_CARD_DECK_TYPE, TPokerCard } from '@chpokify/models-types/pokerCardDeck';
import React from 'react';

import * as icons from '@components/uiKit/Icons';
import { TIconProps } from '@components/uiKit/Icons/Icon';
import { Text, TTextProps } from '@components/uiKit/Text';

import { NeverError } from '@lib/errors';

export type TPokerCardValueProps = {
  card: TPokerCard;
  textProps?: Partial<TTextProps>;
  iconProps?: Partial<TIconProps>;
};

const PokerCardValue = (props: TPokerCardValueProps): React.ReactElement | null => {
  const {
    card,
    textProps = {},
    iconProps = {},
  } = props;

  switch (card.type) {
    case POKER_CARD_DECK_TYPE.TEXT:
      return (
        <Text
          key={card._id.toString()}
          as="span"
          fontSize={2}
          {...textProps}
        >
          {card.name}
        </Text>
      );

    case POKER_CARD_DECK_TYPE.ICON: {
      const IconComponent = (icons as Record<string, any>)[card.icon];
      return (
        <IconComponent
          key={card._id}
          width="20px"
          height="20px"
          {...iconProps}
        />
      );
    }

    default:
      throw new NeverError(card);
  }
};

export {
  PokerCardValue,
};
