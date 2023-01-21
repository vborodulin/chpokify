import base from 'paths.macro';
import React from 'react';

import { IconLink } from '@components/uiKit/Icons';
import { LinkComponent } from '@components/uiKit/Link';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <LinkComponent
    EndIcon={IconLink}
    StartIcon={IconLink}
    href="/"
  >
    Link with icon
  </LinkComponent>
);
