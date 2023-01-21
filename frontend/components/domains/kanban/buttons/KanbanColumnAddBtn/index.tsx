import React from 'react';

import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { TFlexProps } from '@components/uiKit/Flex';

import { Layout } from './Layout';

export type TKanbanColumnAddBtnProps = TFlexProps & {
  canModerate:boolean
};

const KanbanColumnAddBtn = (props: TKanbanColumnAddBtnProps): React.ReactElement | null => {
  const {
    canModerate,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const handleAddColumn = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.KANBAN_COLUMN_ADD));
  };

  if (!canModerate) {
    return null;
  }

  return (
    <Layout
      onAddColumn={handleAddColumn}
      {...other}
    />
  );
};

export {
  KanbanColumnAddBtn,
};
