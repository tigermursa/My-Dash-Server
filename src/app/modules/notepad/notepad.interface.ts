// notepad.interface.ts
export type NotepadType = 'notepad' | 'idea';

export interface INotepad {
  userId: string;
  title: string;
  content: string;
  type: NotepadType;
  createdAt?: Date;
  updatedAt?: Date;
}
