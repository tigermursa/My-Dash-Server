import mongoose, { Schema, Document, Model } from 'mongoose';
import { INotepad } from './notepad.interface';

interface INotepadDocument extends Omit<INotepad, 'id'>, Document {}

const NotepadSchema = new Schema<INotepadDocument>(
  {
    title: { type: String, required: true, trim: true, index: true },
    content: { type: String, required: true, trim: true },
    type: { type: String, enum: ['notepad', 'idea'], required: true },
  },
  { timestamps: true, versionKey: false },
);

const NotepadModel: Model<INotepadDocument> = mongoose.model<INotepadDocument>(
  'Notepad',
  NotepadSchema,
);

export default NotepadModel;
