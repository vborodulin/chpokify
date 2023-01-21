import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Layout
    isLoading={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const IsLoading = () => (
  <Layout
    isLoading={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);
