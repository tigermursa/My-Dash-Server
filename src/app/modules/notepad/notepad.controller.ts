import { Request, Response } from 'express';
import NotepadService from './notepad.service';
import { INotepad } from './notepad.interface';

// Create a new note
export const createNote = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const noteData: INotepad = req.body;
    const newNote = await NotepadService.createNote(noteData);
    res.status(201).json(newNote); // Send created note as response
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
};

// Get all notes (optional filtering by type)
export const getAllNotes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { type } = req.query;
    const notes = await NotepadService.getAllNotes(type as any);
    res.status(200).json(notes); // Return notes list
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

// Get a single note by ID
export const getNoteById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const note = await NotepadService.getNoteById(id);
    if (note) {
      res.status(200).json(note); // Return single note
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch note' });
  }
};

// Update a note by ID
export const updateNote = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const noteData: Partial<INotepad> = req.body;
    const updatedNote = await NotepadService.updateNote(id, noteData);
    if (updatedNote) {
      res.status(200).json(updatedNote); // Return updated note
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
};

// Delete a note by ID
export const deleteNote = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedNote = await NotepadService.deleteNote(id);
    if (deletedNote) {
      res.status(200).json({ message: 'Note deleted successfully' });
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
};
