import base from 'paths.macro';
import React from 'react';

import { CardVotedHide } from '@components/domains/poker/pokerCards/CardVotedHide';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <CardVotedHide />
);
