import { isEqualsId } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerCardDecksSelectors } from '@Redux/domains/pokerCardDecks/selectors';

import { PokerGameCard } from '@components/domains/poker/PokerGameCard';

import { Grid, TGridProps } from '@components/uiKit/Grid';

import { ClientError } from '@lib/errors';
import { log } from '@lib/logger';

export type TPokerChooseCardsProps = Partial<TGridProps> & {
  cardSetId: TEntityID;
  votingCardId?: TEntityID;
  onChoose: (cardId: TEntityID) => void;
};

const PokerChooseCards = (props: TPokerChooseCardsProps): React.ReactElement | null => {
  const {
    cardSetId,
    votingCardId,
    onChoose,
    ...other
  } = props;

  if (!cardSetId) {
    return null;
  }

  const cardSet = useSelector(pokerCardDecksSelectors.getCardDeckById)(cardSetId);

  if (!cardSet) {
    log.error(new ClientError(`cardSet not found for id:${cardSetId}`));
    return null;
  }

  return (
    <Grid
      gridGap={3}
      justifyContent="center"
      gridTemplateColumns={[
        'repeat(3, 1fr)',
        'repeat(6, 1fr)',
      ]}
      {...other}
    >
      {
        cardSet.cards.map((card) => (
          <PokerGameCard
            key={card._id.toString()}
            card={card}
            isActive={isEqualsId(card._id, votingCardId)}
            onChoose={onChoose}
          />
        ))
      }
    </Grid>
  );
};

export {
  PokerChooseCards,
};
