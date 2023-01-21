import React from 'react';
import { useSelector } from 'react-redux';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { RetroSessionPeople } from '@components/domains/retro/RetroSession/RetroSessionPeople';

import { Menu, TMenuProps } from '@components/uiKit/Menu';
import { Paper, TPaperProps } from '@components/uiKit/Paper';

type TRetroSessionPeopleMenuProps = Partial<TMenuProps> & {
  paperProps: Partial<TPaperProps>
};

const WIDTH_SETTINGS_SIDEBAR = 360;

const RetroSessionPeopleMenu = React.forwardRef<any, TRetroSessionPeopleMenuProps>((props, ref) => {
  const {
    paperProps,
    ...other
  } = props;

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  if (!canModerate) {
    return null;
  }

  return (
    <Menu
      ref={ref}
      width={['auto', `${WIDTH_SETTINGS_SIDEBAR}px`]}
      {...other}
    >
      <Paper
        variant="card"
        {...paperProps}
      >
        <RetroSessionPeople />
      </Paper>
    </Menu>
  );
});

RetroSessionPeopleMenu.displayName = 'RetroSessionPeopleMenu';

export {
  RetroSessionPeopleMenu,
};
