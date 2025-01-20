import { Request, Response } from 'express';
import NotepadService from './notepad.service';

export const createNote = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const newNote = await NotepadService.createNote(req.body);
    res.status(201).json(newNote);
  } catch (error: unknown) {
    res
      .status(500)
      .json({
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
  }
};

export const getAllNotes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const notes = await NotepadService.getAllNotes(req.query.type as any);
    res.status(200).json(notes);
  } catch (error: unknown) {
    res
      .status(500)
      .json({
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
  }
};

export const getNoteById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const note = await NotepadService.getNoteById(req.params.id);
    note
      ? res.status(200).json(note)
      : res.status(404).json({ error: 'Note not found' });
  } catch (error: unknown) {
    res
      .status(500)
      .json({
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
  }
};

export const updateNote = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const updatedNote = await NotepadService.updateNote(
      req.params.id,
      req.body,
    );
    updatedNote
      ? res.status(200).json(updatedNote)
      : res.status(404).json({ error: 'Note not found' });
  } catch (error: unknown) {
    res
      .status(500)
      .json({
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
  }
};

export const deleteNote = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const deletedNote = await NotepadService.deleteNote(req.params.id);
    deletedNote
      ? res.status(200).json({ message: 'Note deleted successfully' })
      : res.status(404).json({ error: 'Note not found' });
  } catch (error: unknown) {
    res
      .status(500)
      .json({
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
  }
};
