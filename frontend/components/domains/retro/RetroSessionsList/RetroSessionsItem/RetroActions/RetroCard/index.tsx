import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsCardsSelectors } from '@Redux/domains/retroSessionsCards/selectors';

import {
  SettingCompletedCard,
} from '@components/domains/retro/RetroSession/RetroSessionCardAction/SettingCompletedCard';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

type TRetroCardProps = TFlexProps & {
  cardId: string;
};

const RetroCard = (props: TRetroCardProps): React.ReactElement => {
  const {
    cardId,
    ...other
  } = props;

  const title = useSelector(retroSessionsCardsSelectors.getTitle)(cardId);

  return (
    <Flex
      {...other}
    >
      <SettingCompletedCard
        cardId={cardId}
        mr={3}
      />
      <Text
        fontSize={2}
      >
        {title}
      </Text>
    </Flex>
  );
};

export {
  RetroCard,
};
