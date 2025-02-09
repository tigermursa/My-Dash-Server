import { Request, Response } from 'express';
import * as bookmarkService from './bookmarks.service';
import { IBookmark } from './bookmarks.interface';
import { User } from '../user/user.model';
import mongoose from 'mongoose';

const isValidObjectId = (id: string): boolean =>
  mongoose.Types.ObjectId.isValid(id);

export const getAllBookmarks = async (
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
    const bookmarks = await bookmarkService.getAllBookmarks(userId);
    res
      .status(200)
      .json({ message: 'Bookmarks fetched successfully', bookmarks });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
  }
};

export const createBookmark = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const bookmarkData: IBookmark = req.body;
    const { userId, name, url } = bookmarkData;
    if (!userId || !name || !url) {
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
    const newBookmark = await bookmarkService.createBookmark(bookmarkData);
    res
      .status(201)
      .json({
        message: 'Bookmark created successfully',
        bookmark: newBookmark,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
  }
};

export const updateBookmark = async (
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
    const updateData: Partial<IBookmark> = req.body;
    const updatedBookmark = await bookmarkService.updateBookmark(
      userId,
      id,
      updateData,
    );
    if (!updatedBookmark) {
      res.status(404).json({ message: 'Bookmark not found' });
      return;
    }
    res
      .status(200)
      .json({
        message: 'Bookmark updated successfully',
        bookmark: updatedBookmark,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
  }
};

export const deleteBookmark = async (
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
    const deletedBookmark = await bookmarkService.deleteBookmark(userId, id);
    if (!deletedBookmark) {
      res.status(404).json({ message: 'Bookmark not found' });
      return;
    }
    res.status(200).json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
  }
};
