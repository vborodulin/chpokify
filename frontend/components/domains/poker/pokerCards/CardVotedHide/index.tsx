import { useTranslation } from 'next-i18next';
import React from 'react';

import { CardBase, TCardBaseProps } from '@components/domains/poker/pokerCards/CardBase';

import { Flex } from '@components/uiKit/Flex';
import { IconCheckCircle } from '@components/uiKit/Icons';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TCardVotedHideProps = TCardBaseProps;

const CardVotedHide = (props: TCardVotedHideProps): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);
  return (
    <CardBase
      {...props}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
      >
        <IconCheckCircle
          fill="font.primary"
          width="36px"
          height="36px"
          mb={1}
        />

        <Text
          fontSize={2}
          fontWeight={1}
          color="font.primary"
        >
          {t('votingCard.titleVoted')}
        </Text>
      </Flex>
    </CardBase>
  );
};

export {
  CardVotedHide,
};
