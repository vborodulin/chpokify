import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Layout
    canModerate
    onAddStories={() => {}}
  />
);

export const CantModerate = () => (
  <Layout
    canModerate={false}
    onAddStories={() => {}}
  />
);
