import { retroTemplateSchemas } from '@chpokify/api-schemas';
import { retroRelationsRouter } from '@domains/retroRelations/routes';
import { retroTemplateControllers } from '@domains/retroTemplates/controllers';
import { retroTemplateMiddlewares } from '@domains/retroTemplates/middlewares';
import { Router } from 'express';

import { validateMiddleware } from '@core/middleware/validate';

const retroTemplateRouter = Router();

retroTemplateRouter.use(
  '/:templateId',
  retroTemplateMiddlewares.withTemplate('params')
);

retroTemplateRouter.use(
  '/:templateId/relations',
  retroRelationsRouter
);

retroTemplateRouter.get(
  '/:templateId',
  retroTemplateControllers.get
);

retroTemplateRouter.post(
  '/:templateId/move/column',
  validateMiddleware(retroTemplateSchemas.moveColumnSchema),
  retroTemplateControllers.moveColumn
);

retroTemplateRouter.post(
  '/:templateId/columns',
  validateMiddleware(retroTemplateSchemas.createColumnSchema),
  retroTemplateControllers.createColumn
);

retroTemplateRouter.use(
  '/:templateId/columns/:columnId',
  retroTemplateMiddlewares.withColumn('params')
);

retroTemplateRouter.put(
  '/:templateId/columns/:columnId',
  validateMiddleware(retroTemplateSchemas.updateColumnSchema),
  retroTemplateControllers.updateColumn
);

retroTemplateRouter.delete(
  '/:templateId/columns/:columnId',
  retroTemplateControllers.removeColumn
);

export {
  retroTemplateRouter,
};
