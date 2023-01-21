import {THEMES} from './constants';

const STORAGE_KEY = 'chpokify-storybook-theme';

const get = () => {
  return window.localStorage.getItem(STORAGE_KEY) || THEMES.LIGHT;
};

const set = (theme) => {
  window.localStorage.setItem(STORAGE_KEY, theme);
};

export const localTheme = {
  set,
  get,
};
