import { storiesSchemas } from '@chpokify/api-schemas/storiesSchemas';
import { SPACE_PARTICIPANT_ROLE } from '@chpokify/models-types';
import { Router } from 'express';

import { validateMiddleware } from '@core/middleware/validate';

import { spacesMiddlewares } from '@spaces/middlewares';
import { storiesController } from '@spaces/stories/controllers';
import { storiesMiddleware } from '@spaces/stories/middlewares';

const storiesRouter = Router();

storiesRouter.get(
  '/',
  storiesController.getList
);

storiesRouter.post(
  '/',
  validateMiddleware(storiesSchemas.createSchema),
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  storiesController.create
);

storiesRouter.post(
  '/many',
  validateMiddleware(storiesSchemas.createManySchema),
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  storiesController.createMany
);

storiesRouter.post(
  '/list',
  validateMiddleware(storiesSchemas.getManySchema),
  storiesController.getMany
);

storiesRouter.use(
  '/:storyId',
  storiesMiddleware.withStory
);

storiesRouter.get(
  '/:storyId',
  storiesController.get
);

storiesRouter.patch(
  '/:storyId',
  validateMiddleware(storiesSchemas.updateSchema),
  storiesController.update
);

storiesRouter.delete(
  '/:storyId',
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  storiesController.remove
);

export {
  storiesRouter,
};
