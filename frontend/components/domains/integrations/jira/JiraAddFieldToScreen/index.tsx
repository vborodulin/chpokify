import { useTranslation } from 'next-i18next';
import React from 'react';

import { Box } from '@components/uiKit/Box';
import { Divider } from '@components/uiKit/Divider';
import { Image } from '@components/uiKit/Image';
import { LinkComponent } from '@components/uiKit/Link';
import { Paper } from '@components/uiKit/Paper';
import { PaperContent } from '@components/uiKit/PaperContent';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { support } from '@lib/support';

const JiraAddFieldToScreen = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  const handleOpenSupport = () => {
    support.openEmailModal();
  };

  const renderHeaderText = () => (
    <Box
      mb={8}
    >
      <Text
        fontSize={3}
      >
        {t('jiraAddFieldToScreen.aboutAddJira')}
        {' '}
        <LinkComponent
          fontSize={3}
          onClick={handleOpenSupport}
        >
          {t('pokerSession.jira.errorHelpLink')}
        </LinkComponent>
        .
      </Text>
    </Box>
  );

  const renderContent = () => (
    <Paper
      variant="card"
      mb={4}
    >
      <PaperContent>
        <Box
          mb={8}
        >
          <Text
            fontSize={2}
            mb={4}
          >
            {t('jiraAddFieldToScreen.step1.title')}
          </Text>
          <Image
            src="/images/jira-field-to-screen/1.jpg"
            alt="setting-issue"
            width="552px"
            height="524px"
            layout="intrinsic"
          />
        </Box>
        <Box
          mb={8}
        >
          <Text
            fontSize={2}
            mb={4}
          >
            {t('jiraAddFieldToScreen.step2.title')}
          </Text>
          <Image
            src="/images/jira-field-to-screen/2.jpg"
            alt="under-fields"
            width="552px"
            height="372px"
            layout="intrinsic"
          />
        </Box>
        <Box
          mb={4}
        >
          <Text
            fontSize={2}
            mb={4}
          >
            {t('jiraAddFieldToScreen.step3.title')}
          </Text>
          <Image
            src="/images/jira-field-to-screen/3.jpg"
            alt="under-fields"
            width="552px"
            height="270px"
            layout="intrinsic"
          />
        </Box>
        <Box
          mb={8}
        >
          <Text
            fontSize={2}
            mb={4}
          >
            {t('jiraAddFieldToScreen.step3.alternatively')}
          </Text>
          <Image
            src="/images/jira-field-to-screen/3-1.jpg"
            alt="under-fields"
            width="552px"
            height="270px"
            layout="intrinsic"
          />
        </Box>
        <Box
          mb={8}
        >
          <Text
            fontSize={2}
            mb={4}
          >
            {t('jiraAddFieldToScreen.step4.title')}
          </Text>
          <Image
            src="/images/jira-field-to-screen/4.jpg"
            alt="under-fields"
            width="552px"
            height="446px"
            layout="intrinsic"
          />
        </Box>

        <Divider
          mb={6}
        />
        <Box
          mb={1}
        >
          <Text
            fontSize={2}
          >
            {t('jiraAddFieldToScreen.successDone')}
            <LinkComponent
              fontSize={2}
              onClick={handleOpenSupport}
            >
              {t('pokerSession.jira.errorHelpLink')}
            </LinkComponent>
            .
          </Text>
        </Box>
      </PaperContent>
    </Paper>
  );

  return (
    <>
      {renderHeaderText()}
      {renderContent()}
    </>
  );
};

export { JiraAddFieldToScreen };
