import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

import { IndexJiraIntegrationPromoItem } from '@components/domains/Index/IndexIntegrations/IndexJiraIntegrationItem';
import { IndexSection } from '@components/domains/Index/IndexSection';

import { Flex } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

const StyledIndexSection = styled(IndexSection)`
  border-bottom: 4px solid ${({ theme }) => theme.colors.base.a_10};
`;

const IndexIntegrations = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);
  return (
    <StyledIndexSection>
      <Text
        as="h2"
        fontSize={7}
        fontWeight={1}
        mb={10}
        textAlign="center"
      >
        {t('pages.index.integrations.title')}
      </Text>

      <Flex
        justifyContent="center"
        alignItems="center"
      >
        <IndexJiraIntegrationPromoItem />
      </Flex>
    </StyledIndexSection>
  );
};

export {
  IndexIntegrations,
};
