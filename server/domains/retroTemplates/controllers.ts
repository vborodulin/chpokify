import { retroTemplateSchemas, SUCCESS_VOID_RESULT, TSuccessVoidResult } from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';
import { RetroTemplatesService } from '@domains/retroTemplates/services';
import { ObjectID } from 'bson';

import { ERROR_CODES, NotFoundError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest, TAppResponse } from '@core/types';

import { RetroRelationsModel } from '@models/retroRelations';
import { RetroTemplateModel, TRetroTemplateDocument } from '@models/retroTemplate';
import { TRetroColumnDocument } from '@models/retroTemplate/column/types';

const getList = createHandler(async (
  req: TAppRequest<{}, retroTemplateSchemas.TGetListBodyReq>,
  res: TAppResponse<retroTemplateSchemas.TGetListResResp>
) => {
  const { ids } = req.body;
  const objectIdIds = ids.map((id) => new ObjectID(id));

  const retroTemplates = await RetroTemplateModel.find({
    _id: {
      $in: objectIdIds,
    },
  });

  res.locals.result = {
    retroTemplates,
  };
});

const get = createHandler(async (
  req: TAppRequest<{}>,
  res: TAppResponse<retroTemplateSchemas.TGetResResp>
) => {
  const retroTemplate = res.locals.get('retroTemplate') as TRetroTemplateDocument;

  res.locals.result = {
    retroTemplate,
  };
});

const createColumn = createHandler(async (
  req: TAppRequest<{}, retroTemplateSchemas.TCreateColumnBodyReq>,
  res: TAppResponse<retroTemplateSchemas.TCreateColumnResResp>
) => {
  const retroTemplate = res.locals.get('retroTemplate') as TRetroTemplateDocument;

  const retroTemplateService = new RetroTemplatesService(retroTemplate);

  const newColumn = retroTemplateService.createColumn({
    title: req.body.title,
  });
  const newRelations = RetroRelationsModel.createNew({
    templateId: retroTemplate._id,
    columnId: newColumn._id,
  });

  await Promise.all([
    retroTemplate.save(),
    newRelations.save(),
  ]);

  res.locals.result = {
    retroTemplate,
  };
});

const updateColumn = createHandler(async (
  req: TAppRequest<{}, retroTemplateSchemas.TUpdateColumnBodyReq>,
  res: TAppResponse<retroTemplateSchemas.TUpdateColumnResResp>
) => {
  const retroTemplate = res.locals.get('retroTemplate') as TRetroTemplateDocument;
  const retroColumn = res.locals.get('retroTemplateColumn') as TRetroColumnDocument;

  retroColumn.set(req.body);

  await retroTemplate.save();

  res.locals.result = {
    retroTemplate,
  };
});

const removeColumn = createHandler(async (
  req: TAppRequest<{}>,
  res: TAppResponse<retroTemplateSchemas.TRemoveColumnResResp>
) => {
  const retroTemplate = res.locals.get('retroTemplate') as TRetroTemplateDocument;
  const retroColumn = res.locals.get('retroTemplateColumn') as TRetroColumnDocument;

  await Promise.all([
    retroColumn.remove(),
    RetroRelationsModel.remove({
      templateId: retroTemplate._id,
      columnId: retroColumn._id,
    }),
  ]);

  await retroTemplate.save();

  res.locals.result = {
    retroTemplate,
  };
});

const moveColumn = createHandler(async (
  req: TAppRequest<{}, retroTemplateSchemas.TMoveColumnBodyReq>,
  res: TAppResponse<TSuccessVoidResult>
) => {
  const {
    columnStartIdx,
    columnFinishIdx,
    columnId,
  } = req.body;

  const retroTemplate = res.locals.get('retroTemplate') as TRetroTemplateDocument;

  const column = retroTemplate.columns.id(columnId);

  if (!column) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [{
      message: transServer.t('errors.retroSessionTemplate.column.notFound'),
      path: ['body', 'columnId'],
    }]);
  }

  const newColumns = Array.from(retroTemplate.columns);

  newColumns.splice(columnStartIdx, 1);
  newColumns.splice(columnFinishIdx, 0, column);

  retroTemplate.set({ columns: newColumns });

  await retroTemplate.save();

  res.locals.result = SUCCESS_VOID_RESULT;
});

export const retroTemplateControllers = {
  get,
  createColumn,
  updateColumn,
  removeColumn,
  moveColumn,
  getList,
};
