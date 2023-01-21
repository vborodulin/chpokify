import { v4 as uuidv4 } from 'uuid';

import { log } from '@core/lib/logger';
import { httpRequestDurationMicroseconds } from '@core/lib/prom';
import { TAppNext, TAppRequest, TAppResponse } from '@core/types';

export const metricsMiddleware = (req: TAppRequest, res: TAppResponse<{}>, next: TAppNext) => {
  try {
    const reqId = uuidv4();
    res.locals.reqId = reqId;

    log.info({ reqId, req, methodName: 'metrics_middleware' }, 'REQUEST_INFO');
    req.timeStart = process.hrtime();

    req.promDurationTimer = httpRequestDurationMicroseconds.startTimer();

    next();
  } catch (err) {
    next(err);
  }
};
