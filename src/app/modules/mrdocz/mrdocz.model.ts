import { Schema, model, Document as MongooseDocument } from 'mongoose';

export interface DocumentModel extends MongooseDocument {
  name: string;
  url: string;
  createdAt: Date;
  category?: string;
}

const DocumentSchema = new Schema<DocumentModel>(
  {
    name: { type: String, required: true, trim: true },
    url: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: () => new Date(), immutable: true },
    category: { type: String, default: undefined },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  },
);

export const DocumentMongoose = model<DocumentModel>(
  'Document',
  DocumentSchema,
);
