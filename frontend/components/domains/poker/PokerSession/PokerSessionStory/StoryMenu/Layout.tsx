import { useTranslation } from 'next-i18next';
import React from 'react';

import { IconDelete, IconEdit } from '@components/uiKit/Icons';
import { ListItemAdornment } from '@components/uiKit/ListItemAdornment';
import { ListItemDivider } from '@components/uiKit/ListItemDivider';
import { ListItemText } from '@components/uiKit/ListItemText';
import { Menu, TMenuProps } from '@components/uiKit/Menu';
import { MenuItem } from '@components/uiKit/MenuItem';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = Partial<TMenuProps> & {
  onEdit: () => void;
  onRemove: () => void;
  onClose?: () => void;
}

const Layout = React.forwardRef<any, TLayoutProps>((props, ref) => {
  const {
    onEdit,
    onRemove,
    onClose,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Menu
      ref={ref}
      {...other}
    >
      <MenuItem
        isButton
        onClick={onEdit}
        onClose={onClose}
      >
        <ListItemAdornment>
          <IconEdit />
        </ListItemAdornment>

        <ListItemText>
          {t('taskMenu.edit')}
        </ListItemText>
      </MenuItem>

      <ListItemDivider />

      <MenuItem
        isButton
        onClick={onRemove}
        onClose={onClose}
      >
        <ListItemAdornment>
          <IconDelete
            fill="font.negative"
          />
        </ListItemAdornment>

        <ListItemText
          textProps={{
            color: 'font.negative',
          }}
        >
          {t('taskMenu.delete')}
        </ListItemText>
      </MenuItem>
    </Menu>
  );
});

Layout.displayName = 'Layout';

export {
  Layout,
};
