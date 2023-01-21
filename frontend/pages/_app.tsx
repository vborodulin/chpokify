import { isServer } from '@chpokify/helpers';
import { THEME_TYPES } from '@chpokify/models-types';
import { appWithTranslation } from 'next-i18next';
import App, { AppInitialProps } from 'next/app';
import React from 'react';

import { authAsyncActions } from '@Redux/domains/auth/asyncActions';
import { authRepoOperations } from '@Redux/domains/authRepo/operations';
import { configAsyncActions } from '@Redux/domains/config/asyncActions';
import { reduxWrapper } from '@Redux/lib/configureStore';

import { MainLayout } from '@components/domains/layouts/MainLayout';
import { ChpokifyHelmet } from '@components/domains/marketing/ChpokifyHelmet';
import { schemaOrgHelpers } from '@components/domains/marketing/helpers/shemaOrg';
import { LDJson } from '@components/domains/marketing/LDJson';

import { NextProgress } from '@components/utils/NextProgress';
import { PageFetchErrorCatcher } from '@components/utils/PageFetchErrorCatcher';
import { SentryErrorBoundary } from '@components/utils/SentryErrorBoundary';
import { ThemeProvider } from '@components/utils/ThemeProvider';

import { setCurrSSRRequest, setCurrSSRResponse } from '@lib/api';
import { auth } from '@lib/auth';
import { log } from '@lib/logger';
import { reportWebVitals } from '@lib/webVitals';

import { getTheme, GlobalStyle } from '@styles';

log.info('BUILD_ID', process.env.BUILD_ID);

class MyApp extends App<AppInitialProps> {
  public static getInitialProps = reduxWrapper.getInitialAppProps((store) => async (appProps) => {
    if (isServer()) {
      const { ctx } = appProps;
      const {
        dispatch,
      } = store;

      setCurrSSRRequest(ctx.req);
      setCurrSSRResponse(ctx.res);

      await dispatch(configAsyncActions.getConfig());
      const sid = auth.getSessionId(ctx);

      if (sid) {
        const res = await dispatch(authAsyncActions.get());

        if (!('error' in res.payload)) {
          if (res.payload.user) {
            await dispatch(authRepoOperations.loadCurrUserMeta());
          }
        }
      }
    }

    return {
      pageProps: {
      },
    };
  });

  public render() {
    const { Component, pageProps } = this.props;

    const theme = getTheme(THEME_TYPES.LIGHT);

    return (
      <SentryErrorBoundary>
        <ChpokifyHelmet
          page="index"
        />

        <LDJson
          schema={schemaOrgHelpers.getWebApp()}
        />

        <PageFetchErrorCatcher>
          <ThemeProvider>
            <GlobalStyle />

            <NextProgress
              color={theme.colors.primary.normal}
            />
            <MainLayout>
              <Component
                {...pageProps}
              />
            </MainLayout>
          </ThemeProvider>
        </PageFetchErrorCatcher>
      </SentryErrorBoundary>
    );
  }
}

export default reduxWrapper.withRedux(
  appWithTranslation(MyApp)
);

export {
  reportWebVitals,
};
