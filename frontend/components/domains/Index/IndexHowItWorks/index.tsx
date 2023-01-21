import { useTranslation } from 'next-i18next';
import React from 'react';

import { AnalyzeBlock } from '@components/domains/Index/IndexHowItWorks/AnalyzeBlock';
import { StartSessionBlock } from '@components/domains/Index/IndexHowItWorks/StartSessionBlock';
import { VoteModerateBlock } from '@components/domains/Index/IndexHowItWorks/VoteModerateBlock';

import { Box } from '@components/uiKit/Box';
import { Divider } from '@components/uiKit/Divider';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { IndexSection } from '../IndexSection';

import { InviteBlock } from './InviteBlock';
import { RegisterBlock } from './RegisterBlock';

const IndexHowItWorks = () => {
  const { t } = useTranslation(TRANS.MAIN);

  return (
    <IndexSection
      bg="base.a_10"
    >
      <Box
        maxWidth="900px"
        mx="auto"
      >
        <Text
          as="h2"
          fontSize={7}
          fontWeight={1}
          textAlign="center"
          mb={15}
        >
          {t('pages.index.howItWorks.title')}
        </Text>

        <RegisterBlock />

        <Divider
          my={15}
        />

        <InviteBlock />

        <Divider
          my={15}
        />

        <StartSessionBlock />

        <Divider
          my={15}
        />

        <VoteModerateBlock />

        <Divider
          my={15}
        />

        <AnalyzeBlock />
      </Box>
    </IndexSection>
  );
};

export {
  IndexHowItWorks,
};
