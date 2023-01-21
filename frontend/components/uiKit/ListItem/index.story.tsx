import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { ListItem } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <ListItem
    isButton
  >
    Hello
  </ListItem>
);
