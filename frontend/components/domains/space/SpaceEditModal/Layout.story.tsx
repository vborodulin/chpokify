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
      name: null,
    }}
    defaultValues={{}}
    errGlobalMsg=""
    errors={{}}
    hasChanges={false}
    isLoading={false}
    onCancel={() => {}}
    onSave={() => {}}
  />
);

export const HasChanges = () => (
  <Layout
    formRefs={{
      name: null,
    }}
    defaultValues={{}}
    errGlobalMsg=""
    errors={{}}
    hasChanges
    isLoading={false}
    onCancel={() => {}}
    onSave={() => {}}
  />
);

export const Loading = () => (
  <Layout
    formRefs={{
      name: null,
    }}
    defaultValues={{}}
    errGlobalMsg=""
    errors={{}}
    hasChanges
    isLoading
    onCancel={() => {}}
    onSave={() => {}}
  />
);

export const ErrorField = () => (
  <Layout
    formRefs={{
      name: null,
    }}
    defaultValues={{}}
    errGlobalMsg=""
    errors={{
      name: {
        type: 'serverError',
        message: 'Too short',
      },
    }}
    hasChanges
    isLoading={false}
    onCancel={() => {}}
    onSave={() => {}}
  />
);

export const ErrorGlobal = () => (
  <Layout
    formRefs={{
      name: null,
    }}
    defaultValues={{}}
    errors={{}}
    errGlobalMsg="Internal server error"
    hasChanges
    isLoading={false}
    onCancel={() => {}}
    onSave={() => {}}
  />
);
