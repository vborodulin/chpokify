import { TRetroColumn } from '@chpokify/models-types';
import mongoose from 'mongoose';

type TRetroColumnDocument = mongoose.Document & TRetroColumn;

export type {
  TRetroColumnDocument,
};
