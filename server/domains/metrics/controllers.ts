import { SUCCESS_VOID_RESULT } from '@chpokify/api-schemas';

import { register } from '@core/lib/prom';
import { createHandler } from '@core/middleware/createHandler';

const check = createHandler(async (
  req,
  res
) => {
  res.locals.result = SUCCESS_VOID_RESULT;
});

const getPromMetrics = async (_, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.end(await register.metrics());
};

const debugSentry = createHandler(async () => {
  throw new Error('Senty error!');
});

export const metricsController = {
  check,
  getPromMetrics,
  debugSentry,
};
