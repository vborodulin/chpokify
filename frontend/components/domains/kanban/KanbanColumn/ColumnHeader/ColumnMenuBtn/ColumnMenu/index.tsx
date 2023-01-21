import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { kanbanBoardsSelectors } from '@Redux/domains/kanbanBoards/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { Layout } from './Layout';

export type TColumnMenuProps = {
  kanbanColumnId: TEntityID;
  canModerate:boolean
};

const ColumnMenu = React.forwardRef<any, TColumnMenuProps>((props, ref) => {
  const {
    kanbanColumnId,
    canModerate,
    ...other
  } = props;
  const dispatch = useAppDispatch();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const currBoardId = useSelector(kanbanBoardsSelectors.getCurrBoardId);

  const handleEdit = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.KANBAN_COLUMN_EDIT, {
      kanbanColumnId,
      kanbanBoardId: currBoardId,
      spaceId: currSpaceId,
    }));
  };

  const handleRemove = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.KANBAN_COLUMN_REMOVE, {
      kanbanColumnId,
      kanbanBoardId: currBoardId,
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

ColumnMenu.displayName = 'ColumnMenu';

export {
  ColumnMenu,
};
