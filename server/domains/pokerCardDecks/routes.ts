import { pokerCardDecksSchemas } from '@chpokify/api-schemas';
import { SPACE_PARTICIPANT_ROLE } from '@chpokify/models-types';
import { pokerCardDeckControllers } from '@pokerCardDecks/controllers';
import { cardDecksMiddlewares } from '@pokerCardDecks/middlewares';
import { Router } from 'express';

import { validateMiddleware } from '@core/middleware/validate';

import { spacesMiddlewares } from '@spaces/middlewares';

const pokerCardDecksRouter = Router();

pokerCardDecksRouter.get(
  '/',
  pokerCardDeckControllers.getList
);

pokerCardDecksRouter.get(
  '/with-deleted',
  pokerCardDeckControllers.getListWithDeleted
);

pokerCardDecksRouter.post(
  '/',
  validateMiddleware(pokerCardDecksSchemas.CreateSchema),
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  pokerCardDeckControllers.create
);

pokerCardDecksRouter.use(
  '/:id',
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  cardDecksMiddlewares.withCardDeck()
);

pokerCardDecksRouter.put(
  '/:id',
  validateMiddleware(pokerCardDecksSchemas.UpdateSchema),
  pokerCardDeckControllers.update
);

pokerCardDecksRouter.delete(
  '/:id',
  pokerCardDeckControllers.remove
);

export {
  pokerCardDecksRouter,
};
