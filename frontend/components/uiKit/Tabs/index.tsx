import { withStyles } from '@material-ui/core/styles';
import MaterialTabs, { TabsProps } from '@material-ui/core/Tabs';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';

import { getTheme } from '@styles/theme';

export type TTabsProps = TabsProps;

const Tabs = (props: TTabsProps): React.ReactElement | null => {
  const themeType = useSelector(authSelectors.getCurrUserThemeType);
  const theme = getTheme(themeType);

  const StyledTabs = withStyles({
    root: {
      borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
      backgroundColor: theme.colors.primary.normal,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  })(MaterialTabs);

  return (
    <StyledTabs
      {...props}
    />
  );
};

export {
  Tabs,
};
