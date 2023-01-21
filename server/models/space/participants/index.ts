import { TParticipant } from '@chpokify/models-types';
import mongoose from 'mongoose';

/**
 * mongoose types
 */

type TParticipantDocument =
  mongoose.Document &
  TParticipant;

/**
 * schemas
 */

const ParticipantSchema = new mongoose.Schema<TParticipantDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.Number,
    min: 1,
    max: 3,
    validate: {
      validator: Number.isInteger,
      message: 'role is invalid',
    },
    required: true,
  },
});

export {
  ParticipantSchema,
};

export type {
  TParticipant,
  TParticipantDocument,
};
