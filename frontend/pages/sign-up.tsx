import { routing } from '@chpokify/routing';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useSelector } from 'react-redux';

import { configSelectors } from '@Redux/domains/config/selectors';
import { reduxWrapper } from '@Redux/lib/configureStore';
import { TAppPage } from '@Redux/types';

import { SignUp } from '@components/domains/auth/SignUp';
import { Footer } from '@components/domains/layouts/Footer';
import { Header } from '@components/domains/layouts/Header';
import { ChpokifyHelmet } from '@components/domains/marketing/ChpokifyHelmet';
import { spaceHelpers } from '@components/domains/space/helpers';

import { ContentCenter } from '@components/uiKit/ContentCenter';
import { PageLayout } from '@components/uiKit/PageLayout';

import { LOCALE, TRANS } from '@components/utils/types';

import { signUpMarker } from '@Next/ssr/helpers';

const SignUpPage: TAppPage<{ }, {}> = () => {
  const absoluteUrl = useSelector(configSelectors.getAbsoluteUrl)(
    routing.getSignUpUrl()
  );

  return (
    <>
      <ChpokifyHelmet
        page="signUp"
      >
        <link
          rel="canonical"
          href={absoluteUrl}
        />
      </ChpokifyHelmet>

      <Header />

      <PageLayout>
        <ContentCenter>
          <SignUp />
        </ContentCenter>
      </PageLayout>

      <Footer />
    </>
  );
};

export const getServerSideProps = reduxWrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { locale, query, res } = ctx;
    const currLocale = locale || LOCALE.EN;
    const redirectTo = spaceHelpers.redirectPageToLastSpace(store, ctx);

    if (redirectTo) {
      return redirectTo;
    }

    if (query) {
      const { product } = query;

      if (typeof product === 'string') {
        signUpMarker.setMark(res, product);
      }
    }

    return {
      props: {
        ...(await serverSideTranslations(currLocale, [TRANS.MAIN, TRANS.SEO])),
      },
    };
  }
);

export default SignUpPage;
