import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Layout
    hasTeams
    canModerate
    isActive={false}
    onStop={() => {}}
    onStart={() => {}}
  />
);

export const Active = () => (
  <Layout
    hasTeams
    canModerate
    isActive
    onStart={() => {}}
    onStop={() => {}}
  />
);

export const CantModerate = () => (
  <Layout
    hasTeams
    canModerate={false}
    isActive
    onStart={() => {}}
    onStop={() => {}}
  />
);

export const NoTeams = () => (
  <Layout
    hasTeams={false}
    canModerate
    isActive
    onStart={() => {}}
    onStop={() => {}}
  />
);
