import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useSelector } from 'react-redux';

import { configSelectors } from '@Redux/domains/config/selectors';
import { reduxWrapper } from '@Redux/lib/configureStore';
import { TAppPage } from '@Redux/types';

import { Footer } from '@components/domains/layouts/Footer';
import { Header } from '@components/domains/layouts/Header';
import { ChpokifyHelmet } from '@components/domains/marketing/ChpokifyHelmet';

import { PageLayoutNarrow } from '@components/uiKit/PageLayoutNarrow';
import { PageTitle } from '@components/uiKit/PageTitle';

import { LOCALE, TRANS } from '@components/utils/types';

const TermsPage: TAppPage<{}, {}> = () => {
  const absoluteUrl = useSelector(configSelectors.getAbsoluteUrl)(
    routing.getTermsOfUseUrl()
  );

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <>
      <ChpokifyHelmet
        page="terms"
      >
        <link
          rel="canonical"
          href={absoluteUrl}
        />
      </ChpokifyHelmet>

      <Header />

      <PageLayoutNarrow>
        <PageTitle>
          {t('termsPage.title')}
        </PageTitle>

        <iframe
          title="terms"
          width="100%"
          style={{
            flexGrow: 1,
          }}
          /* eslint-disable-next-line max-len */
          src="https://docs.google.com/document/d/e/2PACX-1vTZt817_5880Vh0Lg7WOycTJfhfd3MCUGblg9GvCxKXbMGI7USDnGJpkJLDaBfSIuqUR_htKoxFMELk/pub?embedded=true"
        />
      </PageLayoutNarrow>

      <Footer />
    </>
  );
};

export const getServerSideProps = reduxWrapper.getServerSideProps(() => async (ctx) =>
  ({
    props: {
      ...(await serverSideTranslations(ctx.locale || LOCALE.EN, [TRANS.MAIN, TRANS.SEO])),
    },
  }));

export default TermsPage;
