import base from 'paths.macro';
import React from 'react';
import styled from 'styled-components';

import { Box } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

const ColorBox = styled(Box)`
height: 100px;
width: 100px;
`;

export const Surface = () => (
  <Flex>
    <ColorBox
      bg="surface.normal"
    />
    <ColorBox
      bg="surface.a_10"
    />
    <ColorBox
      bg="surface.a_20"
    />
    <ColorBox
      bg="surface.d_10"
    />
  </Flex>
);

export const Base = () => (
  <Flex>
    <ColorBox
      bg="base.normal"
    />
    <ColorBox
      bg="base.a_10"
    />
    <ColorBox
      bg="base.a_20"
    />
    <ColorBox
      bg="base.a_30"
    />
    <ColorBox
      bg="base.a_40"
    />
    <ColorBox
      bg="base.a_50"
    />
    <ColorBox
      bg="base.d_10"
    />
  </Flex>
);

export const Primary = () => (
  <Flex>
    <ColorBox
      bg="primary.normal"
    />
    <ColorBox
      bg="primary.a_10"
    />
    <ColorBox
      bg="primary.a_20"
    />
    <ColorBox
      bg="primary.d_10"
    />
    <ColorBox
      bg="primary.d_20"
    />
    <ColorBox
      bg="primary.d_30"
    />
    <ColorBox
      bg="primary.d_40"
    />
  </Flex>
);

export const Positive = () => (
  <Flex>
    <ColorBox
      bg="positive.normal"
    />
    <ColorBox
      bg="positive.a_10"
    />
  </Flex>
);

export const Negative = () => (
  <Flex>
    <ColorBox
      bg="negative.normal"
    />
  </Flex>
);

export const Font = () => (
  <Flex>
    <ColorBox
      bg="font.normal"
    />
    <ColorBox
      bg="font.d_10"
    />
    <ColorBox
      bg="font.d_20"
    />
    <ColorBox
      bg="font.d_30"
    />
    <ColorBox
      bg="font.d_40"
    />
    <ColorBox
      bg="font.invert"
    />
    <ColorBox
      bg="font.primary"
    />
    <ColorBox
      bg="font.primary_d_10"
    />
    <ColorBox
      bg="font.primary_d_20"
    />
    <ColorBox
      bg="font.negative"
    />
  </Flex>
);

export const BaseInvert = () => (
  <Flex>
    <ColorBox
      bg="baseInvert.normal"
    />
  </Flex>
);
