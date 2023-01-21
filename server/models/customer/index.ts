import { TCustomer } from '@chpokify/models-types/user';
import mongoose from 'mongoose';

import { softDeletePlugin } from '@core/lib/db/plugins';

export type TCustomerDocument =
  mongoose.Document &
  TCustomer;

export type TCustomerModel =
  mongoose.Model<TCustomerDocument>;

const CustomerSchema = new mongoose.Schema<TCustomerDocument>({
  id: {
    type: mongoose.Schema.Types.String,
  },
}, {
  timestamps: true,
  strict: false,
  strictQuery: false,
  minimize: false,
});

CustomerSchema.plugin(softDeletePlugin);

const CustomerModel = mongoose.model<TCustomerDocument, TCustomerModel>(
  'Customer',
  CustomerSchema
);

export {
  CustomerModel,
};
