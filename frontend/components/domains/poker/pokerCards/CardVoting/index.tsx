import { useTranslation } from 'next-i18next';
import React from 'react';

import { CardBase, TCardBaseProps } from '@components/domains/poker/pokerCards/CardBase';

import { Flex } from '@components/uiKit/Flex';
import { IconMoreHorizontal } from '@components/uiKit/Icons';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TCardVotingProps = TCardBaseProps

const CardVoting = (props: TCardVotingProps): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);
  return (
    <CardBase
      {...props}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
      >
        <IconMoreHorizontal
          width="36px"
          height="36px"
          fill="font.primary"
          mb={1}
        />

        <Text
          fontSize={2}
          fontWeight={1}
          color="font.primary"
        >
          {t('votingCard.titleVoting')}
        </Text>
      </Flex>
    </CardBase>
  );
};

export {
  CardVoting,
};
