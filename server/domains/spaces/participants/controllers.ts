import { participantsSchemas } from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';

import { ERROR_CODES, NotFoundError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest, TAppResponse } from '@core/types';

import { SPACE_PARTICIPANT_ROLE, TParticipantDocument, TSpaceDocument } from '@models/space';

import { SpaceService } from '@spaces/services';

const update = createHandler(async (
  req: TAppRequest<{}, participantsSchemas.TUpdateBodyReq>,
  res: TAppResponse<participantsSchemas.TUpdateResResp>
) => {
  const participant = res.locals.get('participant') as TParticipantDocument;
  const space = res.locals.get('space') as TSpaceDocument;

  participant.set(req.body);
  await space.save();

  res.locals.result = {
    space,
  };
});

const remove = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<participantsSchemas.TRemoveResResp>
) => {
  const space = res.locals.get('space') as TSpaceDocument;
  const participant = res.locals.get('participant') as TParticipantDocument;

  const spaceService = new SpaceService(space);
  await spaceService.removeParticipant(participant._id);

  res.locals.result = {
    space,
  };
});

const leave = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<participantsSchemas.TLeaveResResp>
) => {
  const space = res.locals.get('space') as TSpaceDocument;
  const participant = res.locals.get('participant') as TParticipantDocument;

  const spaceService = new SpaceService(space);
  await spaceService.removeParticipant(participant._id);

  res.locals.result = {
    space,
  };
});

const setAdminRole = createHandler(async (
  req: TAppRequest<{ participantId: string }, participantsSchemas.TSetAdminRoleReq>,
  res: TAppResponse<participantsSchemas.TSetAdminRoleResp>
) => {
  const { participantId } = req.params;
  const { isAdmin } = req.body;
  const space = res.locals.get('space') as TSpaceDocument;

  const participant = space.participants.id(participantId);

  if (!participant) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        message: transServer.t('errors.space.participant.notFound'),
        path: ['params', 'participantId'],
      },
    ]);
  }

  participant.role = isAdmin
    ? SPACE_PARTICIPANT_ROLE.ADMIN
    : SPACE_PARTICIPANT_ROLE.PLAYER;

  await space.save();

  res.locals.result = {
    space,
  };
});

const updateTeams = createHandler(async (
  req: TAppRequest<{ participantId: string }, participantsSchemas.TUpdateTeamsBodyReq>,
  res: TAppResponse<participantsSchemas.TUpdateTeamsResResp>
) => {
  const { teamsIds } = req.body;
  const { participantId } = req.params;

  const space = res.locals.get('space') as TSpaceDocument;

  const spaceService = new SpaceService(space);

  spaceService.updateTeamsFromParticipant(participantId, teamsIds);

  await space.save();

  res.locals.result = {
    space,
  };
});

export const participantsControllers = {
  update,
  remove,
  leave,
  setAdminRole,
  updateTeams,
};
