import { Document } from 'mongoose';

export interface IBookmark extends Document {
  userId: string;
  name: string;
  url: string;
}
