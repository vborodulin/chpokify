import { jiraSchemas } from '@chpokify/api-schemas/jiraSchemas';
import { SPACE_PARTICIPANT_ROLE } from '@chpokify/models-types';
import { jiraControllers } from '@domains/jira/controllers';
import { Router } from 'express';

import { authMiddleware } from '@core/middleware/auth';
import { validateMiddleware } from '@core/middleware/validate';

import { spacesMiddlewares } from '@spaces/middlewares';

const jiraRouter = Router();

jiraRouter.get(
  '/application-link',
  jiraControllers.getApplicationLink
);

jiraRouter.all(
  '*',
  authMiddleware()
);

jiraRouter.post(
  '/oauth/token',
  validateMiddleware(jiraSchemas.genOauthSchemaReq),
  jiraControllers.oauthMake
);

jiraRouter.get(
  '/oauth/callback',
  jiraControllers.oauthCallback
);

jiraRouter.post(
  '/oauth/remove',
  validateMiddleware(jiraSchemas.removeOauthSchemaReq),
  jiraControllers.oauthRemove
);

jiraRouter.post(
  '/issues/import',
  validateMiddleware(jiraSchemas.issuesImportSchemaReq),
  spacesMiddlewares.withSpace('body'),
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  jiraControllers.issuesImport
);

jiraRouter.get(
  '/fields',
  validateMiddleware(jiraSchemas.baseUrlQuerySchemaReq),
  jiraControllers.getFields
);

jiraRouter.get(
  '/projects',
  validateMiddleware(jiraSchemas.baseUrlQuerySchemaReq),
  jiraControllers.getProjects
);

export {
  jiraRouter,
};
