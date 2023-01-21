import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroTemplatesSelectors } from '@Redux/domains/retroTemplates/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { RetroSessionColumnAddBtn } from '@components/domains/retro/buttons/RetroSessionColumnAddBtn';
import { useRetroSessionDragEnd } from '@components/domains/retro/RetroSession/hooks/useRetroSessionDragEnd';
import { RetroSessionColumn } from '@components/domains/retro/RetroSession/RetroSessionColumn';
import { RetroSessionDroppable } from '@components/domains/retro/RetroSession/RetroSessionDroppable';

import { Flex } from '@components/uiKit/Flex';
import { Grid, TGridProps } from '@components/uiKit/Grid';

type TRetroSessionContentProps = Partial<TGridProps>;

const RetroSessionContent = (props: TRetroSessionContentProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const spaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const retroSessionId = useSelector(retroSessionsSelectors.getCurrId);
  const retroTemplateId = useSelector(retroTemplatesSelectors.getCurrId);
  const retroTemplateColumnsIds = useSelector(retroTemplatesSelectors.getColumnsIdsWithoutAction);
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const {
    handleDragEnd,
  } = useRetroSessionDragEnd({
    retroSessionId,
    retroTemplateId,
    spaceId,
  });

  return (
    <RetroSessionDroppable
      handleDragEnd={handleDragEnd}
    >
      {
        (provided) => (
          <Grid
            gridGap={4}
            flexGrow={1}
            gridAutoFlow="column"
            gridAutoRows="100%"
            justifyContent="space-between"
            gridTemplateColumns="1fr"
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...other}
          >
            <Flex
              gap={4}
              flexGrow={1}
              overflowX="scroll"
            >
              {
                retroTemplateColumnsIds.map((columnId, index) => (
                  <RetroSessionColumn
                    key={columnId}
                    index={index}
                    columnId={columnId}
                  />
                ))
              }
            </Flex>
            {provided.placeholder}
            <RetroSessionColumnAddBtn
              canModerate={canModerate}
            />
          </Grid>
        )
      }
    </RetroSessionDroppable>
  );
};

export {
  RetroSessionContent,
};
