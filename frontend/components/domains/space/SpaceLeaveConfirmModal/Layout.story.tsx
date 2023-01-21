import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Layout
    errGlobalMsg=""
    isLoading={false}
    onCancel={() => {}}
    onLeave={() => {}}
  />
);

export const Loading = () => (
  <Layout
    errGlobalMsg=""
    isLoading
    onCancel={() => {}}
    onLeave={() => {}}
  />
);

export const ErrorGlobal = () => (
  <Layout
    errGlobalMsg="Internal server error"
    isLoading={false}
    onCancel={() => {}}
    onLeave={() => {}}
  />
);
