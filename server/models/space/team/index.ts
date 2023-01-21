import { isEqualsId } from '@chpokify/helpers';
import { transServer } from '@chpokify/i18n';
import { TEAM_NAME_MAX_LENGTH, TEAM_NAME_MIN_LENGTH } from '@chpokify/models-types';
import mongoose from 'mongoose';

import { TSpaceDocument, TTeam } from '@models/space';

/**
 * mongoose types
 */

type TTeamDocument =
  mongoose.Document &
  TTeam;

/**
 * schemas
 */

const TeamSchema = new mongoose.Schema<TTeamDocument>({
  name: {
    type: mongoose.Schema.Types.String,
    minlength: TEAM_NAME_MIN_LENGTH,
    maxlength: TEAM_NAME_MAX_LENGTH,
    required: true,
  },
  participantsIds: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }],
});

/**
 * middleware
 *
 */
TeamSchema.pre<TTeamDocument>('save', function (next) {
  const space = this.$parent() as TSpaceDocument;

  // remove duplicated
  this.participantsIds = Array.from(new Set(this.participantsIds));

  // check participant exists in space
  for (let i = 0; i < this.participantsIds.length; i++) {
    const id = this.participantsIds[i];

    if (!space.participants.find((item) => isEqualsId(item._id, id))) {
      const err = new mongoose.Error.ValidationError();

      err.addError('participantsIds', new mongoose.Error.ValidatorError({
        message: transServer.t('errors.updateSpaceParticipantsIdsInvalid'),
        value: this.participantsIds,
        path: 'participantsIds',
      }));

      throw err;
    }
  }

  next();
});

export {
  TeamSchema,
};

export type {
  TTeam,
  TTeamDocument,
};
