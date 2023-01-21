import { teamsSchemas } from '@chpokify/api-schemas';
import { SPACE_PARTICIPANT_ROLE } from '@chpokify/models-types';
import { Router } from 'express';

import { validateMiddleware } from '@core/middleware/validate';

import { spacesMiddlewares } from '@spaces/middlewares';
import { teamsControllers } from '@spaces/teams/controllers';
import { teamsMiddlewares } from '@spaces/teams/middlewares';

const teamsRouter = Router();

teamsRouter.post(
  '/',
  validateMiddleware(teamsSchemas.createSchema),
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  teamsControllers.create
);

teamsRouter.use(
  '/:teamId',
  teamsMiddlewares.withTeam
);

teamsRouter.patch(
  '/:teamId',
  validateMiddleware(teamsSchemas.updateReqSchemas),
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  teamsControllers.update
);

teamsRouter.delete(
  '/:teamId',
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  teamsControllers.remove
);

export { teamsRouter };
