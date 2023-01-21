import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { PageLayout } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <PageLayout>
    <h1>Hello, world</h1>
  </PageLayout>
);
