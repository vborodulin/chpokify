import base from 'paths.macro';
import React from 'react';

import { Paper } from '@components/uiKit/Paper';
import { Text } from '@components/uiKit/Text';

import { getStoryName } from '@lib/getStoryName';

import { ModalContainer } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <ModalContainer
    preventClose={false}
    isOpen
  >
    <Paper
      variant="modal"
    >
      <Text
        fontSize={5}
      >
        Hello, world!
      </Text>
    </Paper>
  </ModalContainer>
);

export const PreventClose = () => (
  <ModalContainer
    preventClose
    isOpen
  >
    <Paper
      variant="modal"
    >
      <Text
        fontSize={5}
      >
        Hello, world!
      </Text>
    </Paper>
  </ModalContainer>
);
