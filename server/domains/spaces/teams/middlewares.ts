import { coreSchemas } from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';

import { BadRequestError, ERROR_CODES, NotFoundError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest } from '@core/types';

import { TSpaceDocument, TTeam } from '@models/space';

export type TWIthTeam = {
  team: TTeam;
};

const withTeam = createHandler(async (
  req: TAppRequest<{teamId: string}>,
  res
) => {
  const { params: { teamId } } = req;
  const space = res.locals.get('space') as TSpaceDocument;
  const team = space.teams.id(teamId);

  const { error } = coreSchemas.ObjectIdSchema.validate(teamId);

  if (error) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
      {
        path: ['params', 'teamId'],
        message: transServer.t('errors.team.invalidId'),
      },
    ]);
  }

  if (!team) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [{
      message: transServer.t('errors.teamNotFound'),
      path: ['params', 'teamId'],
    }]);
  }

  res.locals.set('team', team);
});

const teamsMiddlewares = {
  withTeam,
};

export {
  teamsMiddlewares,
};
