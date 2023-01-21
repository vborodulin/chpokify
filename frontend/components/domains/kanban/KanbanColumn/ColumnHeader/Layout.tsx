import React from 'react';
import { useSelector } from 'react-redux';

import { kanbanBoardRelationsSelectors } from '@Redux/domains/kanbanBoardRelations/selectors';
import { kanbanBoardsSelectors } from '@Redux/domains/kanbanBoards/selectors';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

import { ColumnMenuBtn } from './ColumnMenuBtn';

export type TLayoutProps = Partial<TFlexProps> & {
  columnId: string;
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    columnId,
    ...other
  } = props;

  const column = useSelector(kanbanBoardsSelectors.getColumnById)(columnId);
  const columnFromRelations = useSelector(kanbanBoardRelationsSelectors.getByColumnById)(columnId);

  if (!column || !columnFromRelations) {
    return null;
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="flex-start"
      width="100%"
      {...other}
    >
      <Flex
        flexGrow={1}
        alignItems="center"
        gap={2}
      >
        <Text
          fontSize={4}
          fontWeight={1}
        >
          {column.title}
        </Text>

        <Text
          as="span"
          fontSize={4}
          color="font.d_30"
        >
          {columnFromRelations.tasksIds.length}
        </Text>

      </Flex>

      <Flex
        alignItems="center"
        justifyContent="flex-start"
      >
        <ColumnMenuBtn
          kanbanColumnId={columnId}
        />
      </Flex>
    </Flex>
  );
};

export {
  Layout,
};
