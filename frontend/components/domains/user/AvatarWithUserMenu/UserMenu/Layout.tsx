import { TEntityID, THEME_TYPES } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { UserAvatar } from '@components/domains/user/UserAvatar';

import {
  IconBrightness,
  IconMobilePhoneIphone,
  IconSettingsOutline,
  IconSignOut,
  IconSupport,
} from '@components/uiKit/Icons';
import { Image } from '@components/uiKit/Image';
import { List } from '@components/uiKit/List';
import { ListItemAdornment } from '@components/uiKit/ListItemAdornment';
import { ListItemDivider } from '@components/uiKit/ListItemDivider';
import { ListItemEndAdornment } from '@components/uiKit/ListItemEndAdornment';
import { ListItemText } from '@components/uiKit/ListItemText';
import { Menu, TMenuProps } from '@components/uiKit/Menu';
import { MenuItem } from '@components/uiKit/MenuItem';
import { Switcher } from '@components/uiKit/Switcher';

import { LOCALE, TRANS } from '@components/utils/types';

import { detect } from '@lib/detect';

export type TUserMenuLayoutProps = Partial<TMenuProps> & {
  username: string;
  currUserId: TEntityID;
  themeType: THEME_TYPES;
  locale: LOCALE;
  onToggleThemeType: () => void;
  onAccountSettingsClick: () => void;
  onClose: () => void;
  onSignOut: () => void;
  onSupportClick: () => void;
  onLocaleClick: () => void;
  onAppStoreClick: () => void;
}

const Layout = React.forwardRef<any, TUserMenuLayoutProps>((props, ref) => {
  const {
    username,
    currUserId,
    locale,
    themeType,
    onClose,
    onToggleThemeType,
    onAccountSettingsClick,
    onSignOut,
    onSupportClick,
    onLocaleClick,
    onAppStoreClick,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const handleThemeSwitcherChange = (event: React.ChangeEvent) => {
    event.stopPropagation();
    event.preventDefault();
    onToggleThemeType();
  };

  const renderDarkThemeSwitcher = () => (
    <MenuItem
      isButton
      onClick={onToggleThemeType}
      onClose={onClose}
    >
      <ListItemAdornment>
        <IconBrightness />
      </ListItemAdornment>

      <ListItemText>
        {t('userMenu.darkThemeItem')}
      </ListItemText>

      <ListItemEndAdornment>
        <Switcher
          name="dark-theme"
          checked={themeType === THEME_TYPES.DARK}
          onChange={handleThemeSwitcherChange}
        />
      </ListItemEndAdornment>
    </MenuItem>
  );

  const renderLocaleItem = () => {
    let img = '/images/locale-en';

    if (locale === LOCALE.RU) {
      img = '/images/locale-ru';
    }

    return (
      <MenuItem
        isButton
        onClick={onLocaleClick}
        onClose={onClose}
      >
        <ListItemAdornment>
          <Image
            src={`${img}.jpg`}
            alt="locale"
            width="24px"
            height="17px"
            layout="intrinsic"
          />
        </ListItemAdornment>

        <ListItemText>
          {t('userMenu.localeItem')}
        </ListItemText>
      </MenuItem>
    );
  };

  const renderIOSAppItem = () => (
    <MenuItem
      isButton
      onClick={onAppStoreClick}
      onClose={onClose}
    >
      <ListItemAdornment>
        <IconMobilePhoneIphone />
      </ListItemAdornment>

      <ListItemText>
        {t('userMenu.appStoreItem')}
      </ListItemText>
    </MenuItem>
  );
  return (
    <Menu
      ref={ref}
      width="240px"
      {...other}
    >
      <List>
        <MenuItem>
          <ListItemAdornment>
            <UserAvatar
              userId={currUserId}
              variant="circle"
              dimension="100"
            />
          </ListItemAdornment>

          <ListItemText>
            {username}
          </ListItemText>
        </MenuItem>

        <ListItemDivider />

        {renderDarkThemeSwitcher()}

        <MenuItem
          isButton
          onClick={onAccountSettingsClick}
          onClose={onClose}
        >
          <ListItemAdornment>
            <IconSettingsOutline />
          </ListItemAdornment>

          <ListItemText>
            {t('userMenu.accountSettingsItem')}
          </ListItemText>
        </MenuItem>

        {
          renderLocaleItem()
        }
        {
          renderIOSAppItem()
        }

        {
          !detect.isChpokifyIOSApp
          && (
            <MenuItem
              isButton
              onClick={onSupportClick}
              onClose={onClose}
            >
              <ListItemAdornment>
                <IconSupport />
              </ListItemAdornment>

              <ListItemText>
                {t('userMenu.supportItem')}
              </ListItemText>
            </MenuItem>
          )
        }

        <ListItemDivider />

        <MenuItem
          isButton
          onClick={onSignOut}
          onClose={onClose}
        >
          <ListItemAdornment>
            <IconSignOut />
          </ListItemAdornment>

          <ListItemText>
            {t('userMenu.signOutItem')}
          </ListItemText>
        </MenuItem>

      </List>
    </Menu>
  );
});

Layout.displayName = 'Layout';

export {
  Layout,
};
