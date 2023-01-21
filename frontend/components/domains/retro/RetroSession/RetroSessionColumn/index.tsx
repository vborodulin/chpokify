import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import { retroTemplatesSelectors } from '@Redux/domains/retroTemplates/selectors';

import { RetroSessionCard } from '@components/domains/retro/RetroSession/RetroSessionCard';
import { RetroSessionCards } from '@components/domains/retro/RetroSession/RetroSessionCards';

import { Flex } from '@components/uiKit/Flex';

import { ColumnHeader } from './ColumnHeader';

type TRetroSessionColumnProps = {
  columnId: string,
  index: number;
};

const MIN_WIDTH_COLUMN = '280px';
const MAX_WIDTH_COLUMN = '335px';

const RetroSessionColumn = React.memo((props: TRetroSessionColumnProps): React.ReactElement | null => {
  const {
    columnId,
    index,
  } = props;

  const popperCreateCardId = `retroSessionCreateCardFromHeaderBtn-${columnId}}`;

  const column = useSelector(retroTemplatesSelectors.getColumnById)(columnId);
  const isColumnAction = useSelector(retroTemplatesSelectors.getIsColumnActionById)(columnId);

  if (!column) {
    return null;
  }

  return (
    <Draggable
      draggableId={columnId}
      index={index}
    >
      {
        (providedColumn) => (
          <Flex
            maxWidth={['100%', MAX_WIDTH_COLUMN]}
            minWidth={['100%', MIN_WIDTH_COLUMN]}
            flexDirection="column"
            ref={providedColumn.innerRef}
            {...providedColumn.draggableProps}
          >
            <ColumnHeader
              columnId={columnId}
              mb={2}
              popperCreateCardId={popperCreateCardId}
              {...providedColumn.dragHandleProps}
            />
            <RetroSessionCards
              columnId={columnId}
              isColumnAction={isColumnAction}
              popperTopCreateCardId={popperCreateCardId}
              RetroCard={(
                RetroSessionCard
              )}
            />
          </Flex>
        )
      }
    </Draggable>
  );
});

export {
  RetroSessionColumn,
};
