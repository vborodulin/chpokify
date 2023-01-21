import { TRetroTemplate } from '@chpokify/models-types';
import mongoose from 'mongoose';

import { typesHelpers } from '@core/types/helpers';

import { TRetroColumnDocument } from '@models/retroTemplate/column/types';

import { retroTemplateSchemaStatic } from './static';

type TRetroTemplateDocumentStatic = typeof retroTemplateSchemaStatic;

export type TRetroTemplateDocument = mongoose.Document & typesHelpers.Override<TRetroTemplate, {
    columns:mongoose.Types.DocumentArray<TRetroColumnDocument>
}>;

export type TRetroTemplateModel = mongoose.Model<TRetroTemplateDocument> & TRetroTemplateDocumentStatic;
