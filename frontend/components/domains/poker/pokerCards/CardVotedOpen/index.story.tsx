import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { CardVotedOpen } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <CardVotedOpen
    name="8"
  />
);

export const NotVoted = () => (
  <CardVotedOpen
    name=""
  />
);
