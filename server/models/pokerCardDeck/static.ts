import { TEntityID, TPokerCardDeck } from '@chpokify/models-types';
import mongoose from 'mongoose';

import { TPokerCardDeckModel } from '@models/pokerCardDeck/types';

function createNew(this: TPokerCardDeckModel, cardDeck: Omit<TPokerCardDeck, '_id' | 'spaceId'>, spaceId: TEntityID) {
  return new this({
    ...cardDeck,
    _id: new mongoose.Types.ObjectId(),
    spaceId,
  });
}

const pokerCardDeckSchemaStatics = {
  createNew,
};

export {
  pokerCardDeckSchemaStatics,
};
