import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconAdd } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TKanbanBoardCreateBtnProps = TButtonProps & {
};

const KanbanBoardCreateBtn = (props: TKanbanBoardCreateBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const handleOpenCreateModal = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.KANBAN_BOARD_CREATE));
  };

  if (!canModerate) {
    return null;
  }

  return (
    <Button
      onClick={handleOpenCreateModal}
      StartIcon={IconAdd}
      variant="primary"
      isMobileReady
      {...other}
    >
      {t('kanban.boards.createBtn')}
    </Button>
  );
};

export {
  KanbanBoardCreateBtn,
};
