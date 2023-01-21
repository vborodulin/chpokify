import { routing } from '@chpokify/routing';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useSelector } from 'react-redux';

import { configSelectors } from '@Redux/domains/config/selectors';
import { reduxWrapper } from '@Redux/lib/configureStore';
import { TAppPage } from '@Redux/types';

import { ForgotPassword } from '@components/domains/auth/ForgotPassword';
import { Footer } from '@components/domains/layouts/Footer';
import { Header } from '@components/domains/layouts/Header';
import { ChpokifyHelmet } from '@components/domains/marketing/ChpokifyHelmet';

import { ContentCenter } from '@components/uiKit/ContentCenter';
import { PageLayout } from '@components/uiKit/PageLayout';

import { LOCALE, TRANS } from '@components/utils/types';

const ForgotPasswordPage: TAppPage<{}, {}> = () => {
  const absoluteUrl = useSelector(configSelectors.getAbsoluteUrl)(
    routing.getForgotPasswordUrl()
  );

  return (
    <>
      <ChpokifyHelmet>
        <link
          rel="canonical"
          href={absoluteUrl}
        />
      </ChpokifyHelmet>

      <Header />

      <PageLayout>
        <ContentCenter>
          <ForgotPassword />
        </ContentCenter>
      </PageLayout>

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

export default ForgotPasswordPage;
