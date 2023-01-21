import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const HasChanges = () => (
  <Layout
    formRefs={{
      email: null,
      password: null,
    }}
    defaultValues={{}}
    isEmailDisabled={false}
    invitePayload={undefined}
    errors={{}}
    errGlobalMsg=""
    hasChanges
    isLoading={false}
    onSubmit={() => {
    }}
  />
);

export const Loading = () => (
  <Layout
    formRefs={{
      email: null,
      password: null,
    }}
    defaultValues={{}}
    isEmailDisabled={false}
    invitePayload={undefined}
    errors={{}}
    errGlobalMsg=""
    hasChanges
    isLoading
    onSubmit={() => {}}
  />
);

export const ErrorField = () => (
  <Layout
    formRefs={{
      email: null,
      password: null,
    }}
    defaultValues={{}}
    isEmailDisabled={false}
    invitePayload={undefined}
    errors={{
      email: {
        type: 'serverError',
        message: 'Invalid email',
      },
    }}
    errGlobalMsg=""
    hasChanges
    isLoading={false}
    onSubmit={() => {}}
  />
);

export const ErrorGlobal = () => (
  <Layout
    formRefs={{
      email: null,
      password: null,
    }}
    defaultValues={{}}
    isEmailDisabled={false}
    invitePayload={undefined}
    errors={{}}
    errGlobalMsg="Internal server error"
    hasChanges
    isLoading={false}
    onSubmit={() => {}}
  />
);

export const HasPrefilledEmail = () => (
  <Layout
    formRefs={{
      email: null,
      password: null,
    }}
    defaultValues={{
      email: 'boroda@gmail.com',
    }}
    isEmailDisabled
    invitePayload={undefined}
    errors={{}}
    errGlobalMsg=""
    hasChanges
    isLoading={false}
    onSubmit={() => {
    }}
  />
);

export const WithInvite = () => (
  <Layout
    formRefs={{
      email: null,
      password: null,
    }}
    defaultValues={{}}
    isEmailDisabled={false}
    invitePayload={{
      space: {
        _id: '1',
        name: 'LiveXP',
      },
      team: null,
      email: '',
    }}
    errors={{}}
    errGlobalMsg=""
    hasChanges
    isLoading={false}
    onSubmit={() => {
    }}
  />
);
