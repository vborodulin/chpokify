import base from 'paths.macro';
import React from 'react';

import { Box } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex';
import { Spacer } from '@components/uiKit/Spacer/index';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Flex>
    <Spacer
      mr={[5]}
    >
      <Box
        bg="primary.normal"
        width={200}
        height={200}
      />
    </Spacer>

    <Spacer
      mr={[5]}
    >
      <Box
        bg="primary.normal"
        width={200}
        height={200}
      />
    </Spacer>

    <Spacer
      mr={[5]}
    >
      <Box
        bg="primary.normal"
        width={200}
        height={200}
      />
    </Spacer>
  </Flex>
);
