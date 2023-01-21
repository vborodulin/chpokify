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
      password: null,
    }}
    errors={{}}
    errGlobalMsg=""
    hasChanges={false}
    isLoading={false}
    onSubmit={(event) => event.preventDefault()}
  />
);

export const HasChanges = () => (
  <Layout
    formRefs={{
      password: null,
    }}
    errors={{}}
    errGlobalMsg=""
    hasChanges
    isLoading={false}
    onSubmit={(event) => event.preventDefault()}
  />
);

export const Loading = () => (
  <Layout
    formRefs={{
      password: null,
    }}
    errors={{}}
    errGlobalMsg=""
    hasChanges
    isLoading
    onSubmit={(event) => event.preventDefault()}
  />
);

export const ErrorField = () => (
  <Layout
    formRefs={{
      password: null,
    }}
    errors={{
      password: {
        type: 'serverError',
        message: 'password is too short',
      },
    }}
    errGlobalMsg=""
    hasChanges
    isLoading={false}
    onSubmit={(event) => event.preventDefault()}
  />
);

export const ErrorGlobal = () => (
  <Layout
    formRefs={{
      password: null,
    }}
    errors={{}}
    errGlobalMsg="Internal server error"
    hasChanges
    isLoading={false}
    onSubmit={(event) => event.preventDefault()}
  />
);
