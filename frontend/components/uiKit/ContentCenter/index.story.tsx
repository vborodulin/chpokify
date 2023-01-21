import base from 'paths.macro';
import React from 'react';

import { Text } from '@components/uiKit/Text';

import { getStoryName } from '@lib/getStoryName';

import { ContentCenter } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <ContentCenter>
    <Text>
      Hello, world!
    </Text>
  </ContentCenter>
);
