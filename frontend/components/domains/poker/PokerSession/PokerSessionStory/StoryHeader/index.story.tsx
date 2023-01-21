import { TStory } from '@chpokify/models-types';
import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { StoryHeader } from './index';

export default {
  title: getStoryName(base),
};

const story: TStory = {
  _id: '1',
  id: 1,
  title: 'title',
  spaceId: '2',
};

export const Default = () => (
  <StoryHeader
    scores={10}
    story={story}
  />
);

export const NoScores = () => (
  <StoryHeader
    scores={null}
    story={story}
  />
);
