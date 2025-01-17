import mongoose, { Document, Model } from 'mongoose';
import { IUser } from './user.interface';

// Define the User schema
const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Simple email regex
  },
  password: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// Compile the schema into a model
export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
