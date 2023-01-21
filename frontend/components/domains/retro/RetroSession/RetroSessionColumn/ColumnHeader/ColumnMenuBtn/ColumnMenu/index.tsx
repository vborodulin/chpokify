import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { IconDelete, IconEdit } from '@components/uiKit/Icons';
import { ListItemAdornment } from '@components/uiKit/ListItemAdornment';
import { ListItemDivider } from '@components/uiKit/ListItemDivider';
import { ListItemText } from '@components/uiKit/ListItemText';
import { Menu } from '@components/uiKit/Menu';
import { MenuItem } from '@components/uiKit/MenuItem';

import { TRANS } from '@components/utils/types';

export type TColumnMenuProps = {
  retroColumnId: TEntityID;
  canModerate: boolean;
};

const ColumnMenu = React.forwardRef<any, TColumnMenuProps>((props, ref) => {
  const {
    retroColumnId,
    canModerate,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const handleEdit = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_COLUMN_EDIT, {
      retroColumnId,
    }));
  };

  const handleRemove = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_COLUMN_REMOVE, {
      retroColumnId,
    }));
  };

  const renderEditItem = () => (
    <MenuItem
      isButton
      onClick={handleEdit}
    >
      <ListItemAdornment>
        <IconEdit />
      </ListItemAdornment>

      <ListItemText>
        {t('pages.retro.columnMenu.edit')}
      </ListItemText>
    </MenuItem>
  );

  const renderRemoveItem = () => (
    <>
      <ListItemDivider />

      <MenuItem
        isButton
        onClick={handleRemove}
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
          {t('pages.retro.columnMenu.delete')}
        </ListItemText>
      </MenuItem>
    </>
  );

  const renderContent = () => {
    if (!canModerate) {
      return null;
    }

    return (
      <>
        {renderEditItem()}
        {renderRemoveItem()}
      </>
    );
  };

  return (
    <Menu
      ref={ref}
      {...other}
    >
      {renderContent()}
    </Menu>
  );
});

ColumnMenu.displayName = 'RetroColumnMenu';

export {
  ColumnMenu,
};
