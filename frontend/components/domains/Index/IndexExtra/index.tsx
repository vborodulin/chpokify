import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

import { Box } from '@components/uiKit/Box';
import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Grid } from '@components/uiKit/Grid';
import { IconArchitecture, IconBrightness } from '@components/uiKit/Icons';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { IndexSection } from '../IndexSection';

const StyledSystemBlock = styled(Flex)<TFlexProps>`
border: 2px solid ${({ theme }) => theme.colors.baseInvert.normal};
`;

const IndexExtra = () => {
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
          mb={10}
        >
          {t('pages.index.extra.title')}
        </Text>

        <Grid
          gridTemplateColumns={['1fr', '1fr 1fr']}
          gridGap={10}
        >
          <Flex
            flexDirection="column"
            bg="baseInvert.normal"
            borderRadius={4}
            p={6}
          >
            <IconBrightness
              width="60px"
              height="60px"
              fill="font.invert"
              mb={6}
            />

            <Text
              as="h3"
              fontSize={6}
              fontWeight={1}
              color="font.invert"
              mb={3}
            >
              {t('pages.index.extra.darkMode')}
            </Text>

            <Text
              fontSize={3}
              color="font.invert"
            >
              {t('pages.index.extra.darkModeDesc')}
            </Text>
          </Flex>

          <StyledSystemBlock
            flexDirection="column"
            bg="base.d_10"
            borderRadius={4}
            p={6}
          >
            <IconArchitecture
              width="60px"
              height="60px"
              mb={6}
            />

            <Text
              as="h3"
              fontSize={6}
              fontWeight={1}
              mb={3}
            >
              {t('pages.index.extra.designSystem')}
            </Text>

            <Text
              fontSize={3}
            >
              {t('pages.index.extra.designSystemDesc')}
            </Text>
          </StyledSystemBlock>
        </Grid>
      </Box>
    </IndexSection>
  );
};

export {
  IndexExtra,
};
