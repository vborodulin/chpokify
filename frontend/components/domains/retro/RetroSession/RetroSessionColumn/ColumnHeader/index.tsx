import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsRelationsSelectors } from '@Redux/domains/retroSessionsRelations/selectors';
import { retroTemplatesSelectors } from '@Redux/domains/retroTemplates/selectors';

import {
  ColumnAddCardBtn,
} from '@components/domains/retro/RetroSession/RetroSessionColumn/ColumnHeader/ColumnAddCardBtn';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

import { ColumnMenuBtn } from './ColumnMenuBtn';

export type TColumnHeaderProps = Partial<TFlexProps> & {
  columnId: string;
  popperCreateCardId: string;
};

const ColumnHeader = (props: TColumnHeaderProps): React.ReactElement | null => {
  const {
    columnId,
    popperCreateCardId,
    ...other
  } = props;

  const [targetElement, setTargetElement] = useState<any>(null);

  const column = useSelector(retroTemplatesSelectors.getColumnById)(columnId);
  const countCards = useSelector(retroSessionsRelationsSelectors.getCountCardsByColumnById)(columnId);

  const renderColumnMenuBtn = () => {
    if (column?.isAction) {
      return null;
    }

    return (
      <ColumnMenuBtn
        retroColumnId={columnId}
        targetElement={targetElement}
      />
    );
  };

  if (!column) {
    return null;
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="flex-start"
      width="100%"
      minHeight="40px"
      {...other}
    >
      <Flex
        ref={setTargetElement}
        flexGrow={1}
        justifyContent="space-between"
      >
        <Flex
          gap={2}
          alignItems="center"

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
            {countCards}
          </Text>
        </Flex>
        <Flex>
          {
            renderColumnMenuBtn()
          }
        </Flex>

      </Flex>
      <ColumnAddCardBtn
        popperCreateCardId={popperCreateCardId}
      />
    </Flex>
  );
};

export {
  ColumnHeader,
};
