import { IBookmark } from './bookmarks.interface';
import Bookmark from './bookmarks.model';

export const createBookmark = async (
  bookmarkData: IBookmark,
): Promise<IBookmark> => {
  try {
    const newBookmark = new Bookmark(bookmarkData);
    return await newBookmark.save();
  } catch (error) {
    throw new Error('Failed to create bookmark');
  }
};

export const getAllBookmarks = async (userId: string): Promise<IBookmark[]> => {
  try {
    return await Bookmark.find({ userId }).exec();
  } catch (error) {
    throw new Error('Failed to fetch bookmarks');
  }
};

export const updateBookmark = async (
  userId: string,
  bookmarkId: string,
  updateData: Partial<IBookmark>,
): Promise<IBookmark | null> => {
  try {
    return await Bookmark.findOneAndUpdate(
      { _id: bookmarkId, userId },
      updateData,
      {
        new: true,
      },
    ).exec();
  } catch (error) {
    throw new Error('Failed to update bookmark');
  }
};

export const deleteBookmark = async (
  userId: string,
  bookmarkId: string,
): Promise<IBookmark | null> => {
  try {
    return await Bookmark.findOneAndDelete({ _id: bookmarkId, userId }).exec();
  } catch (error) {
    throw new Error('Failed to delete bookmark');
  }
};
