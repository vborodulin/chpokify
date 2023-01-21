import * as Sentry from '@sentry/nextjs';
import NextErrorComponent from 'next/error';
import React from 'react';

import { TAppPage } from '@Redux/types';

import { Footer } from '@components/domains/layouts/Footer';
import { Header } from '@components/domains/layouts/Header';
import { NextCustomError } from '@components/domains/layouts/NextCustomError';

import { PageLayout } from '@components/uiKit/PageLayout';

const FLUSH_TIMEOUT = 2000;

export type TCustomErrorPageInitProps = {
  statusCode?: number;
  hasGetInitialPropsRun?: boolean;
  err?: Error
}

const CustomErrorPage: TAppPage<TCustomErrorPageInitProps, {}> = (props) => {
  const {
    statusCode,
    err,
    hasGetInitialPropsRun,
  } = props;

  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureMessage('ErrorPage');
    Sentry.captureException(err);
    // Flushing is not required in this case as it only happens on the client
  }

  return (
    <>
      <Header />

      <PageLayout>
        <NextCustomError
          statusCode={statusCode}
        />
      </PageLayout>

      <Footer />
    </>
  );
};

CustomErrorPage.getInitialProps = async ({
  res,
  err,
  asPath,
}) => {
  // @ts-ignore
  const errorInitialProps = await NextErrorComponent.getInitialProps({
    res,
    err,
  });

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  // @ts-ignore
  errorInitialProps.hasGetInitialPropsRun = true;

  // Running on the server, the response object (`res`) is available.
  //
  // Next.js will pass an err on the server if a page's data fetching methods
  // threw or returned a Promise that rejected
  //
  // Running on the client (browser), Next.js will provide an err if:
  //
  //  - a page's `getInitialProps` threw or returned a Promise that rejected
  //  - an exception was thrown somewhere in the React lifecycle (render,
  //    componentDidMount, etc) that was caught by Next.js's React Error
  //    Boundary. Read more about what types of exceptions are caught by Error
  //    Boundaries: https://reactjs.org/docs/error-boundaries.html

  if (err) {
    Sentry.captureMessage('ErrorPage');
    Sentry.captureException(err);

    // Flushing before returning is necessary if deploying to Vercel, see
    // https://vercel.com/docs/platform/limits#streaming-responses
    await Sentry.flush(FLUSH_TIMEOUT);

    return errorInitialProps;
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );
  await Sentry.flush(FLUSH_TIMEOUT);

  return errorInitialProps;
};

export default CustomErrorPage;