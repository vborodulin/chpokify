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
    isVoting={false}
    onRevealCards={() => {}}
  />
);

export const IsVoting = () => (
  <Layout
    canModerate
    isVoting
    onRevealCards={() => {}}
  />
);

export const CantModerate = () => (
  <Layout
    canModerate={false}
    isVoting={false}
    onRevealCards={() => {}}
  />
);
