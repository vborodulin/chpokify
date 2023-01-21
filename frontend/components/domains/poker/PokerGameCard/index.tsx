import { TEntityID } from '@chpokify/models-types';
import { TPokerCard } from '@chpokify/models-types/pokerCardDeck';
import React from 'react';
import styled, { css } from 'styled-components';

import { PokerCardValue } from '@components/domains/poker/PokerCardValue';

import { BoxAr, TBoxArProps } from '@components/uiKit/BoxAr';

const POKER_CARD_AR = 63.5 / 88.8;

const rootActiveMixin = css`
  background-color: ${({ theme }) => theme.colors.primary.normal};
  & > span{
    color: ${({ theme }) => theme.colors.base.normal};
    fill: ${({ theme }) => theme.colors.base.normal};
  }
`;

const rootNotActiveMixin = css`
background-color: ${({ theme }) => theme.colors.base.a_20};
`;

const Root = styled(BoxAr)<TBoxArProps & { isActive: boolean }>`
${({ isActive }) => (isActive ? rootActiveMixin : rootNotActiveMixin)};

align-items: center;
border-radius: ${({ theme }) => theme.radii[2]};
cursor: pointer;
justify-content: center;
padding:0 12px;

 &:hover {
   background-color: ${({ theme }) => theme.colors.primary.normal};
 }
 &:hover span {
   color: ${({ theme }) => theme.colors.base.normal};
   fill: ${({ theme }) => theme.colors.base.normal};
 }
`;

export type TPokerGameCardProps = {
  card: TPokerCard;
  isActive: boolean;
  onChoose: (cardId: TEntityID) => void;
};

const PokerGameCard = (props: TPokerGameCardProps): React.ReactElement | null => {
  const {
    card,
    isActive,
    onChoose,
    ...other
  } = props;

  return (
    <Root
      role="button"
      ar={POKER_CARD_AR}
      isActive={isActive}
      onClick={() => onChoose(card._id)}
      {...other}
    >
      <PokerCardValue
        card={card}
        iconProps={{
          width: ['36px', '56px'],
          height: ['36px', '56px'],
          fill: 'font.primary',
          textAlign: 'center',
        }}
        textProps={{
          fontSize: [8, 9],
          fontWeight: 1,
          color: 'font.primary',
          lineHeight: 1,
          textAlign: 'center',
        }}
      />
    </Root>
  );
};

export {
  PokerGameCard,
};
