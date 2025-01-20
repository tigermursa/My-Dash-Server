export type NotepadType = 'notepad' | 'idea';

export interface INotepad {
  id?: string;
  title: string;
  content: string;
  type: NotepadType;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
