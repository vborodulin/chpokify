import { RewriteFrames, Dedupe, Transaction } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

// const trimPrefix = '/home/server/build/webpack:/chpokify';

const sentryInit = (app: any) => {
  Sentry.init({
    enabled: true,
    environment: process.env.NODE_ENV,
    dsn: process.env.SERVER_SENTRY_DSN,
    integrations: [
      ...Sentry.defaultIntegrations,
      new RewriteFrames({
        iteratee: (frame) => {
          if (frame.filename) {
            frame.filename = frame.filename.replace(
              '/home/server/',
              'app:///'
            );
            // if (frame.filename.startsWith('/home/server/build')) {
            //   frame.filename = frame.filename.replace(trimPrefix, 'app:///');
            // }

            // if (frame.filename.startsWith('/home')) {
            //   frame.filename = frame.filename.replace('/home', 'app:///');
            // }
          }

          return frame;
        },
      }),
      new Dedupe(),
      new Transaction(),
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    release: process.env.BUILD_ID,
    tracesSampleRate: 1.0,
    maxBreadcrumbs: 50,
    attachStacktrace: true,

  });
};

export {
  sentryInit,
};
