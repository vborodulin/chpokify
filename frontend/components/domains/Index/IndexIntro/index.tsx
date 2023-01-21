import { useTranslation } from 'next-i18next';
import React from 'react';

import { IndexActionBtn } from '@components/domains/Index/IndexActionBtn';

import { BoxAr } from '@components/uiKit/BoxAr';
import { Flex } from '@components/uiKit/Flex';
import { Grid } from '@components/uiKit/Grid';
import { Text } from '@components/uiKit/Text';
import { YouTubeEmbed } from '@components/uiKit/YouTubeEmbed';

import { TRANS } from '@components/utils/types';

import { IndexSection } from '../IndexSection';

const IndexIntro = () => {
  const { t } = useTranslation(TRANS.MAIN);

  return (
    <IndexSection>
      <Grid
        gridGap={[7, null, 20]}
        justifyContent={['center', null, 'space-between']}
        alignItems="center"
        gridTemplateColumns={[
          '1fr',
          'auto 1fr',
        ]}
      >
        <Flex
          flexDirection="column"
          alignItems={['center', null, 'flex-start']}
          maxWidth="560px"
        >
          <Text
            as="h1"
            fontSize={[7, null, 12]}
            fontWeight={1}
            textAlign={['center', null, 'left']}
            mb={5}
          >
            {t('pages.index.intro.title')}
          </Text>

          <Text
            fontSize={[4, null, 5]}
            maxWidth="460px"
            textAlign={['center', null, 'left']}
          >
            {t('pages.index.intro.desc')}
          </Text>

          <IndexActionBtn
            variant="primary"
            isPromo
            mt={10}
            height="56px"
            px={6}
            textProps={{
              fontSize: 5,
            }}
          >
            {t('pages.index.intro.tryBtn')}
          </IndexActionBtn>
        </Flex>

        <BoxAr
          borderRadius={2}
          overflow="hidden"
        >
          <YouTubeEmbed
            width="100%"
            height="100%"
            id="_yYJGsICIbM"
            previewSrc="/images/index/video-cover.jpg"
            title="Interface overview"
          />
        </BoxAr>
      </Grid>
    </IndexSection>
  );
};

export {
  IndexIntro,
};
