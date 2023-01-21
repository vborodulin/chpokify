import base from 'paths.macro';
import React from 'react';

import { IconAddUser } from '@components/uiKit/Icons';
import { ListItem } from '@components/uiKit/ListItem';
import { ListItemText } from '@components/uiKit/ListItemText';

import { getStoryName } from '@lib/getStoryName';

import { ListItemEndAdornment } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <ListItem
    isButton
  >
    <ListItemText>
      Add user
    </ListItemText>

    <ListItemEndAdornment>
      <IconAddUser />
    </ListItemEndAdornment>
  </ListItem>
);
