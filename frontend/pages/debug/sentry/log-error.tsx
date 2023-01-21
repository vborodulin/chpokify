import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { reduxWrapper } from '@Redux/lib/configureStore';

import { ChpokifyHelmet } from '@components/domains/marketing/ChpokifyHelmet';

import { ContentCenter } from '@components/uiKit/ContentCenter';
import { PageLayout } from '@components/uiKit/PageLayout';
import { Text } from '@components/uiKit/Text';

import { useInterval } from '@components/utils/hooks/useInterval';
import { LOCALE, TRANS } from '@components/utils/types';

import { ClientError } from '@lib/errors';
import { log } from '@lib/logger';

const ERROR_TIMEOUT = 1000;

const LogErrorPage = () => {
  const { t } = useTranslation(TRANS.MAIN);

  useInterval(
    'timeout',
    () => {
      log.error(new ClientError('sentry debug log error', [
        {
          path: [],
          message: 'sentry debug message',
        },
      ]));
    },
    ERROR_TIMEOUT
  );

  return (
    <PageLayout>
      <ChpokifyHelmet>
        <meta
          name="robots"
          content="noindex, nofollow"
        />
      </ChpokifyHelmet>

      <ContentCenter>
        <Text
          as="h1"
          fontSize={3}
        >
          {t('sentryDebugPage.title')}
        </Text>
      </ContentCenter>
    </PageLayout>
  );
};

export const getServerSideProps = reduxWrapper.getServerSideProps(() => async (ctx) =>
  ({
    props: {
      ...(await serverSideTranslations(ctx.locale || LOCALE.EN, [TRANS.MAIN, TRANS.SEO])),
    },
  }));

export default LogErrorPage;
