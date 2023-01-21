import { useTranslation } from 'next-i18next';
import React from 'react';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type TParticipantsHeaderProps = Partial<TFlexProps> & {};

const ParticipantsHeader = (props: TParticipantsHeaderProps): React.ReactElement | null => {
  const { ...other } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Flex
      {...other}
    >
      <Text
        as="h3"
        fontSize={6}
        fontWeight={1}
        mr={1}
      >
        {t('members.title')}
        :
      </Text>
    </Flex>
  );
};

export { ParticipantsHeader };
