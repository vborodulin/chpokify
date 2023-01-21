import base from 'paths.macro';
import React from 'react';

import { IconAdd, IconEdit } from '@components/uiKit/Icons';

import { getStoryName } from '@lib/getStoryName';

import { EntityItem } from './index';

export default {
  title: getStoryName(base),
};

export const Button = () => (
  <EntityItem
    type="button"
    item="CrazyHeart"
  />
);

export const Link = () => (
  <EntityItem
    type="link"
    linkProps={{
      href: '/',
    }}
    item="CrazyHeart"
  />
);

export const WithStartAdornment = () => (
  <EntityItem
    type="button"
    startAdornment={<IconAdd />}
    item="CrazyHeart"
  />
);

export const WithHoverIcon = () => (
  <EntityItem
    type="button"
    startAdornment={<IconAdd />}
    HoverIcon={IconEdit}
    item="CrazyHeart"
  />
);

export const WithEndAdornment = () => (
  <EntityItem
    type="button"
    item="LiveXP"
    startAdornment={<IconAdd />}
    endAdornment="10"
    HoverIcon={IconEdit}
  />
);

export const CantInteract = () => (
  <EntityItem
    type="default"
    item="LiveXP"
    startAdornment={<IconAdd />}
    endAdornment="10"
  />
);
