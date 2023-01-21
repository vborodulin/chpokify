import { useTranslation } from 'next-i18next';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroTemplatesSelectors } from '@Redux/domains/retroTemplates/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';

import { RetroSessionExportCardsActionCsvBtn } from '@components/domains/retro/buttons/RetroSessionExportCardsActionCsvBtn';
import { useRetroSessionDragEnd } from '@components/domains/retro/RetroSession/hooks/useRetroSessionDragEnd';
import { RetroSessionCardAction } from '@components/domains/retro/RetroSession/RetroSessionCardAction';
import { RetroSessionCards } from '@components/domains/retro/RetroSession/RetroSessionCards';

import { TBoxProps } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type TRetroSessionColumnActionsProps = Partial<TBoxProps> & {}

const WIDTH_COLUMN_ACTIONS = 280;

const RetroSessionColumnActions = (props: TRetroSessionColumnActionsProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const retroSessionId = useSelector(retroSessionsSelectors.getCurrId);
  const spaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const retroTemplateId = useSelector(retroTemplatesSelectors.getCurrId);
  const retroColumnActionId = useSelector(retroTemplatesSelectors.getActionColumnId)(retroTemplateId);

  const {
    handleDragEnd,
  } = useRetroSessionDragEnd({
    retroSessionId,
    retroTemplateId,
    spaceId,
  });

  const renderContent = () => {
    if (!retroColumnActionId) {
      return null;
    }

    return (
      <>
        <DragDropContext
          onDragEnd={handleDragEnd}
        >
          <RetroSessionCards
            columnId={retroColumnActionId.toString()}
            cardProps={{
              bg: 'base.a_10',
              boxShadow: 'inherit',
            }}
            RetroCard={(
              RetroSessionCardAction
            )}
            isColumnAction
          />
        </DragDropContext>
      </>

    );
  };

  const renderHeader = () => (
    <Flex
      alignItems="center"
      justifyContent="space-between"
    >
      <Text
        fontSize={5}
        fontWeight={1}
      >
        {t('pages.retro.retroColumnActions.title')}
      </Text>

      <RetroSessionExportCardsActionCsvBtn />
    </Flex>
  );

  if (!retroColumnActionId) {
    return null;
  }

  return (
    <Flex
      p={6}
      borderRadius="unset"
      bg="surface.a_10"
      width={`${WIDTH_COLUMN_ACTIONS}px`}
      overflow="hidden"
      flexDirection="column"
      {...other}
    >
      <Flex
        flexDirection="column"
        flexGrow={1}
        overflowY="auto"
        justifyContent="space-between"
      >
        {
          renderHeader()
        }
        <Flex
          height="100%"
          flexGrow={1}
          py={4}
          flexDirection="column"
        >
          {
            renderContent()
          }
        </Flex>
      </Flex>
    </Flex>
  );
};

export {
  RetroSessionColumnActions,
};
