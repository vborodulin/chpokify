import { POKER_CARD_DECK_TYPE } from '@chpokify/models-types/';
import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Layout
    card={{
      _id: '1',
      type: POKER_CARD_DECK_TYPE.TEXT,
      name: '8',
      value: 8,
    }}
    isVoting
    scores={10}
    onChooseCard={() => {}}
  />
);

export const Icon = () => (
  <Layout
    card={{
      _id: '1',
      type: POKER_CARD_DECK_TYPE.ICON,
      icon: 'IconCoffee',
      value: null,
    }}
    isVoting
    scores={10}
    onChooseCard={() => {}}
  />
);

export const NoScores = () => (
  <Layout
    card={{
      _id: '1',
      type: POKER_CARD_DECK_TYPE.TEXT,
      name: '8',
      value: 8,
    }}
    isVoting
    scores={null}
    onChooseCard={() => {}}
  />
);

export const NotVoting = () => (
  <Layout
    card={{
      _id: '1',
      type: POKER_CARD_DECK_TYPE.TEXT,
      name: '8',
      value: 8,
    }}
    isVoting={false}
    scores={null}
    onChooseCard={() => {}}
  />
);
