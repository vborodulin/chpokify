import base from 'paths.macro';
import React, { FormEvent } from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Layout
    formRefs={{
      username: null,
      email: null,
      password: null,
    }}
    defaultValues={{}}
    isEmailDisabled={false}
    invitePayload={undefined}
    errors={{}}
    errGlobalMsg=""
    hasChanges={false}
    isLoading={false}
    onSubmit={(event: FormEvent) => event.preventDefault()}
  />
);

export const HasChanges = () => (
  <Layout
    formRefs={{
      username: null,
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
    onSubmit={(event: FormEvent) => event.preventDefault()}
  />
);

export const Loading = () => (
  <Layout
    formRefs={{
      username: null,
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
    onSubmit={(event: FormEvent) => event.preventDefault()}
  />
);

export const ErrorField = () => (
  <Layout
    formRefs={{
      username: null,
      email: null,
      password: null,
    }}
    defaultValues={{}}
    isEmailDisabled={false}
    invitePayload={undefined}
    errors={{
      username: {
        type: 'serverError',
        message: 'Username is too short',
      },
    }}
    errGlobalMsg=""
    hasChanges
    isLoading={false}
    onSubmit={(event: FormEvent) => event.preventDefault()}
  />
);

export const ErrorGlobal = () => (
  <Layout
    formRefs={{
      username: null,
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
    onSubmit={(event: FormEvent) => event.preventDefault()}
  />
);

export const HasPredefinedEmail = () => (
  <Layout
    formRefs={{
      username: null,
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
    hasChanges={false}
    isLoading={false}
    onSubmit={(event: FormEvent) => event.preventDefault()}
  />
);

export const WithInvite = () => (
  <Layout
    formRefs={{
      username: null,
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
      email: '',
      team: null,
    }}
    errors={{}}
    errGlobalMsg=""
    hasChanges={false}
    isLoading={false}
    onSubmit={(event: FormEvent) => event.preventDefault()}
  />
);

export const WithInviteByEmail = () => (
  <Layout
    formRefs={{
      username: null,
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
      email: 'boroda@livexp.com',
      team: null,
    }}
    errors={{}}
    errGlobalMsg=""
    hasChanges={false}
    isLoading={false}
    onSubmit={(event: FormEvent) => event.preventDefault()}
  />
);
