import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { Layout } from './Layout';

export type TBoardMenuProps = {
  boardId: TEntityID;
  canModerate:boolean
};

const BoardMenu = React.forwardRef<any, TBoardMenuProps>((props, ref) => {
  const {
    boardId,
    canModerate,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const handleEdit = () => {
    if (!canModerate) {
      return;
    }

    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.KANBAN_BOARD_EDIT, {
      boardId,
      spaceId: currSpaceId,
    }));
  };

  const handleRemove = () => {
    if (!canModerate) {
      return;
    }

    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.KANBAN_BOARD_REMOVE, {
      boardId,
      spaceId: currSpaceId,
    }));
  };

  return (
    <Layout
      hasRemoveItem
      hasEditItem
      canModerate={canModerate}
      ref={ref}
      onEdit={handleEdit}
      onRemove={handleRemove}
      {...other}
    />
  );
});

BoardMenu.displayName = 'BoardMenu';

export {
  BoardMenu,
};
