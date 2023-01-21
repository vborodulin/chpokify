import React, {useEffect} from 'react';
import {addons, types, useChannel} from '@storybook/addons';
import { Button } from '@storybook/components';
import { useAddonState } from '@storybook/api';

import {ADDON_NAME, THEMES, ADDON_ID, ADDON_INITIAL_STATE, SET_THEME_EVENT} from './constants';
import {localTheme} from './localTheme';

const ThemeControl = ({ api }) => {
  const channel = addons.getChannel();

  const [ theme, setTheme ] = useAddonState(ADDON_ID, ADDON_INITIAL_STATE);

  const handleToggle = async () => {
    const newTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;

    await setTheme(newTheme);
    channel.emit(SET_THEME_EVENT, newTheme);
  };

  useEffect(() => {
    localTheme.set(theme);
  }, [theme]);

  return (
    <Button
      onClick={handleToggle}
    >
      Toggle theme
    </Button>
  );
};

addons.register(ADDON_NAME, api => {
  addons.add(`${ADDON_NAME}/switcher`, {
    title: 'Theme Provider Switcher',
    type: types.TOOL,
    render: () => (
      <ThemeControl api={api} />
    ),
  });
});
