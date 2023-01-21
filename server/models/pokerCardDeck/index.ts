import mongoose from 'mongoose';

import { softDeletePlugin } from '@core/lib/db/plugins';

import { pokerCardDeckSchemaStatics } from '@models/pokerCardDeck/static';
import { TPokerCardDeckModel, TPokerCardDeckDocument } from '@models/pokerCardDeck/types';

const PokerCardDeckSchema = new mongoose.Schema<TPokerCardDeckDocument>({
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spacer',
    index: true,
  },
  title: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  cards: [mongoose.Schema.Types.Mixed],
  default: {
    type: mongoose.Schema.Types.Boolean,
  },
}, {
  strict: true,
  strictQuery: true,
  timestamps: true,
  minimize: false,
});

/**
 * INDEXES
 */

PokerCardDeckSchema.index({
  spaceId: 1,
});

PokerCardDeckSchema.index({
  default: 1,
});

PokerCardDeckSchema.index({
  title: 1,
});

PokerCardDeckSchema.index({
  _id: 1,
  userId: 1,
});

PokerCardDeckSchema.index({
  userId: 1,
  default: 1,
  isDeleted: 1,
});

PokerCardDeckSchema.plugin(softDeletePlugin);
/**
 * statics
 */
PokerCardDeckSchema.statics = pokerCardDeckSchemaStatics;

const PokerCardDeckModel = mongoose.model<TPokerCardDeckDocument, TPokerCardDeckModel>(
  'PokerCardDeck',
  PokerCardDeckSchema
);

export {
  PokerCardDeckModel,
};
