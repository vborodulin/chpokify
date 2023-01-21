import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Layout
    teams={[]}
    defaultValue={{
      teamsIds: [],
    }}
    formRefs={{
      teamsIds: null,
    }}
    errors={{}}
    errGlobalMsg=""
    isLoading={false}
    hasChanges={false}
    isCreateSession={false}
    onCancel={() => {}}
    onSubmit={() => {}}
    onOpenModalTeamsEdit={() => {}}
    isSpaceOnboardingOpen
  />
);

export const HasChanges = () => (
  <Layout
    teams={[]}
    defaultValue={{
      teamsIds: [],
    }}
    formRefs={{
      teamsIds: null,
    }}
    errors={{}}
    errGlobalMsg=""
    isLoading={false}
    isCreateSession={false}
    hasChanges
    onCancel={() => {}}
    onSubmit={() => {}}
    onOpenModalTeamsEdit={() => {}}
  />
);
