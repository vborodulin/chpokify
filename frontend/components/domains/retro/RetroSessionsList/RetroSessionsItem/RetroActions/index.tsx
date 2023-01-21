import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionRepoSelectors } from '@Redux/domains/retroSessionsRepo/selectors';

import { RetroCard } from '@components/domains/retro/RetroSessionsList/RetroSessionsItem/RetroActions/RetroCard';

import { Box } from '@components/uiKit/Box';
import { Divider } from '@components/uiKit/Divider';
import { Flex } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type TRetroActionsProps = {
  retroSessionId: string;
  isOpen: boolean;
}

const MAX_HEIGHT = 200;

const RetroActions = (props: TRetroActionsProps): React.ReactElement | null => {
  const {
    isOpen,
    retroSessionId,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const cardsIdsFromActionColumn = useSelector(
    retroSessionRepoSelectors.getCardsIdsFromActionColumnByRetroSessionId
  )(retroSessionId);

  const renderEmptyContent = () => (
    <Text
      fontSize={1}
      color="font.d_30"
    >
      {t('pages.retro.retroItem.emptyActions')}
    </Text>
  );

  const renderContent = () => {
    if (!cardsIdsFromActionColumn.length) {
      return renderEmptyContent();
    }

    return (
      <Flex
        overflowY="auto"
        maxHeight={`${MAX_HEIGHT}px`}
        flexDirection="column"
        gap="2"
      >
        {
          cardsIdsFromActionColumn.map((cardId) => (
            <RetroCard
              key={cardId.toString()}
              cardId={cardId.toString()}
            />
          ))
         }
      </Flex>
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Box>
      <Divider
        my={3}
      />
      {
        renderContent()
      }
    </Box>
  );
};

export {
  RetroActions,
};
