import { useTranslation } from 'next-i18next';
import React from 'react';

import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { TRetroSessionItemMenuBtnProps } from '@components/domains/retro/buttons/RetroSessionItemMenuBtn';

import { IconDelete, IconEdit } from '@components/uiKit/Icons';
import { ListItemAdornment } from '@components/uiKit/ListItemAdornment';
import { ListItemDivider } from '@components/uiKit/ListItemDivider';
import { ListItemText } from '@components/uiKit/ListItemText';
import { Menu } from '@components/uiKit/Menu';
import { MenuItem } from '@components/uiKit/MenuItem';

import { TRANS } from '@components/utils/types';

type TRetroSessionMenu = Pick<TRetroSessionItemMenuBtnProps, 'retroSessionId'>

const RetroSessionMenu = React.forwardRef<any, TRetroSessionMenu>((props, ref) => {
  const {
    retroSessionId,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const handleEdit = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_SESSION_EDIT, {
      retroSessionId,
    }));
  };

  const handleRemove = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_SESSION_REMOVE, {
      retroSessionId,
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
        {t('pages.retro.sessionMenu.edit')}
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
          {t('pages.retro.sessionMenu.delete')}
        </ListItemText>
      </MenuItem>
    </>
  );

  const renderContent = () => (
    <>
      {renderEditItem()}
      {renderRemoveItem()}
    </>
  );

  return (
    <Menu
      ref={ref}
      width="180px"
      {...other}
    >
      {
        renderContent()
      }
    </Menu>
  );
});

RetroSessionMenu.displayName = 'RetroSessionMenu';

export {
  RetroSessionMenu,
};
