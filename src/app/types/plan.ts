import { Document, Types } from 'mongoose';

export type TaskTitle = 'todo' | 'week' | 'month' | 'year';

export interface ITask {
  text: string;
  title: TaskTitle;
  important: boolean;
  isCompleted: boolean;
}

export interface TaskResponse extends ITask {
  id: string;
}

export interface AllTasksDocument extends Document {
  userID: string;
  tasks: Types.DocumentArray<ITask & { _id: Types.ObjectId }>;
}

export type ServiceResponse<T> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; message?: string };
