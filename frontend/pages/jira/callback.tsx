import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { jiraAsyncActions } from '@Redux/domains/jira/asyncActions';
import { reduxWrapper } from '@Redux/lib/configureStore';
import { TAppPage } from '@Redux/types';

import { JiraCallback } from '@components/domains/integrations/jira/JiraCallback';
import { ChpokifyHelmet } from '@components/domains/marketing/ChpokifyHelmet';

import { ContentCenter } from '@components/uiKit/ContentCenter';
import { PageLayoutNarrow } from '@components/uiKit/PageLayoutNarrow';

import { LOCALE, TRANS } from '@components/utils/types';

import { setCurrSSRRequest, setCurrSSRResponse } from '@lib/api';

const JiraCallbackPage: TAppPage<{}, {}> = () => (
  <>
    <ChpokifyHelmet>
      <meta
        name="robots"
        content="noindex, nofollow"
      />
    </ChpokifyHelmet>

    <PageLayoutNarrow>
      <ContentCenter>
        <JiraCallback />
      </ContentCenter>
    </PageLayoutNarrow>
  </>
);

export const getServerSideProps = reduxWrapper.getServerSideProps((store) => async (ctx) => {
  const { query } = ctx;
  const { dispatch } = store;

  setCurrSSRRequest(ctx.req);
  setCurrSSRResponse(ctx.res);

  const {
    // eslint-disable-next-line camelcase
    oauth_token,
    // eslint-disable-next-line camelcase
    oauth_verifier,
  } = query;

  await dispatch(jiraAsyncActions.oauthCallback(
    // eslint-disable-next-line camelcase
    oauth_token as string,
    // eslint-disable-next-line camelcase
    oauth_verifier as string
  ));

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || LOCALE.EN, [TRANS.MAIN, TRANS.SEO])),
    },
  };
});

export default JiraCallbackPage;
