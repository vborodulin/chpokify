import { TSpace, TTeam } from '@chpokify/models-types';
import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

const space = {
  _id: '1',
  name: 'LiveXP',
} as TSpace;

const team = {
  _id: '11',
  name: 'RND',
} as TTeam;

export const Default = () => (
  <Layout
    space={space}
    team={team}
    isLoading={false}
    errGlobalMsg=""
    onCancel={() => {}}
    onAccept={() => {}}
  />
);

export const Loading = () => (
  <Layout
    space={space}
    team={team}
    errGlobalMsg=""
    isLoading
    onCancel={() => {}}
    onAccept={() => {}}
  />
);

export const ErrorGlobal = () => (
  <Layout
    space={space}
    team={team}
    errGlobalMsg="Interval server error"
    isLoading={false}
    onCancel={() => {}}
    onAccept={() => {}}
  />
);
