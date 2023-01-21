import React from 'react';
import { useSelector } from 'react-redux';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { RetroSessionSettingsEditForm } from '@components/domains/retro/RetroSession/RetroSessionSettingsEditForm';

import { Menu } from '@components/uiKit/Menu';

type TRetroSessionSettingsMenuProps = {};

const WIDTH_SETTINGS_SIDEBAR = 286;

const RetroSessionSettingsMenu = React.forwardRef<any, TRetroSessionSettingsMenuProps>((props, ref) => {
  const { ...other } = props;

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  if (!canModerate) {
    return null;
  }

  return (
    <Menu
      ref={ref}
      width={`${WIDTH_SETTINGS_SIDEBAR}px`}
      {...other}
    >
      <RetroSessionSettingsEditForm />
    </Menu>
  );
});

RetroSessionSettingsMenu.displayName = 'RetroSessionSettingsMenu';

export {
  RetroSessionSettingsMenu,
};
