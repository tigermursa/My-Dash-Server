import { Types } from 'mongoose';
import { IUser } from './user.interface';
import { User } from './user.model';
import { ISkill } from '../skills/skills.interface';

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

export function getAllSkills(userID: any) {
  throw new Error('Function not implemented.');
}

export function createSkill(skillData: ISkill) {
  throw new Error('Function not implemented.');
}

export function updateSkill(
  userID: any,
  id: string,
  updateData: Partial<import('../skills/skills.interface').ISkill>,
) {
  throw new Error('Function not implemented.');
}

export function deleteSkill(userID: any, id: string) {
  throw new Error('Function not implemented.');
}
