import { participantsSchemas } from '@chpokify/api-schemas';
import { SPACE_PARTICIPANT_ROLE } from '@chpokify/models-types';
import { Router } from 'express';

import { validateMiddleware } from '@core/middleware/validate';

import { spacesMiddlewares } from '@spaces/middlewares';
import { participantsControllers } from '@spaces/participants/controllers';
import { participantsMiddlewares } from '@spaces/participants/middlewares';

const participantsRouter = Router();

participantsRouter.use(
  '/:participantId',
  participantsMiddlewares.withParticipant
);

participantsRouter.delete(
  '/:participantId',
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  participantsControllers.remove
);

participantsRouter.patch(
  '/:participantId',
  validateMiddleware(participantsSchemas.updateSchema),
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  participantsControllers.update
);

participantsRouter.delete(
  '/:participantId/leave',
  participantsControllers.leave
);

participantsRouter.post(
  '/:participantId/role/admin',
  validateMiddleware(participantsSchemas.setAdminRoleReqSchema),
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  participantsControllers.setAdminRole
);

participantsRouter.post(
  '/:participantId/teams',
  validateMiddleware(participantsSchemas.UpdateToManyTeamSchema),
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  participantsControllers.updateTeams
);

export {
  participantsRouter,
};
