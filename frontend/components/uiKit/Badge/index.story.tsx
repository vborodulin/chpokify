import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Badge } from './index';

export default {
  title: getStoryName(base),
};

export const Size100 = () => (
  <Badge
    size="100"
  >
    Admin
  </Badge>
);

export const Size200 = () => (
  <Badge
    size="200"
  >
    14 days free trial
  </Badge>
);
