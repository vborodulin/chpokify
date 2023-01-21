import { withStyles } from '@material-ui/core/styles';
import MaterialTab, { TabProps } from '@material-ui/core/Tab';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';

import { getTheme } from '@styles/theme';

export type TTabProps = TabProps;

const Tab = (props: TTabProps): React.ReactElement | null => {
  const themeType = useSelector(authSelectors.getCurrUserThemeType);
  const theme = getTheme(themeType);

  const StyledTag = withStyles({
    root: {
      textTransform: 'none',
      fontWeight: theme.fontWeights[1],
      marginRight: theme.space[4],
      fontFamily: theme.fontFamily[0],
      color: theme.colors.font.normal,
      '&:hover': {
        color: theme.colors.font.primary_d_10,
        opacity: 1,
      },
      '&$selected': {
        color: theme.colors.font.primary,
      },
      '&:focus': {
        color: theme.colors.font.primary_d_10,
      },
      '&:last-child': {
        marginRight: 0,
      },
    },
    selected: {},
  })(MaterialTab);

  return (
    <StyledTag
      {...props}
    />
  );
};

export {
  Tab,
};
