import { transServer } from '@chpokify/i18n';
import { USER_ROLES } from '@chpokify/models-types/user';

import { AuthService } from '@auth/services/AuthService';

import { ERROR_CODES, SessionExpiredError, UnauthorizedError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';

const authMiddleware = (userRole: USER_ROLES = USER_ROLES.USER) => createHandler((
  req,
  res
) => {
  if (req.user && req.user.role >= userRole) {
    return;
  }

  if (req.cookies[process.env.APP_COOKIE_SESSION_NAME as string]) {
    const authService = new AuthService(req, res);
    authService.signOut();

    throw new SessionExpiredError(ERROR_CODES.SESSION_EXPIRE, [
      {
        message: transServer.t('errors.auth.sessionExpired'),
        path: ['cookies', process.env.APP_COOKIE_SESSION_NAME as string],
      },
    ]);
  }

  throw new UnauthorizedError(ERROR_CODES.NO_AUTH, [
    {
      message: transServer.t('errors.auth.notAuthorized'),
      path: [],
    },
  ]);
});

export { authMiddleware };
