import { TRatingPokerSession } from '@chpokify/models-types/pokerSession';
import mongoose from 'mongoose';

/**
 * mongoose types
 */

type TRatingDocument =
  mongoose.Document &
  TRatingPokerSession;

/**
 * schemas
 */
const RatingSchema = new mongoose.Schema<TRatingDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  result: {
    type: mongoose.Schema.Types.Number,
  },
  comment: {
    type: mongoose.Schema.Types.String,
  },
  isAnonym: {
    type: mongoose.Schema.Types.Boolean,
  },
  skip: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
}, {
  _id: false,
  timestamps: true,
});

export {
  RatingSchema,
};
