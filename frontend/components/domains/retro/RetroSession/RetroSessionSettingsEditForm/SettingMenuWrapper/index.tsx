import React from 'react';

import { ListItemAdornment } from '@components/uiKit/ListItemAdornment';
import { ListItemText } from '@components/uiKit/ListItemText';
import { MenuItem, TMenuItemProps } from '@components/uiKit/MenuItem';
import { TTextProps } from '@components/uiKit/Text';

type TSettingMenuWrapperProps = TMenuItemProps & {
  title: string;
  icon: React.ReactNode;
  setting?: React.ReactNode;
  textProps?: Partial<TTextProps>;
  onClick: () => void;
}

const SettingMenuWrapper = (props: TSettingMenuWrapperProps): React.ReactElement => {
  const {
    title,
    icon,
    setting,
    onClick,
    textProps = {},
    ...other
  } = props;

  return (
    <MenuItem
      isButton
      onClick={onClick}
      {...other}
    >
      <ListItemAdornment>
        {
          icon
        }
      </ListItemAdornment>

      <ListItemText
        textProps={textProps}
      >
        {
          title
        }
      </ListItemText>
      {
        setting
        && (
          <ListItemAdornment>
            {
              setting
            }
          </ListItemAdornment>
        )
      }
    </MenuItem>

  );
};

export {
  SettingMenuWrapper,
};
