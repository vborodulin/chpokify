import { useTranslation } from 'next-i18next';
import React from 'react';
import { css } from 'styled-components';

import { Box } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { Flex } from '@components/uiKit/Flex';
import { IconJira } from '@components/uiKit/Icons';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type TStoriesIntegrationsJiraNotSetup = {
  onClickToSettingsSession: () => void;
  onClose: () => void;
}

const StoriesIntegrationsJiraNotSetup = (props: TStoriesIntegrationsJiraNotSetup): React.ReactElement | null => {
  const {
    onClickToSettingsSession,
    onClose,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <>
      <PaperContent>
        <Box
          as="fieldset"
          onClick={onClickToSettingsSession}
          css={css`cursor:pointer`}
        >
          <Flex
            alignItems="center"
            bg="primary.d_40"
            borderRadius={2}
            px={4}
            display="flex"
            py={3}
          >
            <IconJira
              width="32px"
              height="32px"
              fill="primary.normal"
              mr={3}
            />
            <Text
              fontSize={2}
              color="font.d_10"
            >
              {t('storiesAddModal.connectedJiraNotUseInSession')}
            </Text>
          </Flex>
          <Box />
        </Box>
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onClose}
          >
            {t('storiesIntegrationImport.cancelBtn')}
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={onClickToSettingsSession}
          >
            {t('storiesAddModal.goToSettingsSessionsBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </>
  );
};

export { StoriesIntegrationsJiraNotSetup };
