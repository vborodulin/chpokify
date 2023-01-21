import { timeHelpers } from '@chpokify/helpers';
import { transServer } from '@chpokify/i18n';
import { ENVIRONMENT } from '@chpokify/models-types';
import * as Sentry from '@sentry/node';
import { LogLevel } from 'bunyan';

import { ErrorAdapter } from '@core/lib/errors/errorAdapter';
import { log } from '@core/lib/logger';
import {
  TAppNext, TAppRequest, TAppResponse, TFailResponse,
} from '@core/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: Error, req: TAppRequest, res: TAppResponse<{}>, _: TAppNext) => {
  Sentry.withScope((scope) => {
    scope.setExtra('error', err);
    Sentry.captureException(err);
  });

  const httpError = new ErrorAdapter(err).parse();

  const status = httpError.code;
  const method: LogLevel = status === 500 ? 'error' : 'warn';
  const time = timeHelpers.hrtimeToMs(process.hrtime(req.timeStart));

  log[method]({
    reqId: res.locals.reqId,
    status,
    err,
    methodName: 'error_middleware',
    elapsed: time,
  });

  const responseData: TFailResponse = {
    error: {
      message: process.env.NODE_ENV !== ENVIRONMENT.DEVELOPMENT && status === 500
        ? transServer.t('errors.internalError')
        : httpError.message,
      details: httpError.details,
      stack: process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT && status === 500
        ? httpError.stack
        : '',
      code: httpError.code,
    },
    result: null,
    meta: {
      time,
    },
  };

  res.status(status).json(responseData);
};
