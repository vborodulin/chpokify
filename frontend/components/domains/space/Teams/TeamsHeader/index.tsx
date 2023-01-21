import { useTranslation } from 'next-i18next';
import React from 'react';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type TTeamsHeaderProps = Partial<TFlexProps> & {};

const TeamsHeader = (props: TTeamsHeaderProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Flex
      {...other}
    >
      <Text
        fontSize={6}
        fontWeight={1}
        mr={1}
        as="h3"
      >
        {t('teams.title')}
        :
      </Text>
    </Flex>
  );
};

export { TeamsHeader };
