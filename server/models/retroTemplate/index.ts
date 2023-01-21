import { io } from '@socket';
import mongoose from 'mongoose';

import { softDeletePlugin } from '@core/lib/db/plugins';

import { RetroSessionModel } from '@models/retroSession';
import { RetroColumnSchema } from '@models/retroTemplate/column';
import { retroTemplateSchemaStatic } from '@models/retroTemplate/static';
import { TRetroTemplateDocument, TRetroTemplateModel } from '@models/retroTemplate/types';

const RetroTemplateSchema = new mongoose.Schema<TRetroTemplateDocument>({
  type: {
    type: mongoose.Schema.Types.String,
  },
  columns: [RetroColumnSchema],
},
{
  timestamps: true,
  strict: true,
  strictQuery: true,
  minimize: false,
});

/**
 * Indexes
 */
RetroTemplateSchema.index({
  _id: 1,
  isDeleted: 1,
});

/**
 * Soft delete
 */
RetroTemplateSchema.plugin(softDeletePlugin);

/**
 * Statics
 */
RetroTemplateSchema.statics = retroTemplateSchemaStatic;

/**
 * Socket update
 */
RetroTemplateSchema.pre('save', async function () {
  this.$locals.wasModified = this.isModified();
});

RetroTemplateSchema.post<TRetroTemplateDocument>('save', async function (this: TRetroTemplateDocument) {
  if (!this.$locals.wasModified) {
    return;
  }

  const retroSession = await RetroSessionModel.findOne({
    templateId: this._id,
  }, ['spaceId']);

  if (!retroSession) {
    return;
  }

  const roomId = `retroTemplate:${retroSession.spaceId.toString()}`;
  const eventName = roomId;

  io.to(roomId)
    .emit(eventName, {
      retroTemplate: this,
    });
});

const RetroTemplateModel = mongoose.model<TRetroTemplateDocument, TRetroTemplateModel>(
  'RetroTemplate', RetroTemplateSchema
);

export type {
  TRetroTemplateModel,
  TRetroTemplateDocument,
};

export { RetroTemplateModel };
