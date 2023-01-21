import {
  RETRO_COLUMN_TITLE_MIN_LENGTH,
  RETRO_COLUMN_TITLE_MAX_LENGTH,
} from '@chpokify/models-types';
import mongoose from 'mongoose';

import { TRetroColumnDocument } from './types';

const RetroColumnSchema = new mongoose.Schema<TRetroColumnDocument>({
  title: {
    type: mongoose.Schema.Types.String,
    minlength: RETRO_COLUMN_TITLE_MIN_LENGTH,
    maxlength: RETRO_COLUMN_TITLE_MAX_LENGTH,
    required: true,
  },
  isAction: {
    type: mongoose.Schema.Types.Boolean,
  },
});

export { RetroColumnSchema };
