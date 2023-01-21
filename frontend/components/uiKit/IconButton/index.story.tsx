import base from 'paths.macro';
import React from 'react';

import { IconAdd } from '@components/uiKit/Icons';

import { getStoryName } from '@lib/getStoryName';

import { IconButton } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <IconButton>
    <IconAdd />
  </IconButton>
);
