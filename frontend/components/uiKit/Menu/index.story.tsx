import base from 'paths.macro';
import React from 'react';

import { List } from '@components/uiKit/List';
import { ListItem } from '@components/uiKit/ListItem';
import { ListItemText } from '@components/uiKit/ListItemText';

import { getStoryName } from '@lib/getStoryName';

import { Menu } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Menu>
    <List>
      <ListItem>
        <ListItemText>
          Edit
        </ListItemText>
      </ListItem>

      <ListItem>
        <ListItemText>
          RemoveP
        </ListItemText>
      </ListItem>
    </List>
  </Menu>
);
