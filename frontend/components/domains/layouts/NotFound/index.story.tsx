import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { NotFound } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <NotFound />
);
