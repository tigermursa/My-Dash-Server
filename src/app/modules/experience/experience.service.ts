import { IExperience } from './experience.interface';
import Experience from './experience.model';

export const createExperience = async (
  experienceData: IExperience,
): Promise<IExperience> => {
  try {
    const newExperience = new Experience(experienceData);
    return await newExperience.save();
  } catch (error) {
    throw new Error('Failed to create experience');
  }
};

export const getAllExperiences = async (
  userId: string,
): Promise<IExperience[]> => {
  try {
    return await Experience.find({ userId }).exec();
  } catch (error) {
    throw new Error('Failed to fetch experiences');
  }
};

export const updateExperience = async (
  userId: string,
  experienceId: string,
  updateData: Partial<IExperience>,
): Promise<IExperience | null> => {
  try {
    return await Experience.findOneAndUpdate(
      { _id: experienceId, userId },
      updateData,
      {
        new: true,
      },
    ).exec();
  } catch (error) {
    throw new Error('Failed to update experience');
  }
};

export const deleteExperience = async (
  userId: string,
  experienceId: string,
): Promise<IExperience | null> => {
  try {
    return await Experience.findOneAndDelete({
      _id: experienceId,
      userId,
    }).exec();
  } catch (error) {
    throw new Error('Failed to delete experience');
  }
};
