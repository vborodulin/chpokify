import { TRetroTemplate } from '@chpokify/models-types';
import mongoose from 'mongoose';

import { TRetroTemplateModel, TRetroTemplateDocument } from '@models/retroTemplate/types';

function createNew(this: TRetroTemplateModel, other: Partial<TRetroTemplate>) :TRetroTemplateDocument {
  return new this({
    _id: new mongoose.Types.ObjectId(),
    ...other,
  });
}

const retroTemplateSchemaStatic = {
  createNew,
};

export {
  retroTemplateSchemaStatic,
};
