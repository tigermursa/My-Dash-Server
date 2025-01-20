import { INotepad, NotepadType } from './notepad.interface';
import NotepadModel from './notepad.model';

class NotepadService {
  // Create a new note
  async createNote(data: INotepad): Promise<INotepad> {
    const note = new NotepadModel(data);
    return await note.save();
  }

  // Get all notes (optional filtering by type)
  async getAllNotes(type?: NotepadType): Promise<INotepad[]> {
    const filter = type ? { type } : {};
    return await NotepadModel.find(filter).lean(); // lean() for better performance
  }

  // Get a single note by ID
  async getNoteById(id: string): Promise<INotepad | null> {
    return await NotepadModel.findById(id).lean();
  }

  // Update a note by ID (atomic operation)
  async updateNote(
    id: string,
    data: Partial<INotepad>,
  ): Promise<INotepad | null> {
    return await NotepadModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
      lean: true,
    });
  }

  // Delete a note by ID
  async deleteNote(id: string): Promise<INotepad | null> {
    return await NotepadModel.findByIdAndDelete(id).lean();
  }
}

export default new NotepadService();
