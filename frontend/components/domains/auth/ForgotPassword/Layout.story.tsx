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
      email: null,
    }}
    errors={{}}
    sendId=""
    errGlobalMsg=""
    hasChanges={false}
    isTouched={false}
    isLoading={false}
    onSubmit={() => {}}
  />
);

export const HasChanges = () => (
  <Layout
    formRefs={{
      email: null,
    }}
    errors={{}}
    sendId=""
    errGlobalMsg=""
    hasChanges
    isTouched={false}
    isLoading={false}
    onSubmit={() => {}}
  />
);

export const Loading = () => (
  <Layout
    formRefs={{
      email: null,
    }}
    errors={{}}
    sendId=""
    errGlobalMsg=""
    isTouched
    hasChanges
    isLoading
    onSubmit={(event: FormEvent) => event.preventDefault()}
  />
);

export const EmailSent = () => (
  <Layout
    formRefs={{
      email: null,
    }}
    errors={{}}
    sendId="123456"
    errGlobalMsg=""
    isTouched={false}
    hasChanges={false}
    isLoading={false}
    onSubmit={() => {}}
  />
);

export const ErrorField = () => (
  <Layout
    formRefs={{
      email: null,
    }}
    errors={{
      email: {
        type: 'serverError',
        message: 'Email is not found',
      },
    }}
    sendId=""
    errGlobalMsg=""
    isTouched
    hasChanges
    isLoading={false}
    onSubmit={(event: FormEvent) => event.preventDefault()}
  />
);

export const ErrorGlobal = () => (
  <Layout
    formRefs={{
      email: null,
    }}
    errors={{}}
    sendId=""
    errGlobalMsg="Network Error"
    isTouched
    hasChanges
    isLoading={false}
    onSubmit={() => {}}
  />
);
