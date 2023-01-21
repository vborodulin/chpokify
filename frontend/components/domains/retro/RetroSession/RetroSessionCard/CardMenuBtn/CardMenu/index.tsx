import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsActions } from '@Redux/domains/retroSessions/actions';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroSessionsCardsSelectors } from '@Redux/domains/retroSessionsCards/selectors';
import { retroSessionsRelationsAsyncActions } from '@Redux/domains/retroSessionsRelations/asyncActions';
import { retroTemplatesSelectors } from '@Redux/domains/retroTemplates/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { TCardMenuBtnProps } from '@components/domains/retro/RetroSession/RetroSessionCard/CardMenuBtn';

import { IconArrowRightAlt, IconDelete, IconEdit } from '@components/uiKit/Icons';
import { ListItemAdornment } from '@components/uiKit/ListItemAdornment';
import { ListItemDivider } from '@components/uiKit/ListItemDivider';
import { ListItemText } from '@components/uiKit/ListItemText';
import { Menu } from '@components/uiKit/Menu';
import { MenuItem } from '@components/uiKit/MenuItem';

import { TRANS } from '@components/utils/types';

type TCardMenu = Pick<TCardMenuBtnProps, 'cardId' | 'columnId' | 'isColumnAction' | 'onClose'>;

const CardMenu = React.forwardRef<any, TCardMenu>((props, ref) => {
  const {
    cardId,
    columnId,
    isColumnAction,
    onClose,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const retroSessionId = useSelector(retroSessionsSelectors.getCurrId);
  const retroTemplateId = useSelector(retroTemplatesSelectors.getCurrId);
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);
  const isColumnActionsSidebarOpen = useSelector(retroSessionsSelectors.getIsColumnActionsSidebarOpen);
  const hasCombinedCards = useSelector(retroSessionsCardsSelectors.getHasCombinedCards)(cardId);

  const handlePreventCloseSet = () => {
    dispatch(uiActions.modalPreventCloseSet(true));
  };

  const handleMakeInAction = async () => {
    if (isColumnAction || !canModerate) {
      return;
    }

    if (!isColumnActionsSidebarOpen) {
      dispatch(retroSessionsActions.columnActionsSidebarToggle());
    }

    onClose();

    await dispatch(retroSessionsRelationsAsyncActions.moveCardInActionColumn(
      retroSessionId,
      retroTemplateId,
      columnId,
      cardId
    ));
  };

  const handleEdit = () => {
    handlePreventCloseSet();

    if (hasCombinedCards && !isColumnAction) {
      dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_CARD_COMBINED_EDIT_CARD, {
        retroCardId: cardId,
      }));
      return;
    }

    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_CARD_EDIT, {
      retroCardId: cardId,
      isColumnAction,
    }));
  };

  const handleRemove = () => {
    handlePreventCloseSet();
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_CARD_REMOVE, {
      retroCardId: cardId,
      retroColumnId: columnId,
    }));
  };

  const renderMakeActionItem = () => {
    if (isColumnAction || !canModerate) {
      return null;
    }

    return (
      <MenuItem
        isButton
        onClick={handleMakeInAction}
      >
        <ListItemAdornment>
          <IconArrowRightAlt />
        </ListItemAdornment>

        <ListItemText>
          {t('pages.retro.cardMenu.makeAction')}
        </ListItemText>
      </MenuItem>
    );
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
        {t('pages.retro.cardMenu.edit')}
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
          {t('pages.retro.cardMenu.delete')}
        </ListItemText>
      </MenuItem>
    </>
  );

  const renderContent = () => (
    <>
      {renderMakeActionItem()}
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

CardMenu.displayName = 'CardMenu';

export {
  CardMenu,
};
