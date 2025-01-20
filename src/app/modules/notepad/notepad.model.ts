import mongoose, { Schema, Document, Model } from 'mongoose';
import { INotepad } from './notepad.interface';

interface INotepadDocument extends INotepad, Document {}

const NotepadSchema = new Schema<INotepadDocument>({
  userId: { type: String, required: true, trim: true, index: true },
  contentNotePad: { type: String },
  contentIdea: { type: String },
});

const NotepadModel: Model<INotepadDocument> = mongoose.model<INotepadDocument>(
  'Notepad',
  NotepadSchema,
);
export default NotepadModel;
