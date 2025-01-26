import { ISkill } from './skills.interface';
import Skill from './skills.model';

export const getAllSkills = async (userID: string): Promise<ISkill[]> => {
  try {
    return await Skill.find({ userID }).exec();
  } catch (error) {
    throw new Error('Failed to fetch skills');
  }
};

export const createSkill = async (skillData: ISkill): Promise<ISkill> => {
  try {
    const newSkill = new Skill(skillData);
    return await newSkill.save();
  } catch (error) {
    throw new Error('Failed to create skill');
  }
};

export const updateSkill = async (
  userID: string,
  skillId: string,
  updateData: Partial<ISkill>,
): Promise<ISkill | null> => {
  try {
    return await Skill.findOneAndUpdate({ _id: skillId, userID }, updateData, {
      new: true,
    }).exec();
  } catch (error) {
    throw new Error('Failed to update skill');
  }
};

export const deleteSkill = async (
  userID: string,
  skillId: string,
): Promise<ISkill | null> => {
  try {
    return await Skill.findOneAndDelete({ _id: skillId, userID }).exec();
  } catch (error) {
    throw new Error('Failed to delete skill');
  }
};
