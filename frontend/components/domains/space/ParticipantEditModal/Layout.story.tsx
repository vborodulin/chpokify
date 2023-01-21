import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Layout
    participant={{
      _id: '1',
      role: 1,
      userId: '10',
    }}
    teams={[]}
    isMe={false}
    isGuest={false}

    defaultValues={{
      username: 'boroda',
      email: 'boroda@gmail.com',
      teamsIds: 'teamId',
    }}
    errors={{}}
    hasChanges={false}
    isLoading={false}

    onChangeTeams={() => {
    }}

    onCancel={() => {
    }}
    onRemove={() => {
    }}
    onSubmit={() => {
    }}
    onToggleAdminRole={() => {
    }}
    formRefs={{
      username: null,
      email: null,
      teamsIds: null,
    }}
  />
);

export const Me = () => (
  <Layout
    participant={{
      _id: '1',
      role: 1,
      userId: '10',
    }}
    teams={[]}
    isGuest={false}
    defaultValues={{
      username: 'boroda',
      email: 'boroda@gmail.com',
      teamsIds: 'teamId',
    }}
    errors={{}}
    hasChanges={false}
    isLoading={false}

    onChangeTeams={() => {
    }}

    onCancel={() => {
    }}
    onRemove={() => {
    }}
    onSubmit={() => {
    }}
    onToggleAdminRole={() => {
    }}
    formRefs={{
      username: null,
      email: null,
      teamsIds: null,
    }}
    isMe
  />
);
