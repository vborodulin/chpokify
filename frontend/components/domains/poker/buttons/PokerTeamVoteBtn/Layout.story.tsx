import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const StoryActive = () => (
  <Layout
    hasTeamParticipants
    teamScores={10}
    canModerate
    isStoryActive
    isTeamVoting={false}
    onCancelVote={() => {}}
    onStartVote={() => {}}
  />
);

export const StoryVoting = () => (
  <Layout
    hasTeamParticipants
    teamScores={10}
    canModerate
    isStoryActive
    isTeamVoting
    onCancelVote={() => {}}
    onStartVote={() => {}}
  />
);

export const StoryNotActive = () => (
  <Layout
    hasTeamParticipants
    teamScores={10}
    canModerate
    isStoryActive={false}
    isTeamVoting={false}
    onCancelVote={() => {}}
    onStartVote={() => {}}
  />
);

export const CantModerate = () => (
  <Layout
    hasTeamParticipants
    teamScores={10}
    canModerate={false}
    isStoryActive={false}
    isTeamVoting={false}
    onCancelVote={() => {}}
    onStartVote={() => {}}
  />
);

export const NoParticipants = () => (
  <Layout
    hasTeamParticipants
    teamScores={10}
    canModerate={false}
    isStoryActive={false}
    isTeamVoting={false}
    onCancelVote={() => {}}
    onStartVote={() => {}}
  />
);

export const NoScores = () => (
  <Layout
    hasTeamParticipants
    teamScores={null}
    canModerate={false}
    isStoryActive={false}
    isTeamVoting={false}
    onCancelVote={() => {}}
    onStartVote={() => {}}
  />
);
