import { spaceHelpers } from '@chpokify/helpers';
import {
  SPACE_NAME_MAX_LENGTH,
  SPACE_NAME_MIN_LENGTH,
  SPACE_PARTICIPANT_ROLE, TEntityID,
  TInviteTokenPayload,
  TParticipant,
  TSpace,
  TTeam,
} from '@chpokify/models-types';
import { io } from '@socket';
import mongoose from 'mongoose';

import { softDeletePlugin } from '@core/lib/db/plugins';
import { typesHelpers } from '@core/types/helpers';

import { TPokerSessionDocument } from '@models/pokerSession';

import { ParticipantSchema, TParticipantDocument } from './participants';
import { spaceSchemaStatics } from './static';
import { TeamSchema, TTeamDocument } from './team';

/**
 * mongoose types
 */

type TSpaceDocumentMethods = {
  getRole: (userId: TEntityID) => SPACE_PARTICIPANT_ROLE;
}
type TSpaceDocumentStatic = typeof spaceSchemaStatics;

type TSpaceDocument = mongoose.Document & typesHelpers.Override<TSpace, {
  participants: mongoose.Types.DocumentArray<TParticipantDocument>;
  teams: mongoose.Types.DocumentArray<TTeamDocument>;
  pokerSessions: mongoose.Types.DocumentArray<TPokerSessionDocument>
}> & TSpaceDocumentMethods;

type TSpaceModel = mongoose.Model<TSpaceDocument> & TSpaceDocumentStatic;

/**
 * schema
 */

const SpaceSchema = new mongoose.Schema<TSpaceDocument>({
  name: {
    type: mongoose.Schema.Types.String,
    minlength: SPACE_NAME_MIN_LENGTH,
    maxlength: SPACE_NAME_MAX_LENGTH,
    default: 'Default space',
  },
  generatedAvatarSvg: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  participants: [ParticipantSchema],
  teams: [TeamSchema],
  customerId: {
    type: mongoose.Schema.Types.String,
  },
}, {
  timestamps: true,
  strict: true,
  strictQuery: true,
  minimize: false,
});

/**
 * indexes
 *
 */
SpaceSchema.index({
  'participants.userId': 1,
  isDeleted: 1,
});

SpaceSchema.index({
  _id: 1,
  isDeleted: 1,
});

/**
 * plugins
 *
 */

SpaceSchema.plugin(softDeletePlugin);

/**
 * methods
 *
 */

SpaceSchema.methods.getRole = function (this: TSpaceDocument, userId: string) {
  return spaceHelpers.getParticipantRole(this, userId);
};

/**
 * static
 */

SpaceSchema.statics = spaceSchemaStatics;

/**
 * middleware
 *
 */

SpaceSchema.pre('save', async function () {
  this.$locals.wasModified = this.isModified();
});

/**
 * socket update
 */

SpaceSchema.post('save', async function (this: TSpaceDocument) {
  if (!this.$locals.wasModified) {
    return;
  }

  const roomId = `space:${this._id.toString()}`;
  const eventName = roomId;

  io.to(roomId).emit(eventName, {
    space: this,
  });
});

const SpaceModel = mongoose.model<TSpaceDocument, TSpaceModel>('Spacer', SpaceSchema);

export {
  SPACE_PARTICIPANT_ROLE,
  SpaceModel,
};

export type {
  TSpace,
  TSpaceDocument,
  TSpaceModel,
  TTeam,
  TTeamDocument,
  TParticipant,
  TParticipantDocument,
  TInviteTokenPayload,
};
