import { useTranslation } from 'next-i18next';
import React from 'react';

import { Flex } from '@components/uiKit/Flex';
import { Grid } from '@components/uiKit/Grid';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { IndexSection } from '../IndexSection';

import { CollaborateItem } from './CollaborateItem';

const IndexCollaborate = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  return (
    <IndexSection
      bg="base.a_10"
    >
      <Flex
        alignItems="center"
        flexDirection="column"
      >
        <Text
          as="h2"
          fontSize={7}
          fontWeight={1}
          textAlign="center"
          mb={10}
        >
          {t('pages.index.collaborate.title')}
        </Text>

        <Grid
          gridAutoFlow={['row', null, 'column']}
          alignItems="center"
          gridGap={6}
        >
          <CollaborateItem
            title={t('pages.index.collaborate.item1.title')}
            description={t('pages.index.collaborate.item1.desc')}
            img={{
              src: '/images/chpokify-spaces-card.png',
              alt: t('pages.index.collaborate.item1.altImg'),
            }}
          />
          <CollaborateItem
            title={t('pages.index.collaborate.item2.title')}
            description={t('pages.index.collaborate.item2.desc')}
            img={{
              src: '/images/chpokify-teams-card.png',
              alt: t('pages.index.collaborate.item2.altImg'),
            }}
          />

          <CollaborateItem
            title={t('pages.index.collaborate.item3.title')}
            description={t('pages.index.collaborate.item3.desc')}
            img={{
              src: '/images/chpokify-devices-card.png',
              alt: t('pages.index.collaborate.item3.altImg'),
            }}
          />
        </Grid>
      </Flex>
    </IndexSection>
  );
};

export {
  IndexCollaborate,
};
