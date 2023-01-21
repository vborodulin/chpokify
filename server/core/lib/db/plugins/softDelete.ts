import mongoose from 'mongoose';

export type TWithSoftDeleted = {
  isDeleted: boolean;
  deletedAt: Date | null;
}

type TDocument = TWithSoftDeleted & mongoose.Document;

const softDeletePlugin = (schema: mongoose.Schema) => {
  schema.add({
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  });

  const typesFindQueryMiddleware = [
    'count',
    'find',
    'findOne',
    'findOneAndDelete',
    'findOneAndRemove',
    'findOneAndUpdate',
    'update',
    'updateOne',
    'updateMany',
  ];

  const setDocumentIsDeleted = async (doc: TDocument) => {
    doc.isDeleted = true;
    doc.deletedAt = new Date();
    doc.$isDeleted(true);
    await doc.save();
  };

  const excludeInFindQueriesIsDeleted = async function (
    this: mongoose.Query<TDocument, any>,
    next: () => void
  ) {
    if (!this.getFilter().withDeleted) {
      this.where({ isDeleted: false });
    }

    next();
  };

  schema.statics.findWithDeleted = async function () {

  };

  schema.pre('remove', async function (
    this: TDocument,
    next: () => void
  ) {
    await setDocumentIsDeleted(this);
    next();
  });

  typesFindQueryMiddleware.forEach((type) => {
    schema.pre(type, excludeInFindQueriesIsDeleted);
  });
};

export {
  softDeletePlugin,
};
