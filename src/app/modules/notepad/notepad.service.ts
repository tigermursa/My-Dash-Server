import NotepadModel from './notepad.model';
import { INotepad, NotepadType } from './notepad.interface';

class NotepadService {
  async createNote(data: INotepad): Promise<INotepad> {
    try {
      const note = new NotepadModel(data);
      return await note.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error creating note: ${error.message}`);
      }
      throw new Error('Unknown error occurred while creating note');
    }
  }

  async getAllNotes(type?: NotepadType): Promise<INotepad[]> {
    try {
      const filter = type ? { type } : {};
      return await NotepadModel.find(filter).lean();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching notes: ${error.message}`);
      }
      throw new Error('Unknown error occurred while fetching notes');
    }
  }

  async getNoteById(id: string): Promise<INotepad | null> {
    try {
      return await NotepadModel.findById(id).lean();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching note: ${error.message}`);
      }
      throw new Error('Unknown error occurred while fetching note');
    }
  }

  async updateNote(
    id: string,
    data: Partial<INotepad>,
  ): Promise<INotepad | null> {
    try {
      return await NotepadModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        lean: true,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error updating note: ${error.message}`);
      }
      throw new Error('Unknown error occurred while updating note');
    }
  }

  async deleteNote(id: string): Promise<INotepad | null> {
    try {
      return await NotepadModel.findByIdAndDelete(id).lean();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error deleting note: ${error.message}`);
      }
      throw new Error('Unknown error occurred while deleting note');
    }
  }
}

export default new NotepadService();
