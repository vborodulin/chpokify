import base from 'paths.macro';
import React from 'react';

import { Text } from '@components/uiKit/Text';

import { getStoryName } from '@lib/getStoryName';

import { PaperFooter } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <PaperFooter>
    <Text>
      Hello, world!
    </Text>
  </PaperFooter>
);
