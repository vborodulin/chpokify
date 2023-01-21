import base from 'paths.macro';
import React from 'react';
import styled from 'styled-components';

import { Box } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex/index';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

const StyledBox = styled(Box)`
height: 100px;
width: 100px;
`;

export const Default = () => (
  <Flex>
    <StyledBox
      bg="primary.normal"
    />
    <StyledBox
      bg="positive.normal"
    />
    <StyledBox
      bg="negative.normal"
    />
  </Flex>
);
