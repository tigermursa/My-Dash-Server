import express from 'express';
import * as NotepadController from './notepad.controller';

const router = express.Router();

// Routes for notepad CRUD operations
router.post('/notepad', NotepadController.createNote); // Create new note
router.get('/notepad', NotepadController.getAllNotes); // Get all notes (with optional type filter)
router.get('/notepad/:id', NotepadController.getNoteById); // Get a single note by ID
router.put('/notepad/:id', NotepadController.updateNote); // Update note by ID
router.delete('/notepad/:id', NotepadController.deleteNote); // Delete note by ID

export default router;
