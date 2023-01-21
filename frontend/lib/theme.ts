import { THEME_TYPES } from '@chpokify/models-types';

import { detect } from '@lib/detect';
import { isomorphicLocalStorage } from '@lib/isomorphicStorage';

const STORAGE_KEY = 'theme';

const getSavedTheme = () => isomorphicLocalStorage.getItem(STORAGE_KEY);

const get = (): THEME_TYPES => {
  const savedTheme = getSavedTheme();

  if (savedTheme === THEME_TYPES.LIGHT || savedTheme === THEME_TYPES.DARK) {
    return savedTheme;
  }

  return detect.getIsDarkModePreferred()
    ? THEME_TYPES.DARK
    : THEME_TYPES.LIGHT;
};

const save = (theme: THEME_TYPES) => {
  isomorphicLocalStorage.setItem(STORAGE_KEY, theme);
};

export const theme = {
  save,
  get,
};
