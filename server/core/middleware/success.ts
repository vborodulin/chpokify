import { timeHelpers } from '@chpokify/helpers';

import { log } from '@core/lib/logger';
import {
  TAppNext, TAppRequest, TAppResponse, TSuccessResponse,
} from '@core/types';

export const successMiddleware = (req: TAppRequest, res: TAppResponse<{}>, next: TAppNext) => {
  try {
    const { result } = res.locals;

    if (result === undefined) {
      next();
      return;
    }

    const time = timeHelpers.hrtimeToMs(req.timeStart);
    log.info({ reqId: res.locals.reqId, methodName: 'success_middleware', elapsed: time }, 'RESPONSE_METRICS');

    req.promDurationTimer({
      code: res.statusCode,
      method: req.method,
      route: req.path,
    });

    const responseData: TSuccessResponse<any> = {
      error: null,
      result,
      meta: {
        time,
      },
    };

    res.json(responseData);
  } catch (err) {
    next(err);
  }
};
