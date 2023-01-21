import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Layout
    formRefs={{
      email: null,
      teamId: null,
    }}
    isEmailSent={false}
    sentEmail=""
    errors={{}}
    errGlobalMsg=""
    hasChanges={false}
    isLoading={false}
    isShowTeams
    onSendInvite={() => {}}
    onToggleShowTeams={() => {}}
    teamsOptions={[]}
  />
);

export const EmailSent = () => (
  <Layout
    formRefs={{
      email: null,
      teamId: null,
    }}
    sentEmail="boroda@gmail.com"
    isEmailSent
    errors={{}}
    errGlobalMsg=""
    hasChanges={false}
    isLoading={false}
    isShowTeams
    onSendInvite={() => {}}
    onToggleShowTeams={() => {}}
    teamsOptions={[]}
  />
);
