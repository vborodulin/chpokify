import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { spacesAsyncActions } from '@Redux/domains/spaces/asyncActions';
import { reduxWrapper } from '@Redux/lib/configureStore';
import { TAppPage } from '@Redux/types';

import { Footer } from '@components/domains/layouts/Footer';
import { Header } from '@components/domains/layouts/Header';
import { InviteToSpaceAccept } from '@components/domains/space/SpaceInviteAccept';

import { ContentCenter } from '@components/uiKit/ContentCenter';
import { PageLayout } from '@components/uiKit/PageLayout';

import { LOCALE, TRANS } from '@components/utils/types';

import { setCurrSSRRequest, setCurrSSRResponse } from '@lib/api';

const InviteToSpaceAcceptPage: TAppPage<{}, {}> = () => (
  <>
    <Header />

    <PageLayout>
      <ContentCenter>
        <InviteToSpaceAccept />
      </ContentCenter>
    </PageLayout>

    <Footer />
  </>
);

export const getServerSideProps = reduxWrapper.getServerSideProps((store) => async (ctx) => {
  const { query, locale } = ctx;
  const currLocale = locale || LOCALE.EN;
  const token = query?.token as string;

  setCurrSSRRequest(ctx.req);
  setCurrSSRResponse(ctx.res);

  await store.dispatch(spacesAsyncActions.inviteValidate({ token }));

  return {
    props: {
      ...(await serverSideTranslations(currLocale, [TRANS.MAIN, TRANS.SEO])),
    },
  };
});

export default InviteToSpaceAcceptPage;
