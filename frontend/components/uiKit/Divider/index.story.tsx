import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Divider } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Divider
    minWidth="400px"
  />
);
