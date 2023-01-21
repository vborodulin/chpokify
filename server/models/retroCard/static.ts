import { TRetroCard } from '@chpokify/models-types';
import mongoose from 'mongoose';

import { TRetroCardModel } from '@models/retroCard/types';

function createNew(this: TRetroCardModel, other: Partial<TRetroCard>) {
  return new this({
    _id: new mongoose.Types.ObjectId(),
    ...other,
  });
}

const retroCardSchemaStatic = {
  createNew,
};

export {
  retroCardSchemaStatic,
};
