import { TRetroCard } from '@chpokify/models-types';
import mongoose from 'mongoose';

import { retroCardSchemaStatic } from './static';

type TRetroCardDocumentStatic = typeof retroCardSchemaStatic;

export type TRetroCardDocument = mongoose.Document & TRetroCard;

export type TRetroCardModel = mongoose.Model<TRetroCardDocument> & TRetroCardDocumentStatic;
