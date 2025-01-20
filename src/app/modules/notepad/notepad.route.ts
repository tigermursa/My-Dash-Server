import express from 'express';
import * as NotepadController from './notepad.controller';

const router = express.Router();

// Routes for notepad CRUD operations
router.post('/create', NotepadController.createNote); // Create new note
router.get('/get-all', NotepadController.getAllNotes); // Get all notes (with optional type filter)
router.get('/get-single/:id', NotepadController.getNoteById); // Get a single note by ID
router.put('/update/:id', NotepadController.updateNote); // Update note by ID
router.delete('/delete/:id', NotepadController.deleteNote); // Delete note by ID

export default router;
