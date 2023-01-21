import { LogLevelString, Serializer, LoggerOptions } from 'bunyan';

import { TAppRequest } from '@core/types';

const reqSerializer: Serializer = (req: TAppRequest) => ({
  url: req.url,
  method: req.method,
  headers: req.headers,
  cookies: req.cookies,
  body: req.body,
  params: req.params,
  query: req.query,
});

const errSerializer: Serializer = (err: Error) => ({
  name: err.name,
  stack: err.stack,
  message: err.message,
});

const options: LoggerOptions = {
  env: process.env.NODE_ENV as string,
  name: process.env.LOGGER_NAME as string,
  project: process.env.LOGGER_PROJECT as string,
  streams: [
    {
      level: process.env.LOGGER_LEVEL as LogLevelString,
      stream: process.stdout,
    },
    {
      type: 'rotating-file',
      level: 'error',
      path: '/var/log/server.log',
      period: '1w',
      count: 3,
    },
  ],
  serializers: {
    req: reqSerializer,
    err: errSerializer,
  },
};

export { options };
