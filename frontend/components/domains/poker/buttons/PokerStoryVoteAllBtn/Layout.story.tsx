import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const StoryActive = () => (
  <Layout
    hasTeams
    canModerate
    isStoryActive
    isStoryVoting={false}
    onCancelVoteAll={() => {}}
    onStartVoteAll={() => {}}
  />
);

export const StoryVoting = () => (
  <Layout
    hasTeams
    canModerate
    isStoryActive
    isStoryVoting
    onCancelVoteAll={() => {}}
    onStartVoteAll={() => {}}
  />
);

export const StoryNotActive = () => (
  <Layout
    hasTeams
    canModerate
    isStoryActive={false}
    isStoryVoting={false}
    onCancelVoteAll={() => {}}
    onStartVoteAll={() => {}}
  />
);

export const CantModerate = () => (
  <Layout
    hasTeams
    canModerate={false}
    isStoryActive={false}
    isStoryVoting={false}
    onCancelVoteAll={() => {}}
    onStartVoteAll={() => {}}
  />
);

export const NoTeams = () => (
  <Layout
    hasTeams={false}
    canModerate={false}
    isStoryActive={false}
    isStoryVoting={false}
    onCancelVoteAll={() => {}}
    onStartVoteAll={() => {}}
  />
);
