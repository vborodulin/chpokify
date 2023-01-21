import { dateHelpers } from '@chpokify/helpers';
import { transServer } from '@chpokify/i18n';
import { formatDistance } from 'date-fns';
import rateLimit from 'express-rate-limit';

import { ERROR_CODES, TooManyRequestsError } from '@core/lib/errors';
import { TAppNext, TAppRequest, TAppResponse } from '@core/types';

const rateLimitMiddleware = (options: Partial<rateLimit.Options> = {}) => rateLimit({
  handler(req: TAppRequest, res: TAppResponse, next: TAppNext) {
    const getErrMessage = () => {
      if (req.rateLimit.resetTime) {
        return transServer.t('errors.tooManyRequestsWithRemaining', {
          distance: formatDistance(
            dateHelpers.getCurrentDateUTC(),
            req.rateLimit.resetTime
          ),
        });
      }

      return transServer.t('errors.tooManyRequests');
    };

    const err = new TooManyRequestsError(ERROR_CODES.TOO_MANY_REQUESTS, [
      {
        message: getErrMessage(),
        path: [],
      },
    ]);
    next(err);
  },
  ...options,
});

export {
  rateLimitMiddleware,
};
