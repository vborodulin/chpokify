import { SUPPORT_EMAIL } from '@chpokify/models-types/info';
import { routing } from '@chpokify/routing';
import { log } from 'lib/logger';
import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { jiraSelectors } from '@Redux/domains/jira/selectors';

import { Box } from '@components/uiKit/Box';
import { BoxAr } from '@components/uiKit/BoxAr';
import { Button } from '@components/uiKit/Button';
import { FormControl } from '@components/uiKit/FormControl';
import { FormLabel } from '@components/uiKit/FormLabel';
import { Image } from '@components/uiKit/Image';
import { InputCopy } from '@components/uiKit/InputCopy';
import { LinkComponent } from '@components/uiKit/Link';
import { Paper } from '@components/uiKit/Paper';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';
import { YouTubeEmbed } from '@components/uiKit/YouTubeEmbed';

import { TRANS } from '@components/utils/types';

import { ClientError } from '@lib/errors';

import { JiraExistingIntegrations } from './JiraExistingIntegrations';
import { JiraIntegrationContactAdmin } from './JiraIntegrationContactAdmin';
import { JiraLink } from './JIraLink';

const JiraConnect = (): React.ReactElement | null => {
  const currUserId = useSelector(authSelectors.getCurrUserId);
  const applicationLink = useSelector(jiraSelectors.getApplicationLinkInfo);

  const { t } = useTranslation(TRANS.MAIN);

  if (!applicationLink) {
    log.error(new ClientError('JiraIntegration: applicationLink not found'));
    return null;
  }

  const renderJiraConnectContent = () => {
    if (currUserId) {
      return (
        <>
          <Text
            fontSize={2}
            mb={4}
          >
            {t('jiraIntegration.step3.description')}
          </Text>

          <JiraLink
            mb={10}
          />

          <JiraExistingIntegrations />
        </>
      );
    }

    return (
      <NextLink
        href={routing.getSignUpUrl()}
      >
        <Button
          variant="primary"
        >
          {t('signUp.signUpBtn')}
        </Button>
      </NextLink>
    );
  };

  return (
    <>
      <Box
        mb={8}
      >
        <Text
          fontSize={3}
        >
          {t('jiraIntegration.teamAssist.one')}

          <LinkComponent
            fontSize="inherit"
            isExternal
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            {t('jiraIntegration.teamAssist.link')}
          </LinkComponent>

          {t('jiraIntegration.teamAssist.two')}
        </Text>
      </Box>

      <JiraIntegrationContactAdmin
        mb={4}
      />

      <BoxAr
        borderRadius={2}
        overflow="hidden"
      >
        <YouTubeEmbed
          title={t('jiraIntegration.videoTitle')}
          id="s9olwP3ncI0"
          previewSrc="/images/jira-integration/video-cover.jpg"
          width="100%"
          height="100%"
        />
      </BoxAr>

      <Paper
        variant="card"
        mt={4}
        mb={4}
      >
        <PaperHeader>
          {t('jiraIntegration.step1.title')}
        </PaperHeader>

        <PaperContent>
          <Box
            mb={8}
          >
            <Text
              fontSize={2}
              mb={4}
            >
              {t('jiraIntegration.step1.adminSettings')}
            </Text>

            <Image
              src="/images/jira-integration/1.png"
              alt="product-settings"
              width="536px"
              height="516px"
              layout="intrinsic"
            />

            <Box
              mb={4}
            />

            <Image
              src="/images/jira-integration/2.png"
              alt="application-link"
              width="536px"
              height="386px"
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
              {t('jiraIntegration.step1.enterUrl')}
            </Text>

            <Image
              src="/images/jira-integration/3.png"
              alt="application-url"
              width="536px"
              height="270px"
              layout="intrinsic"
            />

            <Box
              mb={4}
            />

            <FormControl>
              <FormLabel
                fontWeight={1}
                fontSize={2}
              >
                {t('jiraIntegration.step1.applicationUrl')}
              </FormLabel>

              <InputCopy
                value={applicationLink.applicationUrl}
              />
            </FormControl>
          </Box>

          <Box
            mb={8}
          >
            <Text
              fontSize={2}
              mb={4}
            >
              {t('jiraIntegration.step1.pressContinue')}
            </Text>

            <Image
              src="/images/jira-integration/4.png"
              alt="press-continue"
              width="536px"
              height="336px"
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
              {t('jiraIntegration.step1.fillNameNadType')}
            </Text>

            <Image
              src="/images/jira-integration/5.png"
              alt="application-name-and-type"
              width="536px"
              height="534px"
              layout="intrinsic"
            />

            <Box
              mb={4}
            />

            <FormControl>
              <FormLabel
                fontWeight={1}
                fontSize={2}
              >
                {t('jiraIntegration.step1.applicationName')}
              </FormLabel>

              <InputCopy
                value={applicationLink.applicationName}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                fontWeight={1}
                fontSize={2}
              >
                {t('jiraIntegration.step1.applicationType')}
              </FormLabel>

              <InputCopy
                value="Generic Application"
              />
            </FormControl>

            <Text
              fontSize={3}
              fontStyle="italic"
              mt={4}
            >
              {t('jiraIntegration.step1.hint')}
            </Text>
          </Box>
        </PaperContent>
      </Paper>

      <Paper
        variant="card"
        mb={4}
      >
        <PaperHeader>
          {t('jiraIntegration.step2.title')}
        </PaperHeader>

        <PaperContent>
          <Box
            mb={8}
          >
            <Text
              fontSize={2}
              mb={4}
            >
              {t('jiraIntegration.step2.clickPencil')}
            </Text>

            <Image
              src="/images/jira-integration/6.png"
              alt="click-pencil"
              width="536px"
              height="263px"
              layout="intrinsic"
            />
          </Box>

          <Box>
            <Text
              fontSize={2}
              mb={4}
            >
              {t('jiraIntegration.step2.configure')}
            </Text>

            <Image
              src="/images/jira-integration/7.png"
              alt="configure"
              width="536px"
              height="373px"
              layout="intrinsic"
            />

            <Box
              mb={4}
            />

            <FormControl>
              <FormLabel
                fontWeight={1}
                fontSize={2}
              >
                {t('jiraIntegration.step2.consumerKey')}
              </FormLabel>

              <InputCopy
                value={applicationLink.consumerKey}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                fontWeight={1}
                fontSize={2}
              >
                {t('jiraIntegration.step2.consumerName')}
              </FormLabel>

              <InputCopy
                value={applicationLink.consumerName}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                fontWeight={1}
                fontSize={2}
              >
                {t('jiraIntegration.step2.publicKey')}
              </FormLabel>

              <InputCopy
                multiline
                whiteSpace="pre-line"
                rows={10}
                value={applicationLink.publicKey}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                fontWeight={1}
                fontSize={2}
              >
                {t('jiraIntegration.step2.consumerCallbackUrl')}
              </FormLabel>

              <InputCopy
                value={applicationLink.consumerCallbackUrl}
              />
            </FormControl>
          </Box>
        </PaperContent>
      </Paper>

      <Paper
        variant="card"
      >
        <PaperHeader>
          {t('jiraIntegration.step3.title')}
        </PaperHeader>

        <PaperContent>
          {renderJiraConnectContent()}
        </PaperContent>
      </Paper>
    </>
  );
};

export {
  JiraConnect,
};
