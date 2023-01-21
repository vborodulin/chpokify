import { TPokerCard } from '@chpokify/models-types';
import React from 'react';
import styled, { css } from 'styled-components';

import { PokerCardValue } from '@components/domains/poker/PokerCardValue';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

export type TCardDecksProps = {
  title: string;
  cards: TPokerCard[];
  onClick: () => void;
  isHover?: boolean
};
type TRootProps = Partial<TBoxProps> & {
  isHover: boolean;
};
const rootHoverMixin = css<TRootProps>`
    &:hover {
    background-color: ${({ theme }) => theme.colors.base.a_20};
    cursor:pointer
  }
`;

const Root = styled(Box)<TRootProps>`
  background-color: ${({ theme }) => theme.colors.base.a_10};
  border-radius: ${({ theme }) => theme.radii[2]};

 
  ${({ isHover }) => (isHover && rootHoverMixin)};
 `;

const CardDecksItem = (props: TCardDecksProps): React.ReactElement | null => {
  const {
    title,
    cards,
    onClick,
    isHover,
  } = props;
  return (
    <Root
      p={3}
      onClick={onClick}
      isHover={isHover}
    >
      <Text
        fontWeight={1}
        fontSize={2}
        mb={2}
      >
        {title}
      </Text>
      <Flex
        flexWrap="wrap"
      >
        {
          cards.map((card) => (
            <PokerCardValue
              key={card._id.toString()}
              textProps={{
                as: 'span',
                fontSize: 1,
                fontWeight: 1,
                mr: '2px',
                color: 'font.d_30',
              }}
              iconProps={{
                width: '12px',
                height: '12px',
                fill: 'font.d_30',
              }}
              card={card}
            />
          ))
        }
      </Flex>
    </Root>
  );
};

export { CardDecksItem };
