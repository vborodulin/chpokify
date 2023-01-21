import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

import { KanbanBoardInviteBtn } from '@components/domains/kanban/buttons/KanbanBoardInviteBtn';
import {
  BoardMenuBtn,
  TBoardMenuBtnProps,
} from '@components/domains/kanban/KanbanBoardsList/KanbanBoardsListItem/BoardMenuBtn';

import { Flex, TFlexProps } from '@components/uiKit/Flex';

import { TRANS } from '@components/utils/types';

const StylesBoardMenuBtn = styled(BoardMenuBtn)<TBoardMenuBtnProps>`
  background-color: ${({ theme }) => theme.colors.base.a_20};
`;

export type TKanbanBoardActionsProps = Partial<TFlexProps> & {
  canModerate: boolean;
  boardId:TEntityID;
  spaceId:TEntityID;
};

const KanbanBoardActions = (props: TKanbanBoardActionsProps): React.ReactElement | null => {
  const {
    boardId,
    spaceId,
    canModerate,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Flex
      alignItems="center"
      gap={3}
      {...other}
    >
      <KanbanBoardInviteBtn
        spaceId={spaceId}
        boardId={boardId}
        canModerate={canModerate}
        variant="base"
      >
        {t('kanban.board.share')}
      </KanbanBoardInviteBtn>
      {
        canModerate && (
          <StylesBoardMenuBtn
            boardId={boardId}
          />
        )
      }
    </Flex>
  );
};

export {
  KanbanBoardActions,
};
