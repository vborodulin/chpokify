import { TRetroRelations } from '@chpokify/models-types';
import mongoose from 'mongoose';

import { retroRelationsSchemaStatic } from './static';

type TRetroRelationsDocumentStatic = typeof retroRelationsSchemaStatic;

export type TRetroRelationsDocument = mongoose.Document & TRetroRelations;

export type TRetroRelationsModel = mongoose.Model<TRetroRelationsDocument> & TRetroRelationsDocumentStatic;
