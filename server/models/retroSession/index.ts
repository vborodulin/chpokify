import {
  RETRO_SESSION_TITLE_MIN_LENGTH,
  RETRO_SESSION_TITLE_MAX_LENGTH,
  RETRO_SESSION_DESC_MAX_LENGTH,
  RETRO_MAX_VOTES_CARD_PER_USER,
} from '@chpokify/models-types';
import { io } from '@socket';
import mongoose from 'mongoose';

import { softDeletePlugin } from '@core/lib/db/plugins';

import { retroSessionSchemaStatic } from '@models/retroSession/static';
import { TRetroSessionModel, TRetroSessionDocument } from '@models/retroSession/types';

const RetroSessionSchema = new mongoose.Schema<TRetroSessionDocument>({
  title: {
    type: mongoose.Schema.Types.String,
    minlength: RETRO_SESSION_TITLE_MIN_LENGTH,
    maxlength: RETRO_SESSION_TITLE_MAX_LENGTH,
  },
  description: {
    type: mongoose.Schema.Types.String,
    maxlength: RETRO_SESSION_DESC_MAX_LENGTH,
  },
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spacer',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RetroTemplate',
    required: true,
  },
  teamsIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  ],
  isHiddenCards: {
    type: mongoose.Schema.Types.Boolean,
    default: true,
  },
  isHiddenUserNameCards: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  isDisableVotingCards: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  isHiddenVoteCountCards: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  isOneVoteCards: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  isSortByVotesCount: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  isHiddenDescriptionCards: {
    type: mongoose.Schema.Types.Boolean,
    default: true,
  },
  canMoveCards: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  canEditCards: {
    type: mongoose.Schema.Types.Boolean,
    default: true,
  },
  maxVotesCard: {
    type: mongoose.Schema.Types.Number,
    default: RETRO_MAX_VOTES_CARD_PER_USER,
  },
},
{
  timestamps: true,
  strict: true,
  strictQuery: true,
  minimize: false,
});

/**
 * Indexes
 */
RetroSessionSchema.index({
  _id: 1,
  spaceId: 1,
  isDeleted: 1,
});

RetroSessionSchema.index({
  spaceId: 1,
  isDeleted: 1,
});

RetroSessionSchema.index({
  templateId: 1,
  isDeleted: 1,
});

RetroSessionSchema.index({
  _id: 1,
  isDeleted: 1,
});

/**
 * Soft delete
 */
RetroSessionSchema.plugin(softDeletePlugin);

/**
 * Statics
 */
RetroSessionSchema.statics = retroSessionSchemaStatic;

// Socket update

RetroSessionSchema.pre('save', async function () {
  this.$locals.wasModified = this.isModified();
});

RetroSessionSchema.post<TRetroSessionDocument>('save', async function (this: TRetroSessionDocument) {
  if (!this.$locals.wasModified) {
    return;
  }

  const roomId = `retroSession:${this.spaceId.toString()}`;
  const eventName = roomId;

  io.to(roomId)
    .emit(eventName, {
      retroSession: this,
    });
});

const RetroSessionModel = mongoose.model<TRetroSessionDocument, TRetroSessionModel>(
  'RetroSession',
  RetroSessionSchema
);

export type {
  TRetroSessionDocument,
  TRetroSessionModel,
};

export { RetroSessionModel };
