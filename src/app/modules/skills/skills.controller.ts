import { Request, Response } from 'express';
import { ISkill } from './skills.interface';

import * as skillService from './skills.service';
import { User } from '../user/user.model';
import mongoose from 'mongoose';

// Utility function to check if an ID is a valid ObjectId
const isValidObjectId = (id: string): boolean =>
  mongoose.Types.ObjectId.isValid(id);

export const getAllSkills = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userID } = req.body;
    if (!userID) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const userExists = await User.findById(userID).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }

    const skills = await skillService.getAllSkills(userID);
    res.status(200).json({ message: 'Skills fetched successfully', skills });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const createSkill = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const skillData: ISkill = req.body;
    if (
      !skillData.userID ||
      !skillData.skillName ||
      !skillData.category ||
      !skillData.level
    ) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // Validate the userID format
    if (!isValidObjectId(skillData.userID)) {
      res.status(400).json({ message: 'Invalid User ID format' });
      return;
    }

    const userExists = await User.findById(skillData.userID).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }

    const newSkill = await skillService.createSkill(skillData);
    res
      .status(201)
      .json({ message: 'Skill created successfully', skill: newSkill });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const updateSkill = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userID } = req.body;
    const { id } = req.params;

    if (!userID) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const userExists = await User.findById(userID).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }

    const updateData: Partial<ISkill> = req.body;
    const updatedSkill = await skillService.updateSkill(userID, id, updateData);

    if (!updatedSkill) {
      res.status(404).json({ message: 'Skill not found' });
      return;
    }

    res
      .status(200)
      .json({ message: 'Skill updated successfully', skill: updatedSkill });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const deleteSkill = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userID } = req.body;
    const { id } = req.params;

    if (!userID) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const userExists = await User.findById(userID).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }

    const deletedSkill = await skillService.deleteSkill(userID, id);

    if (!deletedSkill) {
      res.status(404).json({ message: 'Skill not found' });
      return;
    }

    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};
