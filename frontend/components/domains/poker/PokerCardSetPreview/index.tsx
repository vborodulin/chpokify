import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerCardDecksSelectors } from '@Redux/domains/pokerCardDecks/selectors';

import { PokerCardValue } from '@components/domains/poker/PokerCardValue';

import { Flex } from '@components/uiKit/Flex';
import { TGridProps } from '@components/uiKit/Grid';

import { ClientError } from '@lib/errors';
import { log } from '@lib/logger';

export type TPokerCardSetPreviewProps = TGridProps & {
  cardSetId?: TEntityID;
};

const PokerCardSetPreview = (props: TPokerCardSetPreviewProps): React.ReactElement | null => {
  const {
    cardSetId,
    ...other
  } = props;

  const cardSet = useSelector(pokerCardDecksSelectors.getCardDeckById)(cardSetId);

  if (!cardSet) {
    log.error(new ClientError(`cardSet not found for id:${cardSetId}`));
    return null;
  }

  if (!cardSetId) {
    return null;
  }

  return (
    <Flex
      flexWrap="wrap"
      {...other}
    >
      {
        cardSet?.cards.map((card) => (
          <PokerCardValue
            key={card._id.toString()}
            textProps={{
              mr: '2px',
              fontWeight: 1,
              as: 'span',
              fontSize: 1,
              color: 'font.d_30',
            }}
            iconProps={{
              width: '14px',
              height: '14px',
              fill: 'font.d_30',
            }}
            card={card}
          />
        ))
      }
    </Flex>
  );
};

export {
  PokerCardSetPreview,
};
