import { TRetroRelations } from '@chpokify/models-types';
import mongoose from 'mongoose';

import { TRetroRelationsModel } from '@models/retroRelations/types';

function createNew(this: TRetroRelationsModel, other: Partial<TRetroRelations>) {
  return new this({
    _id: new mongoose.Types.ObjectId(),
    cardsIds: [],
    ...other,
  });
}

const retroRelationsSchemaStatic = {
  createNew,
};

export {
  retroRelationsSchemaStatic,
};
