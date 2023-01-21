import { transServer } from '@chpokify/i18n';

import { ERROR_CODES, NotImplementedError } from '@core/lib/errors';
import { TAppNext } from '@core/types';

export const notFoundMiddleware = (_, __, next: TAppNext) => {
  next(new NotImplementedError(ERROR_CODES.NOT_IMPLEMENTED, [
    {
      message: transServer.t('errors.notImplemented'),
      path: [],
    },
  ]));
};
