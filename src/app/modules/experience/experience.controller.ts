import { Request, Response } from 'express';
import { IExperience } from './experience.interface';
import * as experienceService from './experience.service';
import { User } from '../user/user.model';
import mongoose from 'mongoose';

const isValidObjectId = (id: string): boolean =>
  mongoose.Types.ObjectId.isValid(id);

export const getAllExperiences = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }
    const userExists = await User.findById(userId).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }
    const experiences = await experienceService.getAllExperiences(userId);
    res
      .status(200)
      .json({ message: 'Experiences fetched successfully', experiences });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const createExperience = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const experienceData: IExperience = req.body;
    const { userId, companyName, position, startDate, endDate, isCurrent } =
      experienceData;
    if (
      !userId ||
      !companyName ||
      !position ||
      !startDate ||
      isCurrent === undefined
    ) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }
    if (!isValidObjectId(userId)) {
      res.status(400).json({ message: 'Invalid User ID format' });
      return;
    }
    const userExists = await User.findById(userId).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }
    const newExperience =
      await experienceService.createExperience(experienceData);
    res.status(201).json({
      message: 'Experience created successfully',
      experience: newExperience,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const updateExperience = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }
    const userExists = await User.findById(userId).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }
    const updateData: Partial<IExperience> = req.body;
    const updatedExperience = await experienceService.updateExperience(
      userId,
      id,
      updateData,
    );
    if (!updatedExperience) {
      res.status(404).json({ message: 'Experience not found' });
      return;
    }
    res.status(200).json({
      message: 'Experience updated successfully',
      experience: updatedExperience,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const deleteExperience = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }
    const userExists = await User.findById(userId).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }
    const deletedExperience = await experienceService.deleteExperience(
      userId,
      id,
    );
    if (!deletedExperience) {
      res.status(404).json({ message: 'Experience not found' });
      return;
    }
    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};
