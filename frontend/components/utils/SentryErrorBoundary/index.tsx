import * as Sentry from '@sentry/nextjs';
import React from 'react';

import { NextCustomError } from '@components/domains/layouts/NextCustomError';

export type TSentryErrorBoundaryProps = Record<string, any>;

const SentryErrorBoundary = (props: TSentryErrorBoundaryProps): React.ReactElement | null => {
  const {
    children,
    ...other
  } = props;

  return (
    <Sentry.ErrorBoundary
      showDialog
      fallback={<NextCustomError />}
      {...other}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};

export {
  SentryErrorBoundary,
};
