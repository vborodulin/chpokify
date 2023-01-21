import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { retroSessionsAsyncActions } from '@Redux/domains/retroSessions/asyncActions';
import { reduxWrapper } from '@Redux/lib/configureStore';
import { TAppPage } from '@Redux/types';

import { retroHelpers } from '@components/domains/retro/helpers';
import { RetroSessionInviteAccept } from '@components/domains/retro/RetroSessionInviteAccept';

import { ContentCenter } from '@components/uiKit/ContentCenter';
import { PageLayout } from '@components/uiKit/PageLayout';

import { LOCALE, TRANS } from '@components/utils/types';

import { setCurrSSRRequest, setCurrSSRResponse } from '@lib/api';

const InviteToPokerSessionAcceptPage: TAppPage<{}, {}> = () => (
  <PageLayout>
    <ContentCenter>
      <RetroSessionInviteAccept />
    </ContentCenter>
  </PageLayout>
);

export const getServerSideProps = reduxWrapper.getServerSideProps((store) => async (ctx) => {
  const { query } = ctx;
  const token = query?.token as string;

  if (!token) {
    return { props: {} };
  }

  setCurrSSRRequest(ctx.req);
  setCurrSSRResponse(ctx.res);

  await store.dispatch(retroSessionsAsyncActions.inviteTokenValidate({ token }));
  const redirectTo = retroHelpers.redirectRetroSessionPageByToken(ctx, store);

  if (redirectTo) {
    return redirectTo;
  }

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || LOCALE.EN, [TRANS.MAIN, TRANS.SEO])),
    },
  };
});

export default InviteToPokerSessionAcceptPage;
