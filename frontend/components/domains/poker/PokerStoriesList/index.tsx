import { typesHelpers } from '@chpokify/helpers/types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import {
  DragDropContext, Draggable, Droppable, DropResult,
} from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { PokerStoryItem, TPokerStoryItemProps } from '@components/domains/poker/PokerStoriesList/PokerStoryItem';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { ContentEmpty } from '@components/uiKit/ContentEmpty';

import { TRANS } from '@components/utils/types';

export type TPokerStoriesListProps = typesHelpers.Override<Partial<TBoxProps>, {
  placement?: string;
  onAfterChoose?: () => void;
}>;

const StyledStory = styled(PokerStoryItem)<TPokerStoryItemProps>`
margin-bottom: ${({ theme }) => theme.space[3]};
&:last-child {
margin-bottom: 0;
}
`;

const PokerStoriesList = (props: TPokerStoriesListProps): React.ReactElement | null => {
  const {
    placement = '',
    onAfterChoose,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);
  const pokerSessionId = useSelector(pokerSessionsSelectors.getCurrId);
  const storiesIds = useSelector(pokerSessionsSelectors.getStoriesIds)(pokerSessionId);

  const handleDragEnd = async (result: DropResult) => {
    const {
      draggableId,
      source,
      destination,
    } = result;

    if (!canModerate) {
      return;
    }

    if (!destination) {
      return;
    }

    const newStoriesIds = Array.from(storiesIds);
    newStoriesIds.splice(source.index, 1);
    newStoriesIds.splice(destination.index, 0, draggableId);

    await dispatch(pokerSessionsAsyncActions.storySetMany(
      pokerSessionId,
      {
        storiesIds: newStoriesIds,
      }
    ));
  };

  const renderContent = () => {
    if (!storiesIds.length) {
      return (
        <ContentEmpty>
          {t('pokerSession.emptyTasksList')}
        </ContentEmpty>
      );
    }

    return (
      storiesIds.map((storyId, index) => (
        <Draggable
          key={storyId.toString()}
          draggableId={storyId.toString()}
          index={index}
        >
          {
            (provided, snapshot) => (
              <StyledStory
                key={storyId.toString()}
                storyId={storyId.toString()}
                placement={placement}
                onClick={onAfterChoose}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
              />
            )
          }
        </Draggable>
      ))
    );
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
    >
      <Droppable
        droppableId={`PokerStoriesList-${pokerSessionId}`}
      >
        {
          (provided, snapshot) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
              {...other}
            >
              {renderContent()}
              {provided.placeholder}
            </Box>
          )
        }
      </Droppable>
    </DragDropContext>
  );
};

export {
  PokerStoriesList,
};
