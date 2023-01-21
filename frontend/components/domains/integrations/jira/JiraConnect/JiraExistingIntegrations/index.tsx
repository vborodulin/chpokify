import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { jiraAsyncActions } from '@Redux/domains/jira/asyncActions';
import { jiraOperations } from '@Redux/domains/jira/operations';
import { useAppDispatch } from '@Redux/hooks';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { Grid } from '@components/uiKit/Grid';
import { LinkComponent } from '@components/uiKit/Link';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TJiraExistingIntegrationsProps = Partial<TBoxProps>;

const JiraExistingIntegrations = (props: TJiraExistingIntegrationsProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const integrations = useSelector(authSelectors.getJiraIntegrationsList);

  const handleRefresh = async (baseUrl: string) => {
    await jiraOperations.refreshIntegration(baseUrl)(dispatch);
  };

  const handleRemove = async (baseUrl: string) => {
    await dispatch(jiraAsyncActions.oauthRemove({
      baseUrl,
    }));
  };

  const renderContent = () => {
    if (!integrations.length) {
      return (
        <Text
          fontSize={3}
        >
          {t('jiraIntegration.existingIntegrations.noContent')}
        </Text>
      );
    }

    return (
      <Grid
        as="ul"
        gridGap={4}
      >
        {
          integrations.map((integration) => {
            const { hostname } = new URL(integration.baseUrl);
            return (
              <Grid
                as="li"
                key={integration.baseUrl}
                gridGap={4}
                gridTemplateColumns="auto auto auto"
                justifyContent="flex-start"
              >
                <LinkComponent
                  href={integration.baseUrl}
                >
                  {hostname}
                </LinkComponent>

                <Button
                  onClick={() => handleRefresh(integration.baseUrl)}
                >
                  {t('jiraIntegration.existingIntegrations.refreshBtn')}
                </Button>

                <Button
                  variant="negative"
                  onClick={() => handleRemove(integration.baseUrl)}
                >
                  {t('jiraIntegration.existingIntegrations.removeBtn')}
                </Button>
              </Grid>
            );
          })
        }
      </Grid>
    );
  };

  return (
    <Box
      {...other}
    >
      <Text
        fontSize={4}
        fontWeight={1}
        color="font.primary_a_20"
        mb={4}
      >
        {t('jiraIntegration.existingIntegrations.title')}
      </Text>

      {renderContent()}
    </Box>
  );
};

export {
  JiraExistingIntegrations,
};
