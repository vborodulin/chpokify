import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider as ThemeStyledProvider } from 'styled-components';

import { authSelectors } from '@Redux/domains/auth/selectors';

import { getTheme } from '@styles';

export type TThemeProvider = {
  children: React.ReactNode;
}

const ThemeProvider = (props: TThemeProvider): React.ReactElement | null => {
  const { children } = props;

  const themeType = useSelector(authSelectors.getCurrUserThemeType);

  return (
    <ThemeStyledProvider
      theme={getTheme(themeType)}
    >
      {children}
    </ThemeStyledProvider>
  );
};

export {
  ThemeProvider,
};
