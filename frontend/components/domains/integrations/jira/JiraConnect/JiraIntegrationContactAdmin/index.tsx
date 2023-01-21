import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

import { Grid, TGridProps } from '@components/uiKit/Grid';
import { IconInfo } from '@components/uiKit/Icons';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

const StyledRoot = styled(Paper)<TPaperProps>`
  border: 2px solid ${({ theme }) => theme.colors.positive.a_20};
`;

const JiraIntegrationContactAdmin = (props: TGridProps): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);
  return (
    <StyledRoot
      {...props}
    >
      <Grid
        gridAutoFlow="column"
        gridGap={4}
      >
        <IconInfo
          width="32px"
          height="32px"
          fill="positive.a_20"
        />

        <Text
          fontSize={2}
          color="positive.a_20"
        >
          {t('jiraIntegration.contactAdministrator')}
        </Text>
      </Grid>
    </StyledRoot>
  );
};

export {
  JiraIntegrationContactAdmin,
};
