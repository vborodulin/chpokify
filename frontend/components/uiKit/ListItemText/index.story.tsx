import base from 'paths.macro';
import React from 'react';

import { ListItem } from '@components/uiKit/ListItem';

import { getStoryName } from '@lib/getStoryName';

import { ListItemText } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <ListItem
    isButton
  >
    <ListItemText>
      List item text
    </ListItemText>
  </ListItem>
);
