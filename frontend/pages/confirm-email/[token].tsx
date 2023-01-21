import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { authAsyncActions } from '@Redux/domains/auth/asyncActions';
import { reduxWrapper } from '@Redux/lib/configureStore';
import { TAppPage } from '@Redux/types';

import { ConfirmEmail } from '@components/domains/auth/ConfirmEmail';
import { Footer } from '@components/domains/layouts/Footer';
import { Header } from '@components/domains/layouts/Header';

import { ContentCenter } from '@components/uiKit/ContentCenter';
import { PageLayout } from '@components/uiKit/PageLayout';

import { TRANS } from '@components/utils/types';

import { setCurrSSRRequest, setCurrSSRResponse } from '@lib/api';

const ConfirmEmailPage: TAppPage<{}, {}> = () => (
  <>
    <Header />

    <PageLayout>
      <ContentCenter>
        <ConfirmEmail />
      </ContentCenter>
    </PageLayout>

    <Footer />
  </>
);

export const getServerSideProps = reduxWrapper.getServerSideProps((store) => async (ctx) => {
  const { query } = ctx;
  const token = query?.token as string;

  setCurrSSRRequest(ctx.req);
  setCurrSSRResponse(ctx.res);

  await store.dispatch(authAsyncActions.confirmEmail({ token }));

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string, [TRANS.MAIN, TRANS.SEO])),
    },
  };
});

export default ConfirmEmailPage;
