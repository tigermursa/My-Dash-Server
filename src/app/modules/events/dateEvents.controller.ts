import { Request, Response } from 'express';
import * as dateEventService from './dateEvents.service';
import { IDateEvent } from './dateEvents.interface';
import { User } from '../user/user.model';
import mongoose from 'mongoose';

const isValidObjectId = (id: string): boolean =>
  mongoose.Types.ObjectId.isValid(id);

export const getAllDateEvents = async (
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
    const dateEvents = await dateEventService.getAllDateEvents(userId);
    res
      .status(200)
      .json({ message: 'Date events fetched successfully', dateEvents });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const updateDateEvent = async (
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
    const updateData: Partial<IDateEvent> = req.body;
    const updatedDateEvent = await dateEventService.updateDateEvent(
      userId,
      id,
      updateData,
    );
    if (!updatedDateEvent) {
      res.status(404).json({ message: 'Date event not found' });
      return;
    }
    res.status(200).json({
      message: 'Date event updated successfully',
      dateEvent: updatedDateEvent,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const deleteDateEvent = async (
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
    const deletedDateEvent = await dateEventService.deleteDateEvent(userId, id);
    if (!deletedDateEvent) {
      res.status(404).json({ message: 'Date event not found' });
      return;
    }
    res.status(200).json({ message: 'Date event deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const createDateEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const dateEventData = req.body;
    const { userId, eventName, eventDate } = dateEventData;

    // Validate required fields.
    if (!userId || !eventName || !eventDate) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // Validate user ID format.
    if (!isValidObjectId(userId)) {
      res.status(400).json({ message: 'Invalid User ID format' });
      return;
    }

    // Check if user exists and is not deleted.
    const userExists = await User.findById(userId).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }

    // Create the date event (dayLeft will be computed in the service layer)
    const newDateEvent = await dateEventService.createDateEvent(dateEventData);

    res.status(201).json({
      message: 'Date event created successfully',
      dateEvent: newDateEvent,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};
