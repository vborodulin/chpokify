import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useSelector } from 'react-redux';

import { configSelectors } from '@Redux/domains/config/selectors';
import { jiraAsyncActions } from '@Redux/domains/jira/asyncActions';
import { reduxWrapper } from '@Redux/lib/configureStore';
import { TAppPage } from '@Redux/types';

import { JiraConnect } from '@components/domains/integrations/jira/JiraConnect';
import { Footer } from '@components/domains/layouts/Footer';
import { Header } from '@components/domains/layouts/Header';
import { ChpokifyHelmet } from '@components/domains/marketing/ChpokifyHelmet';

import { PageLayoutNarrow } from '@components/uiKit/PageLayoutNarrow';
import { PageTitle } from '@components/uiKit/PageTitle';

import { LOCALE, TRANS } from '@components/utils/types';

const JiraConnectPage: TAppPage<{}, {}> = () => {
  const absoluteUrl = useSelector(configSelectors.getAbsoluteUrl)(
    routing.getJiraConnectUrl()
  );

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <>
      <ChpokifyHelmet
        page="jiraConnect"
      >
        <link
          rel="canonical"
          href={absoluteUrl}
        />
      </ChpokifyHelmet>

      <Header />

      <PageLayoutNarrow
        maxWidth="648px"
      >
        <PageTitle>
          {t('jiraIntegration.title')}
        </PageTitle>

        <JiraConnect />
      </PageLayoutNarrow>

      <Footer />
    </>
  );
};

export const getServerSideProps = reduxWrapper.getServerSideProps((store) => async (ctx) => {
  await store.dispatch(jiraAsyncActions.applicationLinkGet());
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || LOCALE.EN, [TRANS.MAIN, TRANS.SEO])),
    },
  };
});

export default JiraConnectPage;
