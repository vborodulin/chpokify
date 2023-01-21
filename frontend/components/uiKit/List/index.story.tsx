import base from 'paths.macro';
import React from 'react';

import { Divider } from '@components/uiKit/Divider';
import { IconInfo } from '@components/uiKit/Icons';
import { ListItem } from '@components/uiKit/ListItem';
import { ListItemAdornment } from '@components/uiKit/ListItemAdornment';
import { ListItemText } from '@components/uiKit/ListItemText';
import { Paper } from '@components/uiKit/Paper';

import { getStoryName } from '@lib/getStoryName';

import { List } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Paper
    p={0}
    variant="flat"
  >
    <List>
      <ListItem
        isButton
      >
        <ListItemAdornment>
          <IconInfo />
        </ListItemAdornment>

        <ListItemText>
          Inbox
        </ListItemText>
      </ListItem>

      <ListItem
        isButton
      >
        <ListItemText>
          Spam
        </ListItemText>
      </ListItem>

      <Divider />

      <ListItem
        isButton
      >
        <ListItemText>
          Trash
        </ListItemText>
      </ListItem>
    </List>
  </Paper>
);
