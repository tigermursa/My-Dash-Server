import { Router } from 'express';
import {
  getAllBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
} from './bookmarks.controller';

const BookmarkRouter = Router();

BookmarkRouter.get('/get/:userId', getAllBookmarks);
BookmarkRouter.post('/create', createBookmark);
BookmarkRouter.put('/update/:id', updateBookmark);
BookmarkRouter.delete('/delete/:id', deleteBookmark);

export default BookmarkRouter;
