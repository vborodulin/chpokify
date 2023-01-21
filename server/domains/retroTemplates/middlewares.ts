import { coreSchemas } from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';

import {
  BadRequestError,
  ERROR_CODES,
  NotFoundError,
} from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest } from '@core/types';

import { RetroTemplateModel, TRetroTemplateDocument } from '@models/retroTemplate';

const withTemplate = (from: 'params' | 'body') => createHandler(async (
  req: TAppRequest<{ templateId: string }>,
  res
) => {
  const { templateId } = from === 'params' ? req.params : req.body;
  const { value } = coreSchemas.ObjectIdSchema.validate(templateId);

  if (!value) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
      {
        path: ['params', 'templateId'],
        message: transServer.t('errors.retroSessionTemplate.invalidId'),
      },
    ]);
  }

  const retroTemplate = await RetroTemplateModel.findById(templateId);

  if (!retroTemplate) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        message: transServer.t('errors.retroSessionTemplate.notFound'),
        path: ['params', 'templateId'],
      },
    ]);
  }

  res.locals.set('retroTemplate', retroTemplate);
});

const withColumn = (from: 'params' | 'body') => createHandler(async (
  req: TAppRequest,
  res
) => {
  const { columnId } = from === 'params' ? req.params : req.body;

  const retroTemplate = res.locals.get('retroTemplate') as TRetroTemplateDocument;

  const { value } = coreSchemas.ObjectIdSchema.validate(columnId);

  if (!value) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
      {
        path: [from, 'columnId'],
        message: transServer.t('errors.retroSessionTemplate.column.invalidId'),
      },
    ]);
  }

  const column = retroTemplate.columns.id(columnId);

  if (!column) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [{
      message: transServer.t('errors.retroSessionTemplate.column.notFound'),
      path: [from, 'columnId'],
    }]);
  }

  res.locals.set('retroTemplateColumn', column);
});

const retroTemplateMiddlewares = {
  withTemplate,
  withColumn,
};

export {
  retroTemplateMiddlewares,
};
