import { POKER_CARD_DECK_TYPE } from '@chpokify/models-types/pokerCardDeck';
import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const NotVoted = () => (
  <Layout
    username="boroda"
    isMe={false}
    inSession
    isTeamVoting={false}
    currUsername="Softed"
    card={undefined}
  />
);

export const Voted = () => (
  <Layout
    username="boroda"
    isMe={false}
    inSession
    isTeamVoting={false}
    currUsername="Softed"
    card={{
      _id: '1',
      type: POKER_CARD_DECK_TYPE.TEXT,
      name: '2',
      value: 2,
    }}
  />
);

export const VotingNotPickCard = () => (
  <Layout
    username="boroda"
    isMe={false}
    inSession
    isTeamVoting
    currUsername="Softed"
    card={undefined}
  />
);

export const VotingPickCard = () => (
  <Layout
    username="boroda"
    isMe={false}
    inSession
    isTeamVoting
    currUsername="Softed"
    card={{
      _id: '1',
      type: POKER_CARD_DECK_TYPE.TEXT,
      name: '2',
      value: 2,
    }}
  />
);

export const VotingPickCardIcon = () => (
  <Layout
    username="boroda"
    isMe={false}
    inSession
    isTeamVoting
    currUsername="Softed"
    card={{
      _id: '1',
      type: POKER_CARD_DECK_TYPE.ICON,
      icon: 'IconCoffee',
      value: 2,
    }}
  />
);

export const VotingPickCardMe = () => (
  <Layout
    username="boroda"
    isMe
    inSession
    isTeamVoting
    currUsername="Softed"
    card={{
      _id: '1',
      type: POKER_CARD_DECK_TYPE.TEXT,
      name: '2',
      value: 2,
    }}
  />
);
