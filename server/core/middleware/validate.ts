import Joi from '@hapi/joi';

import { ERROR_CODES, BadRequestError } from '@core/lib/errors';
import { log } from '@core/lib/logger';
import { createHandler } from '@core/middleware/createHandler';

export const validateMiddleware = (schema: Joi.Schema) => createHandler((
  req
) => {
  const { error }: Joi.ValidationResult = schema.validate(req);

  if (!error) {
    return;
  }

  let type = ERROR_CODES.INVALID_PARAM;

  if (error.details[0].message.includes('required')) {
    type = ERROR_CODES.PARAM_REQUIRED;
  } else if (error.details[0].message.includes('not allowed')) {
    type = ERROR_CODES.PARAM_NOT_ALLOWED;
  }

  log.info({ methodName: 'validate_middleware' }, `validation error: ${error.message}`);

  throw new BadRequestError(
    `${type}: ${error.details[0].message}: ${error.details[0].path.join('.').replace(/\.(\d)/g, '[$1]')}`,
    error.details
  );
});
