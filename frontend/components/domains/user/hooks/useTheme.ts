import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';

import { getTheme } from '@styles';

const useTheme = () => {
  const themeType = useSelector(authSelectors.getCurrUserThemeType);
  return getTheme(themeType);
};

export {
  useTheme,
};
