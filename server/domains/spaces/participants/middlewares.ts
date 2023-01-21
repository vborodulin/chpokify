import { coreSchemas } from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';

import { BadRequestError, ERROR_CODES, NotFoundError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest } from '@core/types';

import { TSpaceDocument, TParticipantDocument } from '@models/space';

export type TWithParticipant = {
  participant: TParticipantDocument;
};

const withParticipant = createHandler(async (
  req: TAppRequest<{participantId: string}>,
  res
) => {
  const { params: { participantId } } = req;
  const space = res.locals.get('space') as TSpaceDocument;

  const { error } = coreSchemas.ObjectIdSchema.validate(participantId);

  if (error) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
      {
        path: ['params', 'participantId'],
        message: transServer.t('errors.participant.invalidId'),
      },
    ]);
  }

  const participant = space.participants.id(participantId);

  if (!participant) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [{
      message: transServer.t('errors.participantNotFound'),
      path: ['params', 'participantId'],
    }]);
  }

  res.locals.set('participant', participant);
});

export const participantsMiddlewares = {
  withParticipant,
};
