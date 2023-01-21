import { useRouter } from 'next/router';
import React from 'react';

import { Button } from '@components/uiKit/Button';
import { Flex } from '@components/uiKit/Flex';
import { IconArrowLeft } from '@components/uiKit/Icons';
import { Text } from '@components/uiKit/Text';

export type TKanbanBoardTitleProps ={
  title: string;
  onClickEditModal:()=>void;
  canModerate:boolean
};

const KanbanBoardTitle = (props:TKanbanBoardTitleProps): React.ReactElement | null => {
  const {
    title,
    canModerate,
    onClickEditModal,
  } = props;

  const router = useRouter();

  const handleClickGoBack = () => {
    router.back();
  };

  return (
    <Flex
      mb={4}
      alignItems="center"
      gap={3}
    >
      <Button
        StartIcon={IconArrowLeft}
        onClick={handleClickGoBack}
      />
      <Text
        as="h1"
        fontSize={[6, 8]}
        fontWeight={1}
        mb={1}
        role={canModerate ? 'button' : ''}
        canHover={canModerate}
        onClick={onClickEditModal}
      >
        {title}
      </Text>
    </Flex>
  );
};

export {
  KanbanBoardTitle,
};
