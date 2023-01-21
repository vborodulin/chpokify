import { POKER_CARD_DECK_TYPE } from '@chpokify/models-types';
import base from 'paths.macro';
import React from 'react';

import { PokerGameCard } from '@components/domains/poker/PokerGameCard';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <PokerGameCard
    card={{
      _id: '0',
      type: POKER_CARD_DECK_TYPE.TEXT,
      name: '0',
      value: 0,
    }}
    isActive={false}
    onChoose={() => {}}
  />
);

export const Icon = () => (
  <PokerGameCard
    card={{
      _id: '0',
      type: POKER_CARD_DECK_TYPE.ICON,
      icon: 'IconCoffee',
      value: 0,
    }}
    isActive={false}
    onChoose={() => {}}
  />
);

export const Active = () => (
  <PokerGameCard
    card={{
      _id: '0',
      type: POKER_CARD_DECK_TYPE.TEXT,
      name: '0',
      value: 0,
    }}
    isActive
    onChoose={() => {}}
  />
);
