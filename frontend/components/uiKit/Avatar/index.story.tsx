import base from 'paths.macro';
import React from 'react';
import { css } from 'styled-components';

import { IconUserAvatar } from '@components/uiKit/Icons';

import { getStoryName } from '@lib/getStoryName';

import { Avatar } from './index';

export default {
  title: getStoryName(base),
};

export const Dimension100Circle = () => (
  <Avatar
    variant="circle"
    dimension="100"
  >
    A
  </Avatar>
);

export const Dimension200Circle = () => (
  <Avatar
    variant="circle"
    dimension="200"
  >
    A
  </Avatar>
);

export const Dimension300Circle = () => (
  <Avatar
    variant="circle"
    dimension="300"
  >
    A
  </Avatar>
);

export const WithIconRounded = () => (
  <Avatar
    variant="rounded"
    dimension="200"
  >
    <IconUserAvatar
      css={css`fill: ${({ theme }) => theme.colors.font.invert}`}
    />
  </Avatar>
);
