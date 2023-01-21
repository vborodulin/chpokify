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
    errors={{}}
    errGlobalMsg=""
    hasChanges={false}
    isLoading={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const HasChanges = () => (
  <Layout
    formRefs={{
      name: null,
    }}
    errors={{}}
    errGlobalMsg=""
    hasChanges
    isLoading={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const Loading = () => (
  <Layout
    formRefs={{
      name: null,
    }}
    errors={{}}
    errGlobalMsg=""
    hasChanges
    isLoading
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const ErrorField = () => (
  <Layout
    formRefs={{
      name: null,
    }}
    errors={{
      name: {
        type: 'validationError',
        message: 'Name is too short',
      },
    }}
    errGlobalMsg=""
    hasChanges
    isLoading={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const ErrorGlobal = () => (
  <Layout
    formRefs={{
      name: null,
    }}
    errors={{}}
    errGlobalMsg="Internal server error"
    hasChanges
    isLoading={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);
