import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { storiesSelectors } from '@Redux/domains/stories/selectors';

import { TaskMenuBtn } from '@components/domains/kanban/KanbanTask/TaskMenuBtn';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { IconNote } from '@components/uiKit/Icons';
import { Text } from '@components/uiKit/Text';

export type TLayoutProps = {
  taskId: string;
  columnId: string;
};

const Root = styled(Flex)<TFlexProps>`
  background-color: ${({ theme }) => theme.colors.base.normal};
  cursor: grab;

  &:hover {
    border-color: ${({ theme }) => theme.colors.base.a_30};
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
`;

const Layout = React.forwardRef<any, TLayoutProps>((props, ref) => {
  const {
    taskId,
    columnId,
    ...other
  } = props;

  const taskTitle = useSelector(storiesSelectors.getTitle)(taskId);
  const taskDescription = useSelector(storiesSelectors.getDescription)(taskId);

  if (!taskTitle) {
    return null;
  }

  return (
    <Root
      ref={ref}
      flexDirection="column"
      position="relative"
      backgroundColor="surface.normal"
      borderRadius={2}
      p={2}
      {...other}
    >

      <TaskMenuBtn
        taskId={taskId}
        columnId={columnId}
        mr={2}
        mt={2}
        css={css`position: absolute; right: 0; top: 0`}
      />

      <Flex
        alignItems="center"
        mr={9}
      >
        {
          taskDescription
          && (
          <IconNote
            width="20px"
            height="20px"
            mr={1}
          />
          )
        }

        <Text
          fontSize={2}
          whiteSpace="pre-line"
        >
          {taskTitle}
        </Text>

      </Flex>
    </Root>
  );
});

export {
  Layout,
};
