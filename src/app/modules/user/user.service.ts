import { Types } from 'mongoose'; // Import Types from mongoose
import { IUser } from './user.interface';
import { User } from './user.model';

export const getUserByID = async (
  id: Types.ObjectId,
): Promise<IUser | null> => {
  return await User.findOne({ _id: id });
};

export const deleteUserByID = async (
  id: Types.ObjectId,
): Promise<IUser | null> => {
  return await User.findOneAndDelete({ _id: id });
};

export const updateUserByID = async (
  id: Types.ObjectId,
  updateData: Partial<IUser>,
): Promise<IUser | null> => {
  return await User.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
    runValidators: true,
  });
};

export const toggleUserDeleteStatus = async (
  id: Types.ObjectId,
): Promise<IUser | null> => {
  const user = await User.findOne({ _id: id });
  if (user) {
    user.isDeleted = !user.isDeleted;
    await user.save();
  }
  return user;
};

export const getDeletedUsers = async (): Promise<IUser[]> => {
  return await User.find({ isDeleted: true });
};
