import { TStory } from '@chpokify/models-types';
import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { StoryActions } from './index';

export default {
  title: getStoryName(base),
};

const story: TStory = {
  _id: '1',
  id: 1,
  title: 'Choosing exact person for broadcast',
  spaceId: '1',
};

export const Default = () => (
  <StoryActions
    story={story}
  />
);
