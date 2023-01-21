import { routing, ROUTING_DEEPLINK } from '@chpokify/routing';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { authRepoOperations } from '@Redux/domains/authRepo/operations';
import { useAppDispatch } from '@Redux/hooks';

import { TPaperProps } from '@components/uiKit/Paper';

import { LOCALE } from '@components/utils/types';

import { detect } from '@lib/detect';
import { setLocale } from '@lib/locale';
import { support } from '@lib/support';

import { Layout } from './Layout';

export type TUserMenuProps = Partial<TPaperProps> & {
  onClose?: () => void;
};

const UserMenu = React.forwardRef<any, TUserMenuProps>((props, ref) => {
  const {
    onClose = () => {
    },
    ...other
  } = props;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const currUsername = useSelector(authSelectors.getCurrUsername);
  const currUserId = useSelector(authSelectors.getCurrUserId);

  const themeType = useSelector(authSelectors.getCurrUserThemeType);

  const handleToggleThemeType = () => {
    dispatch(authRepoOperations.toggleThemeType());
  };

  const handleOpenSupport = () => {
    support.openEmailModal();
  };

  const handleSignOut = async () => {
    if (detect.isChpokifyIOSApp) {
      try {
        await router.push(ROUTING_DEEPLINK.LOGOUT);
      } catch (err) {
        // do nothing
      }
    }

    await dispatch(authRepoOperations.signOutAndClearSpace());
  };

  const handleAccountSettingsClick = async () => {
    await router.push(
      routing.getAccountSettingsUrl()
    );
  };

  const handleLocaleClick = async () => {
    const locale = router.locale === LOCALE.EN ? LOCALE.RU : LOCALE.EN;
    setLocale(locale);
    await router.replace(router.pathname, router.asPath, { locale });
  };

  const handleAppStoreClick = () => {
    window.open(routing.getAppStoreUrl());
  };

  return (
    <Layout
      ref={ref}
      username={currUsername}
      currUserId={currUserId}
      themeType={themeType}
      locale={router.locale}
      onClose={onClose}
      onToggleThemeType={handleToggleThemeType}
      onAccountSettingsClick={handleAccountSettingsClick}
      onSignOut={handleSignOut}
      onSupportClick={handleOpenSupport}
      onLocaleClick={handleLocaleClick}
      onAppStoreClick={handleAppStoreClick}
      {...other}
    />
  );
});

UserMenu.displayName = 'UserMenu';

export {
  UserMenu,
};
