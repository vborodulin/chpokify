import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { PokerChooseCards } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <PokerChooseCards
    cardSetId="ObjectId"
    votingCardId="0"
    onChoose={() => {}}
  />
);

export const NotSelected = () => (
  <PokerChooseCards
    cardSetId="ObjectId"
    votingCardId={undefined}
    onChoose={() => {}}
  />
);

export const IsVotingNotSelected = () => (
  <PokerChooseCards
    cardSetId="ObjectId"
    votingCardId={undefined}
    onChoose={() => {}}
  />
);

export const IsVotingSelected = () => (
  <PokerChooseCards
    cardSetId="ObjectId"
    votingCardId={undefined}
    onChoose={() => {}}
  />
);
