import { TEntityID } from '@chpokify/models-types';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import shortId from 'shortid';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { IconBtnWithMenu } from '@components/domains/shared/IconBtnWithMenu';

import { BoardMenu, TBoardMenuProps } from './BoardMenu';

export type TBoardMenuBtnProps = Partial<TBoardMenuProps> & {
  boardId: TEntityID;
};

const BoardMenuBtn = (props: TBoardMenuBtnProps): React.ReactElement | null => {
  const {
    boardId,
    ...other
  } = props;

  const menuIdRef = useRef(shortId());
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  if (!canModerate) {
    return null;
  }

  return (
    <IconBtnWithMenu
      popperId={menuIdRef.current}
      menu={(
        <BoardMenu
          canModerate={canModerate}
          boardId={boardId}
        />
        )}
      {...other}
    />
  );
};

export {
  BoardMenuBtn,
};
