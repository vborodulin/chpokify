import base from 'paths.macro';
import React from 'react';

import { Box } from '@components/uiKit/Box/index';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Box
    width={100}
    height={100}
    bg="primary.normal"
  />
);
