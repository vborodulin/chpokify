import { THEME_TYPES } from '@chpokify/models-types';
import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

// eslint-disable-next-line max-len
const generatedAvatarSvg = '%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22200%22%20height=%22200%22%20viewBox=%220%200%20200%20200%22%20preserveAspectRatio=%22xMidYMid%20meet%22%3E%3Cpath%20fill=%22#59b6c7%22%20d=%22M79%2016L100%2037L79%2058L58%2037ZM142%2037L121%2058L100%2037L121%2016ZM121%20184L100%20163L121%20142L142%20163ZM58%20163L79%20142L100%20163L79%20184ZM37%2058L58%2079L37%20100L16%2079ZM184%2079L163%20100L142%2079L163%2058ZM163%20142L142%20121L163%20100L184%20121ZM16%20121L37%20100L58%20121L37%20142ZM58%2058L100%2058L100%2079L58%2079ZM58%2079L79%2079L79%20100L58%20100ZM100%2079L79%20100L79%2079ZM142%2058L142%20100L121%20100L121%2058ZM121%2058L121%2079L100%2079L100%2058ZM121%20100L100%2079L121%2079ZM142%20142L100%20142L100%20121L142%20121ZM142%20121L121%20121L121%20100L142%20100ZM100%20121L121%20100L121%20121ZM58%20142L58%20100L79%20100L79%20142ZM79%20142L79%20121L100%20121L100%20142ZM79%20100L100%20121L79%20121Z%22/%3E%3Cpath%20fill=%22#464646%22%20d=%22M58%2016L58%2058L16%2058ZM184%2058L142%2058L142%2016ZM142%20184L142%20142L184%20142ZM16%20142L58%20142L58%20184Z%22/%3E%3C/svg%3E';

export const Default = () => (
  <Layout
    id="userMenu"
    asPath="/space"
    username="s0fted"
    spaces={[
      {
        _id: '1',
        name: 'LiveXP',
        generatedAvatarSvg,
        participants: [],
        teams: [],
      },
      {
        _id: '2',
        name: 'StripChat',
        generatedAvatarSvg,
        participants: [],
        teams: [],
      },
    ]}
    themeType={THEME_TYPES.LIGHT}
    // onToggleThemeType={() => {}}
    onClose={() => {}}
    onSpaceClick={() => {}}
    onAccountSettingsClick={() => {}}
    onSignOut={() => {}}
    onCreateSpace={() => {}}
  />
);
