import { retroRelationsSchemas } from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';

import { ERROR_CODES, NotFoundError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest } from '@core/types';

import { RetroRelationsModel } from '@models/retroRelations';
import { TRetroTemplateDocument } from '@models/retroTemplate';
import { TRetroColumnDocument } from '@models/retroTemplate/column/types';

const withRelation = createHandler(async (
  req: TAppRequest,
  res
) => {
  const retroTemplate = res.locals.get('retroTemplate') as TRetroTemplateDocument;
  const retroColumn = res.locals.get('retroTemplateColumn') as TRetroColumnDocument;

  const retroRelations = await RetroRelationsModel.findOne({
    templateId: retroTemplate._id,
    columnId: retroColumn._id,
  });

  if (!retroRelations) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        message: transServer.t('errors.retroRelations.notFound'),
        path: ['templateId', 'columnId'],
      },
    ]);
  }

  res.locals.set('retroRelation', retroRelations);
});

const withRelationsFromMoveTask = createHandler(async (
  req: TAppRequest<{}, retroRelationsSchemas.TMoveCardBetweenColumnsBodyReq>,
  res
) => {
  const {
    columnStartId,
    columnFinishId,
  } = req.body;

  const retroTemplate = res.locals.get('retroTemplate') as TRetroTemplateDocument;

  const retroTemplateId = retroTemplate._id;

  const [retroRelationFromColumnStart, retroRelationFromColumnFinish] = await Promise.all([
    RetroRelationsModel.findOne({
      templateId: retroTemplateId,
      columnId: columnStartId,
    }),
    RetroRelationsModel.findOne({
      templateId: retroTemplateId,
      columnId: columnFinishId,
    }),
  ]);

  if (!retroRelationFromColumnStart || !retroRelationFromColumnFinish) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        message: transServer.t('errors.retroRelations.notFound'),
        path: ['templateId', 'columnId'],
      },
    ]);
  }

  res.locals.set('retroRelationFromColumnStart', retroRelationFromColumnStart);
  res.locals.set('retroRelationFromColumnFinish', retroRelationFromColumnFinish);
});

const retroRelationsMiddlewares = {
  withRelation,
  withRelationsFromMoveTask,
};

export {
  retroRelationsMiddlewares,
};
