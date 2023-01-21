import { TRetroSession } from '@chpokify/models-types';
import mongoose from 'mongoose';

import { retroSessionSchemaStatic } from './static';

type TRetroSessionDocumentStatic = typeof retroSessionSchemaStatic;

export type TRetroSessionDocument = mongoose.Document & TRetroSession;

export type TRetroSessionModel = mongoose.Model<TRetroSessionDocument> & TRetroSessionDocumentStatic;
