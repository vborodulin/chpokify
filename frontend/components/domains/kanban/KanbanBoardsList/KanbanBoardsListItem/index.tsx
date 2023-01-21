import { dateHelpers } from '@chpokify/helpers';
import { TEntityID, TKanbanBoard } from '@chpokify/models-types';
import { routing } from '@chpokify/routing';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import {
  BoardMenuBtn,
  TBoardMenuBtnProps,
} from '@components/domains/kanban/KanbanBoardsList/KanbanBoardsListItem/BoardMenuBtn';

import { Box } from '@components/uiKit/Box';
import { Grid, TGridProps } from '@components/uiKit/Grid';
import { Text } from '@components/uiKit/Text';

const StylesBoardMenuBtn = styled(BoardMenuBtn)<TBoardMenuBtnProps>`
  position: absolute;
  right: ${({ theme }) => theme.space[3]};
  top: 50%;
  transform: translate3d(0, -50%, 0);
`;

const Root = styled(Grid)<TGridProps>`
  background-color: ${({ theme }) => theme.colors.base.a_10};
  border-radius: ${({ theme }) => theme.radii[2]};
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.space[4]};
  min-height: 64px;
  position: relative;


  &:hover {
    background-color: ${({ theme }) => theme.colors.base.a_20};
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

export type TKanbanBoardsListItemProps = Partial<TGridProps> & {
  board: TKanbanBoard;
  spaceId: TEntityID;
  canModerate: boolean
};

const KanbanBoardsListItem = (props: TKanbanBoardsListItemProps): React.ReactElement | null => {
  const {
    board,
    spaceId,
    canModerate,
    ...other
  } = props;

  return (
    <Link
      href={routing.getKanbanBoardUrlTemplate()}
      // @ts-ignore
      as={routing.getKanbanBoardUrl(spaceId, board._id)}
    >
      <Root
        gridAutoFlow={['row', 'column']}
        gridColumnGap={6}
        gridRowGap={3}
        alignItems={['start', 'center']}
        p={3}
        {...other}
      >
        <Box
          flexGrow={1}
        >
          <Text
            fontSize={3}
            fontWeight={1}
            ellipses
            mb={1}
          >
            {board.title}
          </Text>

          <Box>
            <Text
              as="span"
              fontSize={1}
              color="font.d_20"
            >
              {dateHelpers.formatAppointmentDateTime(new Date(board.createdAt || ''))}
            </Text>
          </Box>
        </Box>
        {
          canModerate && (
            <StylesBoardMenuBtn
              boardId={board._id}
            />
          )
        }
      </Root>
    </Link>
  );
};

export {
  KanbanBoardsListItem,
};
