import { TRetroSession } from '@chpokify/models-types';
import mongoose from 'mongoose';

import { TRetroSessionModel, TRetroSessionDocument } from '@models/retroSession/types';

function createNew(this: TRetroSessionModel, other: Partial<TRetroSession>):TRetroSessionDocument {
  return new this({
    _id: new mongoose.Types.ObjectId(),
    ...other,
  });
}

const retroSessionSchemaStatic = {
  createNew,
};

export {
  retroSessionSchemaStatic,
};
