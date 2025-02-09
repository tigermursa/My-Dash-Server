import mongoose, { Schema } from 'mongoose';
import { IBookmark } from './bookmarks.interface';

const BookmarkSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IBookmark>('Bookmark', BookmarkSchema);
