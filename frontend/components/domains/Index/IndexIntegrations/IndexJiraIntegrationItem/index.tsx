import { routing } from '@chpokify/routing';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { IconJira } from '@components/uiKit/Icons';
import { Text } from '@components/uiKit/Text';

const StyledRoot = styled(Flex)<TFlexProps>`
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface.d_20};
  }
`;

const IndexJiraIntegrationPromoItem = (): React.ReactElement | null => (
  <Link
    href={routing.getSignUpUrl()}
  >
    <StyledRoot
      role="button"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      p={6}
      borderRadius={5}
      bg="surface.d_10"
    >
      <IconJira
        width="32px"
        height="32px"
        fill="primary.normal"
        mr={2}
      />

      <Text
        fontSize={7}
      >
        Jira Software
      </Text>
    </StyledRoot>
  </Link>
);

export {
  IndexJiraIntegrationPromoItem,
};
