import { retroRelationsSchemas, retroSessionsSchemas, retroTemplateSchemas } from '@chpokify/api-schemas';
import { SPACE_PARTICIPANT_ROLE } from '@chpokify/models-types';
import { retroCardsRouter } from '@domains/retroCards/routes';
import { retroRelationsControllers } from '@domains/retroRelations/controllers';
import { retroSessionsMiddlewares } from '@domains/retroSessions/middlewares';
import { retroTemplateControllers } from '@domains/retroTemplates/controllers';
import { retroTemplateRouter } from '@domains/retroTemplates/routes';
import { Router } from 'express';

import { authMiddleware } from '@core/middleware/auth';
import { validateMiddleware } from '@core/middleware/validate';

import { spacesMiddlewares } from '@spaces/middlewares';

import { retroSessionsControllers } from './controllers';

const retroSessionsRouter = Router();

retroSessionsRouter.post(
  '/invite/validate',
  validateMiddleware(retroSessionsSchemas.validateInviteReqSchema),
  retroSessionsControllers.inviteValidate
);

retroSessionsRouter.use(
  '/',
  authMiddleware()
);

retroSessionsRouter.post(
  '/',
  validateMiddleware(retroSessionsSchemas.createSchema),
  spacesMiddlewares.withSpace('body'),
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  retroSessionsControllers.create
);

retroSessionsRouter.use(
  '/spaces/:spaceId',
  spacesMiddlewares.withSpace('params'),
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.PLAYER)
);

retroSessionsRouter.use(
  '/spaces/:spaceId/cards',
  retroCardsRouter
);

retroSessionsRouter.post(
  '/spaces/:spaceId/templates/list',
  validateMiddleware(retroTemplateSchemas.getListSchema),
  retroTemplateControllers.getList
);

retroSessionsRouter.post(
  '/spaces/:spaceId/relations/list',
  validateMiddleware(retroRelationsSchemas.getListByTemplatesIdsSchema),
  retroRelationsControllers.getListByTemplatesIds
);

retroSessionsRouter.get(
  '/spaces/:spaceId',
  validateMiddleware(retroSessionsSchemas.getListSchema),
  retroSessionsControllers.getList
);

retroSessionsRouter.get(
  '/spaces/:spaceId/count',
  retroSessionsControllers.getCountAll
);

retroSessionsRouter.use(
  '/:retroSessionId',
  retroSessionsMiddlewares.withSessionAndSpace('params'),
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.PLAYER)
);

retroSessionsRouter.put(
  '/:retroSessionId',
  validateMiddleware(retroSessionsSchemas.updateSchema),
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  retroSessionsControllers.update
);

retroSessionsRouter.delete(
  '/:retroSessionId',
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  retroSessionsControllers.remove
);

retroSessionsRouter.get(
  '/:retroSessionId',
  retroSessionsControllers.get
);

retroSessionsRouter.post(
  '/:retroSessionId/invite',
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  validateMiddleware(retroSessionsSchemas.inviteGenSchema),
  retroSessionsControllers.inviteGen
);

retroSessionsRouter.delete(
  '/:retroSessionId/votes/cards',
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  retroSessionsControllers.resetVotes
);

retroSessionsRouter.get(
  '/:retroSessionId/cardsActions/export/csv',
  retroSessionsControllers.exportCSV
);

retroSessionsRouter.use(
  '/:retroSessionId/template',
  retroTemplateRouter
);

export {
  retroSessionsRouter,
};
