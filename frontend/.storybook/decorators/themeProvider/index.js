import React from 'react';
import { makeDecorator } from '@storybook/addons';

import { ThemeContextProvider } from './ThemeContextProvider';
import { localTheme } from './localTheme';
import {DECORATOR_NAME} from './constants';

const themeProvider = makeDecorator({
  name: DECORATOR_NAME,
  wrapper: (getStory, context) => {
    return (
      <ThemeContextProvider theme={localTheme.get()}>
        {getStory(context)}
      </ThemeContextProvider>
    );
  }
});

export {
  themeProvider
}
