import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Layout
    menuId="poker-story-menu"
    story={{
      _id: '1',
      title: 'Altkraft Data Integration (part 3): Fan Club, Notify Online, Notify Private Message',
      spaceId: '1',
    }}
    score={6}
    isActive={false}
    isSelected={false}
    isMenuOpen={false}
  />
);

export const Selected = () => (
  <Layout
    menuId="poker-story-menu"
    story={{
      _id: '1',
      title: 'Altkraft Data Integration (part 3): Fan Club, Notify Online, Notify Private Message',
      spaceId: '1',
    }}
    score={6}
    isActive={false}
    isSelected
    isMenuOpen={false}
  />
);

export const Active = () => (
  <Layout
    menuId="poker-story-menu"
    story={{
      _id: '1',
      title: 'Altkraft Data Integration (part 3): Fan Club, Notify Online, Notify Private Message',
      spaceId: '1',
    }}
    score={0}
    isActive
    isSelected={false}
    isMenuOpen={false}
  />
);

export const ActiveAndSelected = () => (
  <Layout
    menuId="poker-story-menu"
    story={{
      _id: '1',
      title: 'Altkraft Data Integration (part 3): Fan Club, Notify Online, Notify Private Message',
      spaceId: '1',
    }}
    score={0}
    isActive
    isSelected
    isMenuOpen={false}
  />
);

export const MenuOpen = () => (
  <Layout
    menuId="poker-story-menu"
    story={{
      _id: '1',
      title: 'Altkraft Data Integration (part 3): Fan Club, Notify Online, Notify Private Message',
      spaceId: '1',
    }}
    score={0}
    isActive
    isSelected
    isMenuOpen
  />
);
