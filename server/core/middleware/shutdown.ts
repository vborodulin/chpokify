import { transServer } from '@chpokify/i18n';

import { ERROR_CODES, ServiceUnavailableError } from '@core/lib/errors';
import { TAppNext, TAppRequest, TAppResponse } from '@core/types';

export const shutdownMiddleware = (req: TAppRequest, res: TAppResponse<{}>, next: TAppNext) => {
  try {
    if (!req.app.enabled('closing')) {
      next();
      return;
    }

    res.set('Connection', 'close');
    const err = new ServiceUnavailableError(ERROR_CODES.SERVICE_UNAVAILABLE, [
      {
        message: transServer.t('errors.serverIsShuttingDown'),
        path: [],
      },
    ]);
    next(err);
  } catch (err) {
    next(err);
  }
};
