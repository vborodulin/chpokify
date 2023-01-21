import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { PokerSessionHeader } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <PokerSessionHeader
    isVideoCall
    pokerSessionId="1"
    title="Product Team Estimation, Sprint 8.11, Part II"
    description="This is a description of the session."
  />
);

export const EmptyDescription = () => (
  <PokerSessionHeader
    isVideoCall
    pokerSessionId="1"
    title="Product Team Estimation, Sprint 8.11, Part II"
  />
);

export const EmptyDescriptionAndTime = () => (
  <PokerSessionHeader
    isVideoCall
    pokerSessionId="1"
    title="Product Team Estimation, Sprint 8.11, Part II"
  />
);
